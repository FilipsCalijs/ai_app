const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const geoip = require('geoip-lite');

const app = express();
const PORT = 5001;

// ✅ Настройки CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// ✅ Включаем CORS и preflight-обработку
app.options('/*any', cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());

// ✅ MySQL (MAMP)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'girls-ai',
  port: 3306,
});

db.connect((err) => {
  if (err) console.error('❌ Ошибка подключения:', err);
  else console.log('✅ Подключено к MySQL');
});

// ============================
// ✅ POST /api/auth
// ============================
app.post('/api/auth', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const selectQuery = 'SELECT * FROM users WHERE email = ?';

  db.query(selectQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });

    if (results.length > 0) {
      return res.json(results[0]);
    } else {
      const insertQuery = 'INSERT INTO users (email, coins, subscription) VALUES (?, ?, ?)';
      db.query(insertQuery, [email, 10, 'free'], (insertErr) => {
        if (insertErr) return res.status(500).json({ error: 'Insert error' });

        db.query(selectQuery, [email], (err2, newResults) => {
          if (err2) return res.status(500).json({ error: 'Reload error' });
          return res.json(newResults[0]);
        });
      });
    }
  });
});

// ============================
// ✅ POST /api/log — для всех событий (логирование)
// ============================
app.post("/api/log", (req, res) => {
  const {
    browser,
    os,
    device,
    referer,
    utm_source,
    utm_medium,
    utm_campaign,
    current_url,
    event_type,
    element_tag,
    element_id,
    scroll_y,
    time_spent
  } = req.body;

  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const geo = geoip.lookup(ip) || {};
  const country = geo.country || null;
  const city = geo.city || null;

  const query = `
    INSERT INTO logs (
      ip, country, city, browser, os, device, referer,
      utm_source, utm_medium, utm_campaign, current_url,
      event_type, element_tag, element_id, scroll_y, time_spent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    ip, country, city, browser, os, device, referer,
    utm_source, utm_medium, utm_campaign, current_url,
    event_type, element_tag, element_id, scroll_y, time_spent
  ];

  db.query(query, values, (err) => {
    if (err) {
      console.error("❌ Ошибка добавления лога:", err);
      return res.status(500).json({ error: "DB error" });
    }
    console.log("✅ Лог добавлен:", { event_type, current_url, ip });
    res.json({ success: true });
  });
});


// ============================
// ✅ Запуск сервера
// ============================


app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
