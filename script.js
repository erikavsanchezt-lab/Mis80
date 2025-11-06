// Cuenta regresiva
const fechaEvento = new Date("Dec 06, 2025 00:00:00").getTime();
setInterval(function () {
    const hoy = new Date().getTime();
    const distancia = fechaEvento - hoy;

    const d = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const h = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = `${d} días ${h}h ${m}m ${s}s`;
}, 1000);

// Música autoplay manual por seguridad del navegador
let music = document.getElementById("bgMusic");
function toggleMusic() {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}
