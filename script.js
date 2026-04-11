// ===== EMAILJS CONTACT FORM =====
// ─── SETUP: Replace these 3 values with your own from emailjs.com ───
const EMAILJS_PUBLIC_KEY  = 't_hie3BldbRr9sa8C';   // Account → API Keys
const EMAILJS_SERVICE_ID  = 'service_y5gomfs';   // Email Services → Service ID
const EMAILJS_TEMPLATE_ID = 'template_ws40wlw';  // Email Templates → Template ID
// ────────────────────────────────────────────────────────────────────

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

const submitBtn = document.getElementById('cf-submit');
const statusEl  = document.getElementById('cf-status');

submitBtn.addEventListener('click', () => {
  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const subject = document.getElementById('cf-subject').value.trim();
  const message = document.getElementById('cf-message').value.trim();

  if (!name || !email || !subject || !message) {
    statusEl.style.color = '#e8724a';
    statusEl.textContent = 'Please fill in all fields.';
    return;
  }

  submitBtn.textContent          = 'Sending...';
  submitBtn.style.opacity        = '0.7';
  submitBtn.style.pointerEvents  = 'none';
  statusEl.style.color           = 'var(--muted)';
  statusEl.textContent           = '';

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name:  name,
    from_email: email,
    subject:    subject,
    message:    message,
    to_email:   'prekshamaheshwari110@gmail.com',
  })
  .then(() => {
    submitBtn.textContent      = 'Message Sent!';
    submitBtn.style.background = '#4caf50';
    statusEl.style.color       = '#4caf50';
    statusEl.textContent       = "Thanks! I'll get back to you soon.";
    ['cf-name','cf-email','cf-subject','cf-message'].forEach(id => {
      document.getElementById(id).value = '';
    });
    setTimeout(() => {
      submitBtn.textContent          = 'Send Message';
      submitBtn.style.background     = '';
      submitBtn.style.opacity        = '1';
      submitBtn.style.pointerEvents  = 'auto';
      statusEl.textContent           = '';
    }, 4000);
  })
  .catch(err => {
    console.error('EmailJS error:', err);
    submitBtn.textContent          = 'Send Message';
    submitBtn.style.opacity        = '1';
    submitBtn.style.pointerEvents  = 'auto';
    statusEl.style.color           = '#e8724a';
    statusEl.textContent           = 'Something went wrong. Try emailing directly.';
  });
});

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
