// Initialize Particles.js for Interactive Animation at the Bottom of the Page
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
            color: {
                value: "#00ff00" // Neon green particles
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                }
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#00ff00",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas", // Detect interactions on canvas
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse" // Particles repel on hover
                },
                onclick: {
                    enable: true,
                    mode: "push" // Adds particles on click
                },
                resize: true // Adjust particles on window resize
            },
            modes: {
                repulse: {
                    distance: 100, // Distance of repulsion
                    duration: 0.4
                },
                push: {
                    particles_nb: 10 // Number of particles added on click
                },
                grab: {
                    distance: 200, // Makes particles "grab" towards cursor
                    line_linked: {
                        opacity: 1
                    }
                }
            }
        },
        retina_detect: true // Optimize for high-resolution displays
    });
});

// Smooth Scroll for Navigation Links (Existing Functionality)
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

// Animate on Scroll (AOS) Initialization (Existing Functionality)
AOS.init({
    duration: 1200,
    easing: 'ease-in-out',
    once: true
});

// Hover Effects for Cards (Existing Functionality)
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'transform 0.3s ease';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

// Back to Top Button (Optional - Existing Functionality)
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
