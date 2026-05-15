/* ============================================
   THEME.JS - Dark/Light mode toggle
============================================ */

(function () {
  // Apply saved theme IMMEDIATELY to prevent flash
  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
})();

document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.theme-toggle');

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  };

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  });
});
