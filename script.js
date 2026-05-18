/* ==========================================================================
   Synova — Interactive Features
   ========================================================================== */

function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function () {

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    // --- Mobile menu ---
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('mobileOverlay');

    function toggleMenu(force) {
        const open = force !== undefined ? force : !hamburger.classList.contains('open');
        hamburger.classList.toggle('open', open);
        overlay.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
    }

    hamburger.addEventListener('click', () => toggleMenu());

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on backdrop click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) toggleMenu(false);
    });

    // --- Active nav link on scroll ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

    // --- Reveal on scroll ---
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach((el, i) => {
            el.style.transitionDelay = `${(i % 3) * 0.1}s`;
            io.observe(el);
        });
    } else {
        revealEls.forEach(el => el.classList.add('visible'));
    }

    // --- Contact form ---
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMsg = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', function (e) {
            const original = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending…';
            submitBtn.disabled = true;

            // Restore button if formspree redirects back or errors
            setTimeout(() => {
                submitBtn.innerHTML = original;
                submitBtn.disabled = false;
            }, 5000);
        });
    }

});
