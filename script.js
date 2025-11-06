document.addEventListener('DOMContentLoaded', function() {
    // ----------------------------------------------------
    // 1. Contador Regresivo
    // ----------------------------------------------------
    const countdownElement = document.getElementById('countdown');
    // Establece la fecha del evento: 6 de Diciembre de 2025 (a las 00:00:00)
    // ¡Asegúrate de que esta fecha es la correcta!
    const eventDate = new Date("Dec 6, 2025 00:00:00").getTime(); 

    const updateCountdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        // Cálculos de tiempo
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Mostrar el resultado
        if (countdownElement) {
            countdownElement.innerHTML = `${days} días ${hours}h ${minutes}m ${seconds}s`;
        }

        // Si el evento ya pasó
        if (distance < 0) {
            clearInterval(updateCountdown);
            if (countdownElement) {
                countdownElement.innerHTML = "¡LA CELEBRACIÓN HA COMENZADO! 🎉";
            }
        }
    }, 1000);


    // ----------------------------------------------------
    // 2. Animaciones al Scroll (Intersection Observer)
    // ----------------------------------------------------

    // Selecciona todos los párrafos que deben animarse al aparecer
    const paragraphsToAnimate = document.querySelectorAll('.texto p, .especial p, .evento p, .evento button, .evento a, .contador h3');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 // Activar cuando el 10% del elemento sea visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el elemento es visible, añade la clase de animación
                entry.target.classList.add('is-visible');
                // Deja de observar para que la animación no se repita
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    paragraphsToAnimate.forEach(element => {
        // Añade la clase base para que CSS oculte el elemento
        element.classList.add('animated-paragraph');
        observer.observe(element);
    });
});

// ----------------------------------------------------
// 3. Función para Toggle Música (Global)
// ----------------------------------------------------
window.toggleMusic = function() {
    const music = document.getElementById('bgMusic');
    const btn = document.querySelector('.music-btn');

    if (music.paused) {
        // Toca la música
        music.play()
            .then(() => {
                btn.innerHTML = '🎶 Música';
            })
            .catch(error => {
                // Manejar error si el navegador bloquea la reproducción automática
                console.error("Error al intentar reproducir la música:", error);
                // Informar al usuario que debe hacer un segundo clic
                alert("Tu navegador bloqueó la reproducción automática. Haz clic de nuevo en el botón para activar la música.");
                btn.innerHTML = '▶️ Música';
            });
    } else {
        // Pausa la música
        music.pause();
        btn.innerHTML = '🔇 Música';
    }
};
