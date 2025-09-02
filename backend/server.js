const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const geoip = require("geoip-lite");
const fs = require("fs");
const path = require("path");
const useragent = require("useragent");

const app = express();
const PORT = 5001;

// ============================
// ✅ Настройки CORS
// ============================
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());

// ============================
// ✅ MySQL (MAMP)
// ============================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "girls-ai",
  port: 3306,
});

db.connect((err) => {
  if (err) console.error("❌ Ошибка подключения:", err);
  else console.log("✅ Подключено к MySQL");
});

// ============================
// ✅ Папка для логов
// ============================
const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

const visitsLog = path.join(logsDir, "visits.log");
const buttonsLog = path.join(logsDir, "buttons.log");
const statsFile = path.join(logsDir, "stats.json");

// ============================
// ✅ Функция получения номера недели
// ============================
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

// ============================
// ✅ Инициализация stats.json
// ============================
if (!fs.existsSync(statsFile)) {
  fs.writeFileSync(
    statsFile,
    JSON.stringify(
      {
        whatsapp: { today: 0, week: 0, total: 0 },
        telegram: { today: 0, week: 0, total: 0 },
        lastResetDay: new Date().toDateString(),
        lastResetWeek: getWeekNumber(new Date()),
      },
      null,
      2
    )
  );
  console.log("✅ stats.json создан!");
}

// ============================
// ✅ Middleware для логирования обычных визитов
// ============================
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) return next();

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const geo = geoip.lookup(ip) || {};
  const agent = useragent.parse(req.headers["user-agent"]);
  const time = new Date().toISOString();

  const logEntry = `[${time}] IP: ${ip} | Country: ${geo.country || "N/A"} | City: ${geo.city || "N/A"} | OS: ${agent.os} | Browser: ${agent.family}\n`;

  fs.appendFile(visitsLog, logEntry, (err) => {
    if (err) console.error("Ошибка записи визита:", err);
  });

  next();
});

// ============================
// ✅ POST /api/auth — регистрация и логин
// ============================
app.post("/api/auth", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const selectQuery = "SELECT * FROM users WHERE email = ?";
  db.query(selectQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });

    if (results.length > 0) {
      return res.json(results[0]);
    } else {
      const insertQuery =
        "INSERT INTO users (email, coins, subscription) VALUES (?, ?, ?)";
      db.query(insertQuery, [email, 10, "free"], (insertErr) => {
        if (insertErr) return res.status(500).json({ error: "Insert error" });

        db.query(selectQuery, [email], (err2, newResults) => {
          if (err2) return res.status(500).json({ error: "Reload error" });
          return res.json(newResults[0]);
        });
      });
    }
  });
});

// ============================
// ✅ POST /api/log — кастомные события с фронта
// ============================
app.post("/api/log", async (req, res) => {
  try {
    const { browser, os, device, referer, current_url, event_type, time_spent } = req.body;

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const geo = geoip.lookup(ip) || {};
    const country = geo.country || null;
    const city = geo.city || null;

    // time_spent в минутах
    const minutesSpent = time_spent ? Math.round(time_spent / 60) : 0;

    const logEntry = {
      time: new Date().toISOString(),
      ip,
      country,
      city,
      os,
      browser,
      device,
      referer,
      current_url,
      event_type,
      time_spent: minutesSpent,
    };

    // Сохраняем только полезные данные в MySQL
    const query = `
      INSERT INTO logs (ip, country, city, browser, os, device, referer, current_url, event_type, time_spent)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [ip, country, city, browser, os, device, referer, current_url, event_type, minutesSpent];
    db.query(query, values, (err) => {
      if (err) console.error("❌ Ошибка MySQL:", err);
    });

    // Сохраняем в visits.log
    await fs.promises.appendFile(visitsLog, JSON.stringify(logEntry) + "\n");

    console.log("✅ Лог добавлен:", { event_type, current_url, ip });
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Ошибка /api/log:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ============================
// ✅ POST /api/buttons/click — клики по кнопкам
// ============================
app.post("/api/buttons/click", async (req, res) => {
  const { button, current_url } = req.body;
  if (!["whatsapp", "telegram"].includes(button)) {
    return res.status(400).json({ error: "Неверная кнопка" });
  }

  try {
    let stats = {
      whatsapp: { today: 0, week: 0, total: 0 },
      telegram: { today: 0, week: 0, total: 0 },
      lastResetDay: new Date().toDateString(),
      lastResetWeek: getWeekNumber(new Date()),
    };

    if (fs.existsSync(statsFile)) {
      const raw = await fs.promises.readFile(statsFile, "utf-8");
      stats = JSON.parse(raw);
    }

    const now = new Date();
    const today = now.toDateString();
    const currentWeek = getWeekNumber(now);

    if (stats.lastResetDay !== today) {
      stats.whatsapp.today = 0;
      stats.telegram.today = 0;
      stats.lastResetDay = today;
    }

    if (stats.lastResetWeek !== currentWeek) {
      stats.whatsapp.week = 0;
      stats.telegram.week = 0;
      stats.lastResetWeek = currentWeek;
    }

    stats[button].today++;
    stats[button].week++;
    stats[button].total++;

    await fs.promises.writeFile(statsFile, JSON.stringify(stats, null, 2));

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const logEntry = {
      time: new Date().toISOString(),
      ip,
      current_url,
      event_type: "click",
      button
    };
    await fs.promises.appendFile(visitsLog, JSON.stringify(logEntry) + "\n");
    await fs.promises.appendFile(buttonsLog, `[${now.toISOString()}] Click on ${button}\n`);

    console.log("✅ Лог кнопки добавлен:", { button, stats });
    res.json({ success: true, stats });
  } catch (err) {
    console.error("❌ Ошибка обработки клика:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ============================
// ✅ GET /api/buttons/stats — получить статистику
// ============================
app.get("/api/buttons/stats", async (req, res) => {
  try {
    if (!fs.existsSync(statsFile)) {
      return res.json({
        whatsapp: { today: 0, week: 0, total: 0 },
        telegram: { today: 0, week: 0, total: 0 },
        lastResetDay: new Date().toDateString(),
        lastResetWeek: getWeekNumber(new Date()),
      });
    }
    const stats = JSON.parse(await fs.promises.readFile(statsFile, "utf-8"));
    res.json(stats);
  } catch (err) {
    console.error("❌ Ошибка чтения stats.json:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ============================
// ✅ Запуск сервера
// ============================
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
