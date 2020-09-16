const inview = (function () {
  const items = document.querySelectorAll('.inview');

  const options = {
    root: null,
    rootMargin: "0% 0% -160px",
    threshold: [0, 0.5, 1.0]
  };

  function isIntersect(entries) {
    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];

      if (e.isIntersecting) {
        e.target.classList.add('is-inviewActive');
        e.target.classList.remove('is-inviewOver', 'is-inviewReady');
      } else {
        e.target.classList.remove('is-inviewActive');
        if (e.boundingClientRect.y < e.rootBounds.y) {
          e.target.classList.add('is-inviewOver');
        }
      }

    }
  }

  const observer = new IntersectionObserver(isIntersect, options);

  // Polyfill を使わない場合は下記を削除
  observer.POLL_INTERVAL = 100;

  for (let i = 0; i < items.length; i++) {
    items[i].classList.add('is-inviewReady');
    observer.observe(items[i]);
  }

})();
