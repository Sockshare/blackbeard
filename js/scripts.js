// Interactive Particle Effect for Green Bar
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = 40; // Fixed height for the green bar

    const particles = [];
    const mouse = { x: null, y: null };

    class Particle {
        constructor(x, y, radius) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.dx = Math.random() * 2 - 1; // Random horizontal speed
            this.dy = Math.random() * 2 - 1; // Random vertical speed
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#00ff00'; // Neon green color
            ctx.fill();
            ctx.closePath();
        }

        update() {
            this.x += this.dx;
            this.y += this.dy;

            // Bounce off the edges of the canvas
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

    // Initialize particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, 2));
    }

    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => particle.update());

        requestAnimationFrame(animateParticles);
    }

    // Event listener for mouse interaction
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    // Event listener for window resizing
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = 40; // Maintain height
        // Reinitialize particles to fit new canvas size
        particles.length = 0;
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, 2));
        }
    });

    // Start animation
    animateParticles();
}
