document.addEventListener('DOMContentLoaded', () => {

  // Sticky Navbar
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Scroll Reveal Animations
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // If element is in view
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve to only animate once
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% visible
  });

  reveals.forEach(reveal => {
    observer.observe(reveal);
  });

});
