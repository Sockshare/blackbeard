// Keep all existing functionality intact and add the new interactive animation

// Initialize Particles.js for Green Interactive Animation Above Navbar
document.addEventListener('DOMContentLoaded', function () {
    particlesJS('interactive-particle-container', {
        particles: {
            number: {
                value: 50, // Number of particles
                density: {
                    enable: true,
                    value_area: 1000 // Area for particle density
                }
            },
            color: {
                value: "#00ff00" // Neon green particles
            },
            shape: {
                type: "circle", // Particle shape
                stroke: {
                    width: 1,
                    color: "#00ff00" // Neon green outline
                }
            },
            opacity: {
                value: 0.5, // Transparency of particles
                random: true
            },
            size: {
                value: 3, // Particle size
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150, // Distance for lines between particles
                color: "#00ff00", // Neon green lines
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2, // Speed of particle movement
                direction: "none"
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse" // Repel particles on hover
                },
                onclick: {
                    enable: true,
                    mode: "push" // Add particles on click
                }
            }
        },
        retina_detect: true // Optimize for high-resolution displays
    });
});

// Smooth Scroll for Navigation Links (Existing functionality)
document.querySelectorAll('a.nav-link').forEach(anchor => {
    const href = anchor.getAttribute('href');
    if (href.startsWith('#')) {
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

// Animate on Scroll (AOS) Initialization (Existing functionality)
AOS.init({
    duration: 1200,
    easing: 'ease-in-out',
    once: true
});

// Hover Effects for Cards (Existing functionality)
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'transform 0.3s ease';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

// Back to Top Button (Optional - Existing functionality)
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
