// Interactive Particle Effect for Green Bar
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = 40; // Fixed height for the green bar

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
// Ensure scrolling is disabled when modal is open
const modals = document.querySelectorAll('.modal');
modals.forEach((modal) => {
    modal.addEventListener('shown.bs.modal', () => {
        document.body.style.overflow = 'hidden';
    });

    modal.addEventListener('hidden.bs.modal', () => {
        document.body.style.overflow = '';
    });
});

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

// Modal Bootstrap Fix
const modals = document.querySelectorAll('.modal');
modals.forEach((modal) => {
    modal.addEventListener('shown.bs.modal', () => {
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    modal.addEventListener('hidden.bs.modal', () => {
        document.body.style.overflow = ''; // Restore scrolling after closing modal
    });
});
