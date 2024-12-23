
// Smooth Scroll for Navigation Links
document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Glow Effect on Project Cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.boxShadow = '0 0 30px #00FFFF';
    });
    card.addEventListener('mouseout', () => {
        card.style.boxShadow = '0 0 10px #00FFFF';
    });
});

// Floating Decorative Elements
const floatingElementsContainer = document.createElement('div');
floatingElementsContainer.style.position = 'relative';
floatingElementsContainer.style.zIndex = '1';
document.body.appendChild(floatingElementsContainer);

for (let i = 0; i < 10; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.style.left = `${Math.random() * 100}%`;
    element.style.top = `${Math.random() * 100}%`;
    element.style.animationDelay = `${Math.random() * 5}s`;
    floatingElementsContainer.appendChild(element);
}

// Contact Form Handler
document.querySelector('form')?.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Retrieve input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert(`Thank you, ${name}! Your message has been sent.`);
        this.reset(); // Clear the form fields
    } else {
        alert('Please fill out all fields before submitting.');
    }
});
