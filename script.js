// ===== CUSTOM CURSOR =====
const dot = document.getElementById('dot');
const ring = document.getElementById('ring');

document.addEventListener('mousemove', e => {
  dot.style.left  = e.clientX + 'px';
  dot.style.top   = e.clientY + 'px';
  ring.style.left = e.clientX + 'px';
  ring.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a, .btn, .proj, .sk, .stat-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot.style.transform  = 'translate(-50%,-50%) scale(0)';
    ring.style.transform = 'translate(-50%,-50%) scale(1.8)';
    ring.style.borderColor = 'rgba(232,184,109,.7)';
  });
  el.addEventListener('mouseleave', () => {
    dot.style.transform  = 'translate(-50%,-50%) scale(1)';
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.borderColor = 'rgba(232,184,109,.5)';
  });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      let delay = i * 70;
      if (entry.target.classList.contains('reveal-delay-1')) delay = 100;
      if (entry.target.classList.contains('reveal-delay-2')) delay = 200;
      if (entry.target.classList.contains('reveal-delay-3')) delay = 300;
      setTimeout(() => entry.target.classList.add('on'), delay);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current
      ? 'var(--gold)'
      : '';
  });
}, { passive: true });