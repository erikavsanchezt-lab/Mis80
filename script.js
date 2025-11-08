// --- GESTIÓN DE MÚSICA DE FONDO (Iniciar con Scroll) ---
const audio = document.getElementById('background-music');
const musicControl = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');

// Bandera para asegurar que la música solo se intente reproducir una vez
let musicStarted = false;

// Configuración inicial del control (mostrando que está pausada y lista)
audio.volume = 0.5; 
musicIcon.textContent = '▶️'; 
musicControl.title = 'Reproducir música de fondo';
musicControl.style.color = 'var(--color-acento1)'; 


// *** NUEVA FUNCIÓN PARA INICIAR CON SCROLL ***
function startMusicOnScroll() {
    if (!musicStarted) {
        audio.play()
            .then(() => {
                // Si la reproducción fue exitosa
                musicStarted = true;
                musicIcon.textContent = '⏸️'; 
                musicControl.title = 'Pausar música';
                musicControl.style.color = 'var(--color-acento2)'; 
                
                // Una vez iniciada, eliminamos el listener de scroll
                window.removeEventListener('scroll', startMusicOnScroll);
            })
            .catch(error => {
                // Si falla (por si acaso el navegador es muy estricto),
                // aún dejamos el control visible para el usuario.
                console.log("Música bloqueada. Use el control manual.");
                musicStarted = true; // Prevenimos reintentos
                window.removeEventListener('scroll', startMusicOnScroll);
            });
    }
}

// Escuchador del evento scroll que disparará la función startMusicOnScroll
window.addEventListener('scroll', startMusicOnScroll);


// --- Control de usuario (se mantiene para Pausa/Play manual) ---
musicControl.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        musicStarted = true; // Actualizamos la bandera si se inicia manualmente
        musicIcon.textContent = '⏸️️'; 
        musicControl.title = 'Pausar música';
        musicControl.style.color = 'var(--color-acento2)'; 
    } else {
        audio.pause();
        musicIcon.textContent = '▶️'; 
        musicControl.title = 'Reproducir música de fondo';
        musicControl.style.color = 'var(--color-acento1)'; 
    }
});


// --- EL RESTO DE TU CÓDIGO (Cuenta Regresiva, Scroll Reveal, Typewriter) ES EL MISMO ---
// ... (código de updateCountdown, checkReveal, typeWriterEffect) ...
