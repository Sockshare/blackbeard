// Initialize Particles.js for Interactive Animation
document.addEventListener('DOMContentLoaded', function () {
    particlesJS('interactive-particle-container', {
        particles: {
            number: {
                value: 80, // Number of particles
                density: {
                    enable: true,
                    value_area: 800 // Area for particle density
                }
            },
            color: { value: "#00ff00" }, // Neon green particles
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 3 },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#00ff00",
                opacity: 0.4,
                width: 1
            },
            move: { enable: true, speed: 2 }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 10 }
            }
        },
        retina_detect: true // Optimize for high-resolution displays
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a.nav-link').forEach(anchor => {
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('#')) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Animate on Scroll (AOS) Initialization
AOS.init({
    duration: 1200,
    easing: 'ease-in-out',
    once: true // Ensure animations only happen once
});

// Hover Effects for Cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'transform 0.3s ease';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

// Back to Top Button (Optional)
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Modal Functionality
document.querySelectorAll('[data-bs-toggle="modal"]').forEach(modalTrigger => {
    modalTrigger.addEventListener('click', () => {
        const targetModalId = modalTrigger.getAttribute('data-bs-target');
        const targetModal = document.querySelector(targetModalId);

        if (targetModal) {
            const modal = new bootstrap.Modal(targetModal);
            modal.show();
        }
    });
});
