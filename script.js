// =========================================================
// 1. MÚSICA DE FONDO (AJUSTADA: SE INICIA MANUALMENTE)
// =========================================================
// Nota: Los elementos 'audio' y 'welcome-overlay' han sido comentados
// en index.html para evitar el bloqueo del móvil.

// Definimos las variables para evitar errores
const audio = document.getElementById('background-music');
const musicControl = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');

// Control manual (Play/Pause)
if (musicControl && audio) {
    musicControl.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => {
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
        typeWriterEffect();
    }, 1000); 
}
