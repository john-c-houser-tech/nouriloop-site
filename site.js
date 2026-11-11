// NouriLoop LLC site: a shadow under the site bar once the page scrolls, and parts of the page
// that rise into place as they scroll into view. The page reads the same without this file.
(() => {
  const bar = document.querySelector('.site-bar');
  if (bar) {
    const mark = () => bar.classList.toggle('scrolled', window.scrollY > 8);
    mark();
    window.addEventListener('scroll', mark, { passive: true });
  }
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!document.body.classList.contains('wide')) return;
  const groups = '.cards, .split, .shots, .tiles, .duo, .rail-body';
  const parts = document.querySelectorAll(
    'main section > .wrap > :not(' + groups + '), .rail-body > *, .cards > li, .split > *, ' +
    '.shots > *, .tiles > li, .duo > *, .panel');
  // Only parts that start below the window are hidden, so nothing on the first screen flickers.
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const el = entry.target;
      if (entry.isIntersecting) {
        if (el.classList.contains('reveal-pre')) el.classList.replace('reveal-pre', 'reveal-in');
        io.unobserve(el);
      } else {
        el.classList.add('reveal-pre');
      }
    }
  });
  for (const el of parts) {
    if (el.matches('.cards > li, .tiles > li, .shots > *')) el.style.setProperty('--i', [...el.parentNode.children].indexOf(el));
    io.observe(el);
  }
})();
