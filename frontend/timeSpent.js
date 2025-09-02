// timeSpent.js
let startTime = Date.now();

window.addEventListener("beforeunload", async () => {
  const timeSpent = Math.floor((Date.now() - startTime) / 1000 / 60); // в минутах

  try {
    await fetch("http://localhost:5001/api/log-time", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        current_url: window.location.href,
        time_spent: timeSpent,
      }),
    });
  } catch (err) {
    console.error("Ошибка отправки time_spent", err);
  }
});
