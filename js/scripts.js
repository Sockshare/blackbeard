// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add Glow Effect on Hover for Project Titles
document.querySelectorAll('.project h3').forEach(projectTitle => {
    projectTitle.addEventListener('mouseover', function () {
        this.style.textShadow = '0 0 15px #00ff00, 0 0 30px #00ff00';
    });

    projectTitle.addEventListener('mouseout', function () {
        this.style.textShadow = '0 0 5px #00ff00, 0 0 10px #00ff00';
    });
});

// Console Greeting in Hacker Theme
console.log('%cWelcome to My Portfolio!', 'color: #00ff00; font-size: 20px; font-family: monospace; text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00;');
console.log('%cFeel free to explore the projects and reach out!', 'color: #00ff00; font-size: 14px; font-family: monospace; text-shadow: 0 0 5px #00ff00;');
