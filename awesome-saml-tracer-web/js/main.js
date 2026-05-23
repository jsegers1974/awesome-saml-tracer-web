/* Awesome SAML Tracer website — minimal vanilla JS, no dependencies. */
(function () {
  'use strict';

  // Mobile navigation toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close the menu after tapping a link
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  // Auto-fill the current year in footers
  var yearEls = document.querySelectorAll('[data-year]');
  var year = new Date().getFullYear();
  yearEls.forEach(function (el) { el.textContent = year; });
})();
