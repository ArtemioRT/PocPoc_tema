(() => {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  const mobileMq = window.matchMedia('(max-width: 768px)');

  const syncMobileState = () => {
    if (!nav || !navToggle) return;
    if (mobileMq.matches) {
      nav.dataset.open = 'false';
      navToggle.setAttribute('aria-expanded', 'false');
    } else {
      nav.dataset.open = 'true';
      navToggle.setAttribute('aria-expanded', 'true');
    }
  };

  if (navToggle && nav) {
    syncMobileState();
    mobileMq.addEventListener('change', syncMobileState);

    navToggle.addEventListener('click', () => {
      const isOpen = nav.dataset.open === 'true';
      nav.dataset.open = String(!isOpen);
      navToggle.setAttribute('aria-expanded', String(!isOpen));
    });
  }
})();
