// Apply the saved theme before styles paint to avoid a flash between pages.
(function () {
  let saved;
  try { saved = localStorage.getItem('portfolio-theme'); } catch {}
  const theme = saved === 'light' || saved === 'dark'
    ? saved
    : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
})();
