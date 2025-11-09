// =========================================================
// 1. MÚSICA DE FONDO (INICIAR CON CLICK/TAP EN OVERLAY) - FIX
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
            overlay.classList.add('hidden-overlay');
            musicStarted = true;
            console.error("Música bloqueada. Usar el control manual si es visible.", error);
        });

    overlay.removeEventListener('click', startMusicAndHideOverlay);
}

if (overlay) {
    overlay.addEventListener('click', startMusicAndHideOverlay);
}

// Control manual (Play/Pause)
if (musicControl) {
    musicControl.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            musicStarted = true; // Si se inicia manualmente, actualizamos el estado
            musicIcon.textContent = '⏸️'; 
        } else {
            audio.pause();
            musicIcon.textContent = '▶️'; 
        }
    });
}


// =========================================================
// 2. CUENTA REGRESIVA (FIX: IDs correctos)
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
        const countdownElement = document.getElementById("countdown");
        if(countdownElement) countdownElement.innerHTML = "<h2>¡CELEBRANDO!</h2>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = num => num < 10 ? '0' + num : num.toString();

    function updateAndFlip(element, newValue) {
        if (!element) return; 
        
        const currentValue = element.textContent;
        const paddedNewValue = pad(newValue);

        if (currentValue !== paddedNewValue) {
            element.setAttribute('data-old-value', currentValue);
            element.textContent = paddedNewValue;
            
            element.classList.remove('active'); 
            void element.offsetWidth; // Forzar reflow
            element.classList.add('active'); 

            setTimeout(() => {
                 element.classList.remove('active'); 
            }, 500); 
        }
    }

    updateAndFlip(countdownUnits.days, days);
    updateAndFlip(countdownUnits.hours, hours);
    updateAndFlip(countdownUnits.minutes, minutes);
    updateAndFlip(countdownUnits.seconds, seconds);
}

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);


// =========================================================
// 3. MENÚ HAMBURGUESA (FIX: Lógica y Cierre en Mobile)
// =========================================================
const menuToggle = document.getElementById('menu-toggle');
const navLinksContainer = document.getElementById('nav-links-container');
const navLinks = document.querySelectorAll('.nav-link');

if(menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active'); // Usa 'active' para mostrar/ocultar
    });

    // Cierra el menú al hacer click en un enlace (solo en móvil, ya que el menú desaparece en desktop)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) { // Solo en dispositivos móviles
                navLinksContainer.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
}


// =========================================================
// 4. SCROLL REVEAL (ANIMACIONES DE APARICIÓN FIX)
// =========================================================
function checkReveal() {
    const revealItems = document.querySelectorAll('.reveal-item'); // Asegúrate de que los elementos tengan esta clase
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
        setTimeout(type, 2500); // Retraso antes de iniciar la escritura
    }
    // Asegurarse de que el efecto solo se inicie después de que el overlay desaparezca
    // O si no hay overlay, se puede iniciar directamente con un setTimeout
    // Si usas el overlay, esta llamada debería estar dentro del `then` del audio
    // Pero para simplificar, lo dejo aquí con un retraso.
    // Una opción más robusta sería añadir un MutationObserver al overlay.
    setTimeout(() => {
        if (!overlay || overlay.classList.contains('hidden-overlay')) {
            typeWriterEffect();
        }
    }, 3000); // Dale tiempo al overlay para desaparecer
}
