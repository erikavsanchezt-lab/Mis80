// Cuenta regresiva
const eventDate = new Date("December 6, 2025 00:00:00").getTime();

setInterval(() => {
  const now = Date.now();
  const diff = eventDate - now;

  const days = Math.floor(diff / (1000*60*60*24));

  document.getElementById("timer").innerHTML = 
    `<h2>Faltan ${days} días</h2>`;
}, 1000);
