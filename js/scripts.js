// Black Beard's Portfolio — Interactive Neural Particles & Category Filtering
document.addEventListener('DOMContentLoaded', function () {
    // 1. Initialize Particles.js if container exists on page
    var particleEl = document.getElementById('interactive-particle-container');
    if (particleEl && typeof particlesJS === 'function') {
        particlesJS('interactive-particle-container', {
            particles: {
                number: {
                    value: 55,
                    density: { enable: true, value_area: 700 }
                },
                color: { value: ['#00d4ff', '#00ff9d', '#a855f7'] },
                shape: { type: 'circle' },
                opacity: { value: 0.55, random: true },
                size: { value: 3.5, random: true },
                line_linked: {
                    enable: true,
                    distance: 145,
                    color: '#00d4ff',
                    opacity: 0.32,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.8,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    repulse: { distance: 95, duration: 0.4 },
                    push: { particles_nb: 6 }
                }
            },
            retina_detect: true
        });
    }

    // 2. Category Filter Buttons (Projects & Blog grids)
    var filterGroups = document.querySelectorAll('[data-filter-group]');
    filterGroups.forEach(function (group) {
        var targetSelector = group.getAttribute('data-filter-group');
        var items = document.querySelectorAll(targetSelector + ' [data-category]');
        var buttons = group.querySelectorAll('.filter-btn');

        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var cat = btn.getAttribute('data-filter');
                buttons.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                items.forEach(function (item) {
                    var itemCats = (item.getAttribute('data-category') || '').split(/\s+/);
                    if (cat === 'all' || itemCats.indexOf(cat) !== -1) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });

                if (typeof AOS !== 'undefined' && AOS.refresh) {
                    setTimeout(function () { AOS.refresh(); }, 60);
                }
            });
        });
    });

    // 3. Initialize AOS animations safely
    if (typeof AOS !== 'undefined') {
        AOS.init({ once: true, duration: 750, offset: 40 });
    }
});
