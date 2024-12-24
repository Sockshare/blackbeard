// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1200, // Animation duration in ms
    once: true,     // Only animate elements once
    offset: 200,    // Offset for triggering animations
});

// Initialize Particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80, // Number of particles
            density: {
                enable: true,
                value_area: 800, // Area density
            },
        },
        color: {
            value: '#00ff00', // Neon green particles
        },
        shape: {
            type: 'circle', // Shape of particles
            stroke: {
                width: 0,
                color: '#000000',
            },
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
            },
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
            },
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00ff00', // Line color
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 3,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
            },
        },
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse', // Repel particles on hover
            },
            onclick: {
                enable: true,
                mode: 'push', // Add particles on click
            },
            resize: true,
        },
        modes: {
            grab: {
                distance: 200,
                line_linked: {
                    opacity: 0.5,
                },
            },
            bubble: {
                distance: 200,
                size: 8,
                duration: 2,
                opacity: 0.8,
            },
            repulse: {
                distance: 100,
            },
            push: {
                particles_nb: 4,
            },
            remove: {
                particles_nb: 2,
            },
        },
    },
    retina_detect: true, // High DPI support
});

// Adjust particles container height (if needed)
const particlesElement = document.getElementById('particles-js');
if (particlesElement) {
    particlesElement.style.height = '40px'; // Set explicit height for particles container
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});
