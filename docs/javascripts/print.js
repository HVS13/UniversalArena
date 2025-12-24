(() => {
  const init = () => {
    const button = document.querySelector('.ua-print-button');
    if (!button) return;

    button.addEventListener('click', () => {
      window.print();
    });
  };

  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(init);
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
