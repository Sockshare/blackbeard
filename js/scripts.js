// Initialize Particles.js for Green Interactive Animation Above Navbar
document.addEventListener('DOMContentLoaded', function () {
    particlesJS('interactive-particle-container', {
        particles: {
            number: {
                value: 30, // Number of particles
                density: {
                    enable: true,
                    value_area: 800 // Particle density area
                }
            },
            color: {
                value: "#00ff00" // Neon green particles
            },
            shape: {
                type: "circle", // Shape of particles
                stroke: {
                    width: 0,
                    color: "#000000"
                }
            },
            opacity: {
                value: 0.6, // Particle opacity
                random: true
            },
            size: {
                value: 4, // Particle size
                random: true
            },
            line_linked: {
                enable: true,
                distance: 120, // Distance between linked particles
                color: "#00ff00",
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
            detect_on: "canvas", // Interactivity detection on canvas
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

// Smooth Scroll for Navigation Links
document.querySelectorAll('a.nav-link').forEach(anchor => {
    const href = anchor.getAttribute('href');
    // Apply smooth scroll only for internal links (starting with #)
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

// Animate on Scroll (AOS) Initialization
AOS.init({
    duration: 1200, // Animation duration
    easing: 'ease-in-out', // Easing function
    once: true // Ensure animations only happen once
});

// Hover Effects for Cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)'; // Slight zoom on hover
        card.style.transition = 'transform 0.3s ease';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)'; // Reset scale on mouse leave
    });
});

// Back to Top Button (Optional)
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block'; // Show button after scrolling 300px
        } else {
            backToTopBtn.style.display = 'none'; // Hide button otherwise
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
    });
}
