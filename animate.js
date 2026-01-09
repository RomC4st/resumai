// Stockage position souris (si tu veux l'exploiter plus tard)
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Détection visibilité
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;

    try {
      const settings = JSON.parse(el.dataset.settings.replace(/'/g, '"'));

      // Animation
      if (settings._animation && settings._animation !== 'none') {
        el.classList.add('animate__animated', `animate__${settings._animation}`);
      }

      // Responsive translate
      let tx = 0, ty = 0;
      const w = window.innerWidth;

      if (w <= 767) {
        tx = settings._transform_translateX_effect_mobile?.size || 0;
        ty = settings._transform_translateY_effect_mobile?.size || 0;
      } else if (w <= 1024) {
        tx = settings._transform_translateX_effect_tablet?.size || 0;
        ty = settings._transform_translateY_effect_tablet?.size || 0;
      } else {
        tx = settings._transform_translateX_effect?.size || 0;
        ty = settings._transform_translateY_effect?.size || 0;
      }

      // Appliquer inline
      el.style.transform = `translate(${tx}px, ${ty}px)`;

      // Rendre visible
      el.classList.remove('elementor-invisible');

      // Lancer une seule fois
      observer.unobserve(el);

    } catch (e) {
      console.warn('Erreur data-settings', e, el);
    }
  });
}, {
  threshold: 0.2 // 20% visible
});

// Observer toutes les sections
document.querySelectorAll('[data-settings]').forEach(el => {
  observer.observe(el);
});
