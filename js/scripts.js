// Initialize Particles.js for ASCII Rain Background
particlesJS('ascii-rain', {
    particles: {
        number: {
            value: 120,
            density: {
                enable: true,
                value_area: 1000,
            },
        },
        color: {
            value: "#00bfff", // Neon blue particles
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000",
            },
            polygon: {
                nb_sides: 5,
            },
        },
        opacity: {
            value: 0.3,
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
            enable: false,
        },
        move: {
            enable: true,
            speed: 2,
            direction: "bottom",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: false,
            },
            onclick: {
                enable: false,
            },
            resize: true,
        },
    },
    retina_detect: true,
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a.nav-link').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
            });
        }
    });
});

// Animate on Scroll (AOS) Initialization
AOS.init({
    duration: 1200,
    easing: 'ease-in-out',
    once: true, // Ensure animations only happen once
});

// Hover Effects for Cards
document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'transform 0.3s ease';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});
