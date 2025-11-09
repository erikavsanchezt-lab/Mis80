// =========================================================
// 1. MÚSICA DE FONDO (INICIAR CON CLICK/TAP EN OVERLAY) - FIX FINAL
// =========================================================
const audio = document.getElementById('background-music');
const musicControl = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');
const overlay = document.getElementById('welcome-overlay'); 

let musicStarted = false;

// Función para iniciar la música y ocultar el overlay
function startMusicAndHideOverlay() {
    
    // --- PASO 1: CIERRE INMEDIATO DEL OVERLAY ---
    // Esto debe ejecutarse primero y sin condiciones para garantizar la UX.
    if (overlay) {
        overlay.classList.add('hidden-overlay');
    }
    
    // Solo intentar iniciar la música si no se ha intentado antes
    if (musicStarted) return; 
    musicStarted = true; 

    // 3. Remover el listener para que el clic solo sea efectivo una vez en el overlay
    if (overlay) {
        overlay.removeEventListener('click', startMusicAndHideOverlay);
        overlay.removeEventListener('touchstart', startMusicAndHideOverlay);
    }
    
    // 4. Intentar reproducir el audio
    audio.volume = 0.5; 
    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // La reproducción comenzó correctamente, actualiza el icono a pausa
            if (musicIcon) musicIcon.textContent = '⏸️'; 
        }).catch(error => {
            // La reproducción fue bloqueada o falló, usa el control manual
            console.warn("La reproducción de audio fue bloqueada. Usar control manual.", error);
            if (musicIcon) musicIcon.textContent = '▶️'; 
        });
    }
}

if (overlay) {
    overlay.addEventListener('click', startMusicAndHideOverlay);
    overlay.addEventListener('touchstart', startMusicAndHideOverlay); 
}

// Control manual (Play/Pause)
if (musicControl) {
    musicControl.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => {
                musicStarted = true; 
                musicIcon.textContent = '⏸️'; 
            }).catch(error => {
                console.error("Fallo en el control manual:", error);
            });
        } else {
            audio.pause();
            musicIcon.textContent = '▶️'; 
        }
    });
}


// =========================================================
// 2. CUENTA REGRESIVA - Lógica eliminada, se usa Widget
// =========================================================


// =========================================================
// 3. MENÚ HAMBURGUESA Y SCROLL REVEAL
// =========================================================
const menuToggle = document.getElementById('menu-toggle');
const navLinksContainer = document.getElementById('nav-links-container');
const navLinks = document.querySelectorAll('.nav-link');

if(menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active'); 
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) { 
                navLinksContainer.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
}

// SCROLL REVEAL (Animaciones de aparición)
function checkReveal() {
    const revealItems = document.querySelectorAll('.reveal-item'); 
    const windowHeight = window.innerHeight;

    revealItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const revealPoint = 150; 

        if (itemTop < windowHeight - revealPoint) {
            item.classList.add('active');
        } 
    });
}

window.addEventListener('load', checkReveal);
window.addEventListener('scroll', checkReveal);


// =========================================================
// 4. EFECTO MAQUINA DE ESCRIBIR (Typewriter)
// =========================================================
const quoteElement = document.querySelector('.type-effect');

if (quoteElement) {
    const quoteText = quoteElement.textContent;
    quoteElement.textContent = ''; 

    function typeWriterEffect() {
        let i = 0;
        function type() {
            if (i < quoteText.length) {
                quoteElement.textContent += quoteText.charAt(i);
                i++;
                setTimeout(type, 50); 
            }
        }
        setTimeout(type, 2500);
    }
    
    // Iniciar el efecto después de un retraso inicial
    setTimeout(() => {
        if (!overlay || overlay.classList.contains('hidden-overlay')) {
            typeWriterEffect();
        }
    }, 3000); 
}
