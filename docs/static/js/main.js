/* PolyBench project page — copy-to-clipboard for the BibTeX block. */
(function () {
  'use strict';

  /* ---------- task explorer tabs ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  function showTab(id) {
    tabs.forEach(function (t) {
      t.setAttribute('aria-selected', String(t.dataset.tab === id));
    });
    document.querySelectorAll('.panel').forEach(function (p) {
      p.hidden = p.id !== id;
    });
    try { history.replaceState(null, '', '#' + id); } catch (e) {}
  }
  tabs.forEach(function (t) {
    t.addEventListener('click', function () { showTab(t.dataset.tab); });
  });
  var initial = location.hash.slice(1);
  if (tabs.length && document.getElementById(initial)) showTab(initial);

  /* ---------- copy bibtex ---------- */
  var copy = document.getElementById('copy-bib');
  if (!copy) return;
  var label = copy.querySelector('span');

  copy.addEventListener('click', function () {
    var pre = document.getElementById(copy.dataset.target);
    if (!pre) return;
    var text = pre.textContent;

    var done = function () {
      label.textContent = 'Copied!';
      setTimeout(function () { label.textContent = 'Copy'; }, 1800);
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
})();
