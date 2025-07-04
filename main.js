// Remove dead code: unused hero-3d canvas

// --- Scrollspy ---
const sections = document.querySelectorAll('[data-section]');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let fromTop = window.scrollY + 120;
  sections.forEach(section => {
    if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
      navItems.forEach(link => link.classList.remove('active'));
      const active = document.querySelector('.nav-links a[data-section="' + section.id + '"]');
      if (active) active.classList.add('active');
    }
  });
});

// --- Dark/Light Mode Toggle ---
const modeToggle = document.querySelector('.mode-toggle');
modeToggle && modeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  if (html.getAttribute('data-accent') === 'red') {
    html.removeAttribute('data-accent');
  } else {
    html.setAttribute('data-accent', 'red');
  }
});

// --- Typewriter Effect ---
const typewriter = document.querySelector('.typewriter');
if (typewriter) {
  const texts = ["Uzair Ahmad", "ShadowByte"];
  let i = 0, j = 0, isDeleting = false, current = 0;
  function type() {
    const fullText = texts[current];
    if (!isDeleting) {
      typewriter.textContent = fullText.slice(0, j);
      if (j < fullText.length) {
        j++;
        setTimeout(type, 80);
      } else {
        setTimeout(() => { isDeleting = true; type(); }, 1200);
      }
    } else {
      typewriter.textContent = fullText.slice(0, j);
      if (j > 0) {
        j--;
        setTimeout(type, 40);
      } else {
        isDeleting = false;
        current = (current + 1) % texts.length;
        setTimeout(type, 400);
      }
    }
  }
  type();
}

// --- Section Reveal on Scroll ---
function revealSections() {
  const reveals = document.querySelectorAll('[data-section]');
  const trigger = window.innerHeight * 0.92;
  reveals.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < trigger) sec.classList.add('visible');
  });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// --- Animated Skill Bars ---
function animateSkillBars() {
  document.querySelectorAll('.skill-bar .bar').forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.setProperty('--bar-width', width);
    setTimeout(() => bar.classList.add('animated'), 400);
  });
}
window.addEventListener('load', animateSkillBars);

// --- 3D Project Card Tilt ---
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// --- Particle Network Background ---
(function() {
  const canvas = document.getElementById('bg-network');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let dpr = window.devicePixelRatio || 1;
  let width = window.innerWidth;
  let height = window.innerHeight;
  let particles = [];
  const PARTICLE_COUNT = Math.floor((width * height) / 4200);

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  function randomParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 1.5 + Math.random() * 1.5
    };
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(randomParticle());
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    // Always get the current accent color for each frame
    const ACCENT = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#00ffe7';
    // Draw lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 110) {
          ctx.save();
          ctx.globalAlpha = 0.13 * (1 - dist / 110);
          ctx.strokeStyle = ACCENT;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
    // Draw particles
    for (const p of particles) {
      ctx.save();
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = ACCENT;
      ctx.shadowColor = ACCENT;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }
  }

  function update() {
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    }
  }

  function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
  }

  // Re-init on resize or theme change
  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });
  const observer = new MutationObserver(() => {
    // Update accent color if theme/accent changes
    ctx.strokeStyle = ctx.fillStyle = ACCENT;
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-accent'] });

  resize();
  initParticles();
  animate();
})();

// --- Awards Card Reveal on Scroll ---
function revealAwardCards() {
  const cards = document.querySelectorAll('.award-card');
  const trigger = window.innerHeight * 0.92;
  cards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < trigger) card.classList.add('visible');
  });
}
window.addEventListener('scroll', revealAwardCards);
window.addEventListener('load', revealAwardCards);

// --- Awards Modal Logic ---
const awardModal = document.getElementById('award-modal');
const awardModalBody = awardModal && awardModal.querySelector('.modal-body');
const closeAwardModal = awardModal && awardModal.querySelector('.close-modal');

// Award details data (add more as needed)
const awardDetails = {
  ignite: {
    icon: '🏆',
    title: '2nd Place in Blue Teaming Regional Round',
    issuer: 'Cybersecurity Hackathon by Ignite',
    date: '2024',
    description: 'Achieved 2nd place in the Blue Teaming regional round, demonstrating advanced incident response and defense skills in a national-level hackathon.',
    link: '',
    certificate: 'images/BlueTeaming.png'
  },
  cisco: {
    icon: '📜',
    title: 'Google Cybersecurity Professional',
    issuer: 'Google',
    date: '2025',
    description: 'Completed Cisco\'s Intro to Cybersecurity course, covering foundational concepts in network security, threats, and best practices.',
    link: '',
    certificate: 'images/google.jpg'
  },
  bjta1: {
    icon: '📜',
    title: 'Blue Team Junior Analyst (BJTA)',
    issuer: 'Security Blue Teams',
    date: '2023',
    description: 'Earned the BJTA certification, validating skills in blue team operations, threat detection, and SOC workflows.',
    link: '',
    certificate: 'images/bjta.png'
  },
  techverse: {
    icon: '🏆',
    title: 'CTF Winner Techverse\'25',
    issuer: 'UMT',
    date: '2025',
    description: 'Demonstrated exceptional skills in cybersecurity, problem-solving, and teamwork to secure 1st place in the Capture the Flag competition held during TechVerse at the University of Management and Technology (UMT).',
    link: '',
    certificate: 'images/techverse.png'
  }
  // Add more awards as needed
};

