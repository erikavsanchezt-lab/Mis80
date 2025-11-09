// =========================================================
// 1. MÚSICA DE FONDO (INICIAR CON CLICK/TAP EN OVERLAY)
// =========================================================
const audio = document.getElementById('background-music');
const musicControl = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');
const overlay = document.getElementById('welcome-overlay'); 

let musicStarted = false;

// Función para iniciar la música y ocultar el overlay
function startMusicAndHideOverlay() {
    if (musicStarted) return; 

    audio.volume = 0.5; 
    audio.play()
        .then(() => {
            overlay.classList.add('hidden-overlay');
            musicStarted = true;
            if (musicIcon) musicIcon.textContent = '⏸️'; 
        })
        .catch(error => {
            // Si falla (navegador muy estricto), aún ocultamos el overlay
            overlay.classList.add('hidden-overlay');
            musicStarted = true;
            console.error("Música bloqueada. Use el control manual.", error);
        });

    // Remover el listener inmediatamente después de la primera interacción
    overlay.removeEventListener('click', startMusicAndHideOverlay);
}

// Inicializar el listener del overlay
if (overlay) {
    overlay.addEventListener('click', startMusicAndHideOverlay);
}

// Control manual (Play/Pause)
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
// 2. CUENTA REGRESIVA (FIX: IDs de elementos)
// =========================================================
const eventDate = new Date("Dec 6, 2025 18:00:00").getTime(); // Sábado 6 de diciembre de 2025 (18:00)

const countdownUnits = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
};

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "<h2>¡CELEBRANDO!</h2>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = num => num < 10 ? '0' + num : num.toString();

    // Función para actualizar, guardar el valor anterior, y aplicar el 'flip'
    function updateAndFlip(element, newValue) {
        // Asegurarse de que el elemento exista antes de intentar manipularlo
        if (!element) return; 
        
        const currentValue = element.textContent;
        const paddedNewValue = pad(newValue);

        if (currentValue !== paddedNewValue) {
            element.setAttribute('data-old-value', currentValue);
            element.textContent = paddedNewValue;
            
            element.classList.remove('active'); 
            void element.offsetWidth; 
            element.classList.add('active'); 

            setTimeout(() => {
                 element.classList.remove('active'); 
            }, 500); 
        }
    }

    // Llamadas a la función de actualización
    updateAndFlip(countdownUnits.days, days);
    updateAndFlip(countdownUnits.hours, hours);
    updateAndFlip(countdownUnits.minutes, minutes);
    updateAndFlip(countdownUnits.seconds, seconds);
}

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);


// =========================================================
// 3. MENÚ HAMBURGUESA (FIX: Lógica de activación)
// =========================================================
const menuToggle = document.getElementById('menu-toggle');
const navLinksContainer = document.getElementById('nav-links-container');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('active'); // Usa 'active' para CSS
});

// Cierra el menú al hacer click en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});


// =========================================================
// 4. SCROLL REVEAL (ANIMACIONES DE APARICIÓN FIX: Clase 'reveal-item')
// =========================================================
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
// 5. EFECTO MAQUINA DE ESCRIBIR (Typewriter)
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
        type(); 
    }
    // Retraso para que el usuario pueda ver la animación
    setTimeout(typeWriterEffect, 2500);
}
