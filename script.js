/* ==========================================================================
   Synova — Interactive Features
   ========================================================================== */

function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function () {

    // --- Navbar scroll ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    // --- Mobile menu ---
    const hamburger = document.getElementById('hamburger');
    const overlay   = document.getElementById('mobileOverlay');

    function toggleMenu(force) {
        const open = force !== undefined ? force : !hamburger.classList.contains('open');
        hamburger.classList.toggle('open', open);
        overlay.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
    }

    hamburger.addEventListener('click', () => toggleMenu());
    document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => toggleMenu(false)));
    overlay.addEventListener('click', e => { if (e.target === overlay) toggleMenu(false); });

    // --- Active nav link ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function updateActive() {
        let current = '';
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) current = s.id; });
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
    }
    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();

    // --- Scroll reveal ---
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    entry.target.style.transitionDelay = `${(i % 3) * 0.08}s`;
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        revealEls.forEach(el => io.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('visible'));
    }

    // --- Contact form ---
    const form      = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const success   = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', () => {
            const orig = submitBtn.textContent;
            submitBtn.textContent = 'Sending…';
            submitBtn.disabled = true;
            setTimeout(() => { submitBtn.textContent = orig; submitBtn.disabled = false; }, 5000);
        });
    }
});
