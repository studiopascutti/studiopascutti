/* Small enhancements; content, links and details work without JavaScript. */
(() => {
  document.documentElement.classList.add('js');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }
  if (toggle && nav) {
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
    const mobile = window.matchMedia('(max-width: 740px)');
    mobile.addEventListener('change', () => setMenu(false));
  }
  const textToggles = document.querySelectorAll('[data-text-toggle]');
  function setLargeText(on) {
    document.documentElement.classList.toggle('text-large', on);
    textToggles.forEach(button => {
      button.setAttribute('aria-pressed', String(on));
      button.textContent = on ? 'A− Testo normale' : 'A+ Testo più grande';
    });
    try { localStorage.setItem('sp-testo-grande', on ? '1' : '0'); } catch (_) {}
  }
  let large = false;
  try { large = localStorage.getItem('sp-testo-grande') === '1'; } catch (_) {}
  setLargeText(large);
  textToggles.forEach(button => button.addEventListener('click', () => setLargeText(!document.documentElement.classList.contains('text-large'))));
  function revealAnchor() {
    if (!location.hash) return;
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
    const target = document.getElementById(id);
    if (!target) return;
    const detail = target.matches('details') ? target : target.closest('details');
    if (detail) detail.open = true;
  }
  window.addEventListener('hashchange', revealAnchor);
  revealAnchor();
})();
