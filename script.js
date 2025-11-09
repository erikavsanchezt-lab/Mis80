// ... todo el código anterior de música y menú se mantiene ...

// =========================================================
// 2. CUENTA REGRESIVA (FIX: Fecha y Lógica)
// =========================================================
// ¡IMPORTANTE! La fecha debe incluir el año: "Dec 6, 2025"
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

// ... el resto del código (Menú Hamburguesa, Scroll Reveal, Typewriter) se mantiene ...
