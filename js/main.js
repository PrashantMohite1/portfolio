(function () {
  'use strict';

  // Typed text effect
  const titles = [
    'DevOps Engineer',
    'Cloud Infrastructure Specialist',
    'CI/CD Automation Expert',
    'Kubernetes Enthusiast'
  ];
  const typedEl = document.getElementById('typedText');
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const current = titles[titleIndex];
    const display = isDeleting
      ? current.substring(0, charIndex - 1)
      : current.substring(0, charIndex + 1);

    typedEl.textContent = display;

    if (!isDeleting) {
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
    } else {
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? 40 : 80);
  }

  if (typedEl) {
    setTimeout(typeEffect, 1000);
  }

  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav__link');

  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // Reveal on scroll
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
})();
