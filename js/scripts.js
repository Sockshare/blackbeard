// Smooth Scrolling for Navigation
document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Console Greeting
console.log('%cWelcome to My Hacker Portfolio!', 'color: #00ff00; font-size: 18px; font-family: monospace; text-shadow: 0 0 10px #00ff00;');
