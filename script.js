// Cuenta regresiva
const target = new Date("Dec 06, 2025 15:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = target - now;

  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff % (1000*60*60*24))/(1000*60*60));
  const m = Math.floor((diff % (1000*60*60))/(1000*60));
  const s = Math.floor((diff % (1000*60))/1000);

  document.getElementById("countdown").innerHTML = 
    `${d}d ${h}h ${m}m ${s}s`;
}, 1000);
