// =========================================================
// 1. MÚSICA DE FONDO (INICIAR CON CLICK/TAP)
// =========================================================
const audio = document.getElementById('background-music');
const musicControl = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');
const overlay = document.getElementById('welcome-overlay'); 

let musicStarted = false;

// Función para iniciar la música y ocultar el overlay
function startMusicAndHideOverlay() {
    if (musicStarted) return; // Evitar doble ejecución

    audio.volume = 0.5; // Ajustar volumen si es necesario
    audio.play()
        .then(() => {
            // Éxito: Ocultar overlay
            overlay.classList.add('hidden-overlay');
            musicStarted = true;
            // Actualizar control de música si lo tienes visible
            if (musicIcon) musicIcon.textContent = '⏸️'; 
            console.log("Música iniciada por interacción del usuario.");
        })
        .catch(error => {
            // Falla (caso raro, pero se oculta el overlay de todas formas)
            overlay.classList.add('hidden-overlay');
            musicStarted = true;
            console.error("No se pudo iniciar la música:", error);
        });

    // Remover el listener inmediatamente después de la primera interacción
    overlay.removeEventListener('click', startMusicAndHideOverlay);
}

// Inicializar el listener del overlay si existe
if (overlay) {
    overlay.addEventListener('click', startMusicAndHideOverlay);
}

// Control manual (si tienes un botón Play/Pause aparte del overlay)
if (musicControl) {
    musicControl.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            musicStarted = true; 
            musicIcon.textContent = '⏸️'; 
        } else {
            audio.pause();
            musicIcon.textContent = '▶️'; 
        }
    });
}


// =========================================================
// 2. CUENTA REGRESIVA (FIX)
// =========================================================
function updateCountdown() {
    // Establece la fecha objetivo (ejemplo: Mayo 18, 2026 a las 11:00 AM)
    // **IMPORTANTE**: Reemplaza esta fecha con la real de tu evento.
    const targetDate = new Date("May 18, 2026 11:00:00").getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Lógica para detener la cuenta regresiva si ya pasó la fecha
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown-timer").innerHTML = "¡Es hoy!";
        return;
    }

    // Cálculos de tiempo
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Actualizar el DOM
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

// Ejecutar la función inmediatamente y luego cada segundo
updateCountdown(); 
const countdownInterval = setInterval(updateCountdown, 1000);


// =========================================================
// 3. MENÚ HAMBURGUESA (FIX)
// =========================================================
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('#navbar a'); // Para cerrar al hacer click

menuToggle.addEventListener('click', () => {
    // Añade/quita la clase 'active' para mostrar/ocultar el nav
    navbar.classList.toggle('active'); 
    // Opcional: añadir clase al toggle para animar las barras (cerrar X)
    menuToggle.classList.toggle('is-active'); 
});

// Cierra el menú al hacer click en un enlace (útil en móvil)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuToggle.classList.remove('is-active');
        }
    });
});


// =========================================================
// 4. SCROLL REVEAL (ANIMACIONES DE APARICIÓN FIX)
// =========================================================
function checkReveal() {
    const sections = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        // Obtiene la posición de la sección con respecto al viewport
        const sectionTop = section.getBoundingClientRect().top;
        const revealPoint = 150; // Distancia desde abajo para que empiece a aparecer

        // Si la parte superior de la sección está lo suficientemente alta...
        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('active');
        } 
        // Si quieres que desaparezca al volver a subir el scroll, usa la siguiente línea:
        // else {
        //     section.classList.remove('active');
        // }
    });
}

// Ejecutar la función al cargar la página para ver elementos iniciales
// y luego cada vez que se haga scroll.
window.addEventListener('load', checkReveal);
window.addEventListener('scroll', checkReveal);


// =========================================================
// 5. EFECTO MAQUINA DE ESCRIBIR (Typewriter) - Si lo tienes
// =========================================================
// (Mantén el código de tu efecto Typewriter si lo deseas)
