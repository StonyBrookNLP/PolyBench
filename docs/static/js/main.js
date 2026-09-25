/* PolyBench project page — sticky nav, scroll-spy, copy-to-clipboard. */
(function () {
  'use strict';

  /* ---------- sticky nav border ---------- */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- scroll spy ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var visible = new Map();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible.set(e.target.id, e.intersectionRatio); });
      var bestId = null, bestRatio = 0;
      visible.forEach(function (ratio, id) {
        if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
      });
      links.forEach(function (a) {
        a.classList.toggle('active', bestId !== null && a.getAttribute('href') === '#' + bestId);
      });
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.15, 0.4, 0.75, 1] });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ---------- copy bibtex ---------- */
  var copy = document.getElementById('copy-bib');
  if (copy) {
    copy.addEventListener('click', function () {
      var pre = document.getElementById(copy.dataset.target);
      if (!pre) return;
      var text = pre.textContent;
      var done = function () {
        copy.textContent = 'Copied';
        copy.classList.add('done');
        setTimeout(function () {
          copy.textContent = 'Copy';
          copy.classList.remove('done');
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  }
})();
