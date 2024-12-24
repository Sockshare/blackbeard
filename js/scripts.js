// Interactive Particle Effect for Green Bar
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = 40; // Fixed height for green bar

const particles = [];
const mouse = { x: null, y: null };

class Particle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = Math.random() * 2 - 1;
        this.dy = Math.random() * 2 - 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00ff00';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

        // Interaction with mouse
        const distance = Math.hypot(this.x - mouse.x, this.y - mouse.y);
        if (distance < 100) {
            this.dx += (this.x - mouse.x) * 0.01;
            this.dy += (this.y - mouse.y) * 0.01;
        }

        this.draw();
    }
}

// Initialize Particles
for (let i = 0; i < 50; i++) {
    particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, 2));
}

// Animation Loop
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => particle.update());

    requestAnimationFrame(animateParticles);
}

// Event Listeners for Interaction
canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY - canvas.getBoundingClientRect().top;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = 40;
});

animateParticles();

// ASCII Rain for the Projects Section
const asciiRainCanvas = document.getElementById('ascii-rain');
if (asciiRainCanvas) {
    const asciiCtx = asciiRainCanvas.getContext('2d');

    // Dynamically set canvas size based on #projects section
    function resizeAsciiCanvas() {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            asciiRainCanvas.width = projectsSection.offsetWidth;
            asciiRainCanvas.height = projectsSection.offsetHeight;
            console.log('ASCII Canvas resized to:', asciiRainCanvas.width, asciiRainCanvas.height); // Debugging
        }
    }

    resizeAsciiCanvas();

    const symbols = '01'; // Binary characters
    const fontSize = 16;
    const columns = Math.floor(asciiRainCanvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawAsciiRain() {
        asciiCtx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Fade effect
        asciiCtx.fillRect(0, 0, asciiRainCanvas.width, asciiRainCanvas.height);

        asciiCtx.fillStyle = '#00ff00'; // Neon green for ASCII
        asciiCtx.font = `${fontSize}px monospace`;

        drops.forEach((y, x) => {
            const text = symbols[Math.floor(Math.random() * symbols.length)];
            asciiCtx.fillText(text, x * fontSize, y * fontSize);

            if (y * fontSize > asciiRainCanvas.height && Math.random() > 0.95) {
                drops[x] = 0; // Reset drop to top randomly
            }

            drops[x]++;
        });

        requestAnimationFrame(drawAsciiRain);
    }

    drawAsciiRain();

    window.addEventListener('resize', () => {
        resizeAsciiCanvas();
        console.log('Window resized. Updated canvas size.');
    });
}
