document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('[data-animation]');

    const observerOptions = {
        root: null, // Observa el viewport
        rootMargin: '0px',
        threshold: 0.1 // Cuando el 10% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el elemento es visible, añade la clase para activar la animación
                entry.target.classList.add('is-visible');
                // Deja de observar el elemento una vez que se ha animado
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        // Añade una clase base para que todos los elementos animados estén ocultos inicialmente
        element.classList.add('animated');
        observer.observe(element);
    });

    // Animaciones para elementos con clases directas (ej. h1, h2, h3)
    const directAnimatedElements = document.querySelectorAll('.fade-in-up');
    directAnimatedElements.forEach(element => {
        element.style.opacity = '0'; // Ocultar inicialmente para la animación CSS
    });
});
