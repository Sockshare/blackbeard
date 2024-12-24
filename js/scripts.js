// Initialize Particles.js for Animation Above Footer
document.addEventListener('DOMContentLoaded', function () {
    particlesJS('interactive-particle-container', {
        particles: {
            number: {
                value: 50, // Number of particles
                density: {
                    enable: true,
                    value_area: 600 // Area for particle density
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
                random: true
            },
            size: {
                value: 4,
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
                }
            }
        },
        retina_detect: true // Optimize for high-resolution displays
    });
});
