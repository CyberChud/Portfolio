(function () {
  var root = document.documentElement;

  function currentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function setToggleLabel(btn) {
    btn.textContent = currentTheme() === 'light' ? '[ DARK MODE ]' : '[ LIGHT MODE ]';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    setToggleLabel(btn);
    btn.addEventListener('click', function () {
      if (currentTheme() === 'light') {
        root.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        root.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
      setToggleLabel(btn);
    });
  });
})();
