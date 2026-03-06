(function() {
  // hide loading screen
  window.addEventListener('load', function() {
    document.getElementById('loading').style.opacity = 0;
    setTimeout(() => document.getElementById('loading').style.display = 'none', 900);
  });

  // custom cursor
  const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // TYPED effect for hero subtitle
  const typedSpan = document.getElementById('typed-text');
  const phrases = [
    'Finance Department Student',
    'Content Creator',
    'Social Media Manager',
    'Video Editor',
    'Graphic Designer',
    'SEO & Brand Collaboration'
  ];
  let i = 0, j = 0, isDeleting = false;
  function typeEffect() {
    if (i < phrases.length) {
      if (!isDeleting && j <= phrases[i].length) {
        typedSpan.textContent = phrases[i].substring(0, j++);
      } else if (isDeleting && j >= 0) {
        typedSpan.textContent = phrases[i].substring(0, j--);
      }
      if (j === phrases[i].length && !isDeleting) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
      } else if (j === 0 && isDeleting) {
        isDeleting = false;
        i = (i + 1) % phrases.length;
        setTimeout(typeEffect, 200);
      } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
      }
    }
  }
  typeEffect();

  // particle canvas background
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  for (let i = 0; i < 70; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      color: `rgba(${100 + Math.random()*155}, 255, 255, ${Math.random()*0.4+0.2})`
    });
  }
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = 'cyan';
      ctx.shadowBlur = 8;
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  // scroll reveal & progress bars
  const reveals = document.querySelectorAll('.reveal');
  const progressFills = document.querySelectorAll('.progress-fill');
  function checkReveal() {
    for (let el of reveals) {
      const windowHeight = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight - 100) el.classList.add('active');
    }
    const aboutSec = document.getElementById('about');
    if (aboutSec.getBoundingClientRect().top < window.innerHeight-150) {
      progressFills.forEach(f => {
        const width = f.getAttribute('data-width');
        if (width && !f.style.width) f.style.width = width + '%';
      });
    }
  }
  window.addEventListener('scroll', checkReveal);
  checkReveal();

  // tilt effect for cards
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const angleX = (y - centerY) / 15;
      const angleY = (centerX - x) / 15;
      card.style.transform = `perspective(800px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
    });
  });

  // simple parallax effect on hero
  window.addEventListener('scroll', function() {
    let offset = window.scrollY;
    document.querySelector('.hero').style.backgroundPositionY = offset * 0.1 + 'px';
  });
})();