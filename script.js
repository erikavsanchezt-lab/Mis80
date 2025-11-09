// =========================================================
// 1. MÚSICA DE FONDO Y CONTROL DE OVERLAY (SOLUCIÓN DEFINITIVA)
// =========================================================
const audio = document.getElementById('background-music');
const musicControl = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');
const overlay = document.getElementById('welcome-overlay'); 

let musicStarted = false; // Se mantiene solo para el control manual

// --- Función para manejar el toque/click en el Overlay ---
function handleOverlayClick() {
    
    // 1. Ocultar el overlay de forma inmediata
    if (overlay) {
        overlay.classList.add('hidden-overlay');
        // Remover listeners
        overlay.removeEventListener('click', handleOverlayClick);
        overlay.removeEventListener('touchstart', handleOverlayClick); 
    }
    
    // **CRÍTICO:** SE ELIMINA EL INTENTO DE audio.play() AQUÍ.
    // El objetivo de esta función ahora es solo dejar que el usuario vea la página.
}


// A. Lógica del Overlay
if (overlay) {
    // 1. Asignar listener de click y touchstart
    overlay.addEventListener('click', handleOverlayClick);
    overlay.addEventListener('touchstart', handleOverlayClick); 
    
    // 2. Temporizador de Cierre Forzado (Plan B: 5 segundos, por si el toque falla)
    setTimeout(() => {
        if (!overlay.classList.contains('hidden-overlay')) {
            handleOverlayClick(); // Usamos la misma función para forzar el cierre
            console.warn("Cierre forzado del overlay por temporizador.");
        }
    }, 5000); 
}


// B. Control manual (Play/Pause en la barra de navegación) - ESTO SÍ FUNCIONA
if (musicControl && audio) {
    musicControl.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => {
                musicIcon.textContent = '⏸️'; 
                musicStarted = true; // Actualiza el estado
            }).catch(error => {
                console.error("Fallo en el control manual de audio:", error);
                musicIcon.textContent = '▶️'; 
            });
        } else {
            audio.pause();
            musicIcon.textContent = '▶️'; 
        }
    });
}


// =========================================================
// 2. SCROLL REVEAL Y MENÚ HAMBURGUESA (Sin cambios)
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
// 3. EFECTO MAQUINA DE ESCRIBIR (Typewriter) (Sin cambios)
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
