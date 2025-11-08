// --- GESTIÓN DE MÚSICA DE FONDO (Discreto) ---
const audio = document.getElementById('background-music');
const musicControl = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');

// Configuración inicial del control
audio.volume = 0.5; 
musicIcon.textContent = '▶️'; // Muestra Play inicialmente
musicControl.title = 'Reproducir música de fondo';
musicControl.style.color = 'var(--color-acento1)'; // Color Play

// Intentar la reproducción automática (fallará, pero es el intento inicial)
audio.play().catch(error => {
    console.log("Auto-play blocked, user interaction required.");
});

// Control de usuario
musicControl.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        musicIcon.textContent = '⏸️'; // Icono de Pausa
        musicControl.title = 'Pausar música';
        musicControl.style.color = 'var(--color-acento2)'; // Color activo
    } else {
        audio.pause();
        musicIcon.textContent = '▶️'; // Icono de Play
        musicControl.title = 'Reproducir música de fondo';
        musicControl.style.color = 'var(--color-acento1)'; // Color inactivo
    }
});


// --- CONFIGURACIÓN DE LA CUENTA REGRESIVA (Con Animación Flip) ---
const eventDate = new Date("Dec 6, 2025 18:00:00").getTime(); // 6 PM
const countdownUnits = {
    days: document.querySelector('.days'),
    hours: document.querySelector('.hours'),
    minutes: document.querySelector('.minutes'),
    seconds: document.querySelector('.seconds')
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
        const currentValue = element.textContent;
        const paddedNewValue = pad(newValue);

        if (currentValue !== paddedNewValue) {
            // 1. Guardar el valor actual como valor antiguo para la animación
            element.setAttribute('data-old-value', currentValue);
            
            // 2. Aplicar el nuevo valor
            element.textContent = paddedNewValue;
            
            // 3. Activar la animación: quitar, forzar reflow, y añadir clase
            element.classList.remove('active'); 
            void element.offsetWidth; 
            element.classList.add('active'); 

            // 4. Desactivar la clase después de que termine la transición (0.5s en CSS)
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


// --- SCROLL REVEAL (Aparición al desplazar) ---
const revealItems = document.querySelectorAll('.reveal-item');

function checkReveal() {
    const triggerBottom = window.innerHeight / 5 * 4; 

    revealItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;

        if (itemTop < triggerBottom) {
            item.classList.add('active');
        } 
    });
}

window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal); 


// --- EFECTO TYPEWRITER (Máquina de Escribir) ---
const quoteElement = document.querySelector('.type-effect');
const quoteText = quoteElement.textContent;

if (quoteElement) {
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
    setTimeout(typeWriterEffect, 2000);
}
