// =========================================================
// 1. MÚSICA DE FONDO (INICIAR CON CLICK/TAP EN OVERLAY) - FIX FINAL
// =========================================================
const audio = document.getElementById('background-music');
const musicControl = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');
const overlay = document.getElementById('welcome-overlay'); // Ahora es un BUTTON

let musicStarted = false;

// SOLUCIÓN DE EMERGENCIA: Forzar cierre del overlay después de 5 segundos si el clic no funciona.
if (overlay) {
    setTimeout(() => {
        // Solo cierra si el overlay está visible (no tiene la clase hidden-overlay)
        if (!overlay.classList.contains('hidden-overlay')) {
            overlay.classList.add('hidden-overlay');
            console.warn("Cierre forzado del overlay por temporizador.");
        }
    }, 5000); // 5000 milisegundos = 5 segundos
}

// Función para iniciar la música y ocultar el overlay
function startMusicAndHideOverlay() {
    
    // --- PASO 1: CIERRE INMEDIATO DEL OVERLAY ---
    if (overlay) {
        overlay.classList.add('hidden-overlay');
    }
    
    // Solo intentar iniciar la música si no se ha intentado antes
    if (musicStarted) return; 
    musicStarted = true; 

    // 3. Remover el listener
    if (overlay) {
        overlay.removeEventListener('click', startMusicAndHideOverlay);
        overlay.removeEventListener('touchstart', startMusicAndHideOverlay);
    }
    
    // 4. Intentar reproducir el audio
    audio.volume = 0.5; 
    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            if (musicIcon) musicIcon.textContent = '⏸️'; 
        }).catch(error => {
            // Esto se ejecuta si el navegador bloquea la reproducción automática.
            console.warn("La reproducción de audio fue bloqueada. Usar control manual.", error);
            if (musicIcon) musicIcon.textContent = '▶️'; 
        });
    }
}

if (overlay) {
    // Escuchar el evento click (para escritorio) y touchstart (para móvil)
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
// 2. SCROLL REVEAL Y MENÚ HAMBURGUESA
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
// 3. EFECTO MAQUINA DE ESCRIBIR (Typewriter)
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
        // Asegúrate de iniciar el efecto solo si el overlay se ha ido
        if (!overlay || overlay.classList.contains('hidden-overlay')) {
            typeWriterEffect();
        }
    }, 3000); 
}