document.querySelectorAll('.award-card').forEach(card => {
  card.addEventListener('click', () => {
    if (!awardModal) return;
    const key = card.getAttribute('data-award');
    const data = awardDetails[key];
    if (!data) return;
    let html = `<div style="text-align:center;font-size:2.2rem;">${data.icon}</div>`;
    html += `<h3 style="margin:0.7rem 0 0.3rem 0;">${data.title}</h3>`;
    html += `<div style="color:var(--accent);font-weight:600;">${data.issuer}</div>`;
    html += `<div style="color:var(--fg);opacity:0.7;font-size:0.98rem;">${data.date}</div>`;
    html += `<p style="margin-top:1.2rem;">${data.description}</p>`;
    if (data.certificate) {
      html += `<a href="#" class="view-certificate-link" style="color:var(--accent);text-decoration:underline;font-weight:600;display:inline-block;margin-top:1.2rem;">View Certificate</a>`;
    }
    awardModalBody.innerHTML = html;
    awardModal.classList.add('open');

    // Add event listener for the certificate link
    const certLink = awardModalBody.querySelector('.view-certificate-link');
    if (certLink) {
      certLink.addEventListener('click', function(e) {
        e.preventDefault();
        openCertificateModal(data.certificate);
      });
    }
  });
});
closeAwardModal && closeAwardModal.addEventListener('click', () => awardModal.classList.remove('open'));
window.addEventListener('click', e => {
  if (e.target === awardModal) awardModal.classList.remove('open');
});
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && awardModal.classList.contains('open')) awardModal.classList.remove('open');
});

// --- Certificate Modal Logic ---
let certificateModal = document.getElementById('certificate-modal');
if (!certificateModal) {
  certificateModal = document.createElement('div');
  certificateModal.id = 'certificate-modal';
  certificateModal.className = 'modal neon-certificate-modal';
  certificateModal.innerHTML = `
    <div class="modal-content certificate-modal-content">
      <span class="close-modal">&times;</span>
      <div class="certificate-modal-body"></div>
    </div>
  `;
  document.body.appendChild(certificateModal);
}
const certificateModalBody = certificateModal.querySelector('.certificate-modal-body');
const closeCertificateModal = certificateModal.querySelector('.close-modal');

function openCertificateModal(imgPath) {
  certificateModalBody.innerHTML = `<img src="${imgPath}" alt="Certificate" style="max-width:100%;max-height:70vh;display:block;margin:0 auto;box-shadow:0 0 32px #00ffe7cc,0 0 8px #fff;">`;
  certificateModal.classList.add('open');
  setTimeout(() => certificateModal.classList.add('fade-in'), 10);
  document.body.style.overflow = 'hidden';
}
function closeCertModal() {
  certificateModal.classList.remove('fade-in');
  setTimeout(() => {
    certificateModal.classList.remove('open');
    document.body.style.overflow = '';
  }, 200);
}
closeCertificateModal.addEventListener('click', closeCertModal);
certificateModal.addEventListener('click', (e) => {
  if (e.target === certificateModal) closeCertModal();
});
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && certificateModal.classList.contains('open')) closeCertModal();
});

// --- Contact Form AJAX Submission ---
const contactForm = document.getElementById('contact-form');
const formMessage = document.querySelector('.form-message');
if (contactForm && formMessage) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    formMessage.textContent = '';
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';
    const data = new FormData(contactForm);
    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        formMessage.textContent = 'Thank you! Your message has been sent.';
        formMessage.style.color = 'var(--accent)';
        contactForm.reset();
      } else {
        formMessage.textContent = 'Sorry, there was an error. Please try again later.';
        formMessage.style.color = '#ff2d55';
      }
    } catch {
      formMessage.textContent = 'Sorry, there was an error. Please try again later.';
      formMessage.style.color = '#ff2d55';
    }
    btn.disabled = false;
    btn.textContent = 'Send';
  });
}

// --- Scroll to Top Button ---
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    scrollTopBtn && scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn && scrollTopBtn.classList.remove('show');
  }
});
scrollTopBtn && scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  scrollTopBtn.blur();
});
scrollTopBtn && scrollTopBtn.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    scrollTopBtn.blur();
  }
});


// --- Hamburger Menu ---
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.querySelector('.nav-overlay');

function closeNav() {
  navLinks.classList.remove('open');
  navToggle.classList.remove('open');
  if (navOverlay) {
    navOverlay.classList.remove('active');
    setTimeout(() => {
      navOverlay.style.display = 'none';
    }, 400);
  }
  document.body.style.overflow = '';
}

function openNav() {
  navLinks.classList.add('open');
  navToggle.classList.add('open');
  if (navOverlay) {
    navOverlay.style.display = 'block';
    setTimeout(() => {
      navOverlay.classList.add('active');
    }, 10);
  }
  document.body.style.overflow = 'hidden';
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  if (navOverlay) {
    navOverlay.addEventListener('click', closeNav);
  }

  // Mobile close button
  const mobileCloseBtn = navLinks.querySelector('.mobile-close-btn');
  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeNav);
  }

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeNav();
    }
  });
}

