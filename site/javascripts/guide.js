(() => {
  const normalize = (value) => (value ?? '').toString().toLowerCase();

  const getMaterialBase = () => {
    const config = document.getElementById('__config');
    if (!config) return '';

    try {
      return JSON.parse(config.textContent ?? '{}')?.base ?? '';
    } catch {
      return '';
    }
  };

  const setupFilter = ({ input, items, getIndexText }) => {
    if (!input || !items.length) return;

    const indexed = items.map((item) => ({
      item,
      text: normalize(getIndexText(item)),
    }));

    const apply = () => {
      const term = normalize(input.value).trim();
      indexed.forEach(({ item, text }) => {
        const matches = !term || text.includes(term);
        item.toggleAttribute('hidden', !matches);
      });
    };

    input.addEventListener('input', apply, { passive: true });
    input.addEventListener('search', apply, { passive: true });
    apply();
  };

  const init = () => {
    // Characters list filtering
    setupFilter({
      input: document.getElementById('character-filter'),
      items: Array.from(document.querySelectorAll('.character-card')),
      getIndexText: (card) =>
        `${card.dataset.name ?? ''} ${card.dataset.version ?? ''} ${card.dataset.tags ?? ''}`,
    });

    // Terminology filtering
    setupFilter({
      input: document.getElementById('term-filter'),
      items: Array.from(document.querySelectorAll('#terminology-table tbody tr')),
      getIndexText: (row) => row.textContent,
    });

    // Keyword filtering
    setupFilter({
      input: document.getElementById('keyword-filter'),
      items: Array.from(document.querySelectorAll('.keyword-entry')),
      getIndexText: (entry) => entry.textContent,
    });

    // Keyword links (same markup can be copied between pages)
    const base = getMaterialBase();
    const onKeywordsPage = /\/keywords\/($|index\.html$)/.test(window.location.pathname);
    Array.from(document.querySelectorAll('a.ua-keyword-link[data-keyword]')).forEach((link) => {
      const keywordId = link.dataset.keyword;
      if (!keywordId) return;
      link.href = onKeywordsPage ? `#${keywordId}` : `${base}/keywords/#${keywordId}`;
    });

    // Status effects filtering
    setupFilter({
      input: document.getElementById('status-filter'),
      items: Array.from(document.querySelectorAll('.status-entry')),
      getIndexText: (entry) => entry.textContent,
    });
  };

  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(init);
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
