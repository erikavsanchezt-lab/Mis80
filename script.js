// =========================================================
// 1. MÚSICA DE FONDO (INICIAR CON CLICK/TAP EN OVERLAY) - FIX FINAL
// =========================================================
const audio = document.getElementById('background-music');
const musicControl = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');
const overlay = document.getElementById('welcome-overlay'); 

let musicStarted = false;

// --- Función 1: Ocultar la máscara de forma inmediata y remover listeners ---
function hideOverlay() {
    if (overlay) {
        overlay.classList.add('hidden-overlay');
        
        // Remover listeners para evitar intentos repetidos
        overlay.removeEventListener('click', handleOverlayInteraction);
        overlay.removeEventListener('touchstart', handleOverlayInteraction);
    }
}

// --- Función 2: Solo intenta reproducir la música ---
function tryToPlayMusic() {
    if (musicStarted || !audio) return; 
    musicStarted = true; 

    audio.volume = 0.5; 
    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            if (musicIcon) musicIcon.textContent = '⏸️'; 
        }).catch(error => {
            // El navegador bloqueó el audio. El icono se queda en Play (▶️).
            console.warn("La reproducción de audio fue bloqueada. Usar control manual.", error);
            if (musicIcon) musicIcon.textContent = '▶️'; 
        });
    }
}

// --- Función 3: Maneja la interacción (el click/touch) ---
function handleOverlayInteraction() {
    // CRÍTICO: Primero escondemos la máscara, luego intentamos el audio
    hideOverlay();
    tryToPlayMusic();
}

// SOLUCIÓN DE EMERGENCIA: Forzar cierre del overlay después de 5 segundos
if (overlay) {
    setTimeout(() => {
        // Si el usuario no ha tocado (el overlay sigue visible), lo forzamos a cerrar
        if (!overlay.classList.contains('hidden-overlay')) {
            hideOverlay(); 
            console.warn("Cierre forzado del overlay por temporizador.");
        }
    }, 5000); // 5000 milisegundos = 5 segundos
    
    // Asignar listeners a la función de manejo
    overlay.addEventListener('click', handleOverlayInteraction);
    overlay.addEventListener('touchstart', handleOverlayInteraction); 
}

// Control manual (Play/Pause)
if (musicControl && audio) {
    musicControl.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => {
                musicStarted = true; 
                musicIcon.textContent = '⏸️'; 
            }).catch(error => {
                console.error("Fallo en el control manual de audio:", error);
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
    
    // Iniciar el efecto después de un pequeño retraso
    setTimeout(() => {
        const overlayElement = document.getElementById('welcome-overlay');
        // Solo iniciar si el overlay está cerrado
        if (!overlayElement || overlayElement.classList.contains('hidden-overlay')) {
            typeWriterEffect();
        }
    }, 3000); 
}
