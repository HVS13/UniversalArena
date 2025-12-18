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

  const isKeywordsPage = () => /\/keywords(\/|\.html$)/.test(window.location.pathname);

  const getKeywordsPageUrl = () => {
    const navLinks = Array.from(document.querySelectorAll('a.md-nav__link[href]'));
    const byLabel = navLinks.find((link) => normalize(link.textContent).trim() === 'keywords');
    const byHref = navLinks.find((link) =>
      /(^|\/)keywords(\/|index\.html$|\.html$)/.test(link.getAttribute('href') ?? ''),
    );
    const href = (byLabel ?? byHref)?.getAttribute('href');
    if (href) return new URL(href, window.location.href);

    const base = getMaterialBase();
    if (base) return new URL(`${base.replace(/\/$/, '')}/keywords/`, window.location.href);

    return new URL('keywords/', window.location.href);
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
    const keywordsPageUrl = getKeywordsPageUrl();
    const onKeywordsPage = isKeywordsPage();
    Array.from(document.querySelectorAll('a.ua-keyword-link[data-keyword]')).forEach((link) => {
      const keywordId = link.dataset.keyword;
      if (!keywordId) return;
      if (onKeywordsPage) {
        link.href = `#${keywordId}`;
        return;
      }

      const targetUrl = new URL(keywordsPageUrl.toString());
      targetUrl.hash = keywordId;
      link.href = targetUrl.toString();
    });

    // Status effects filtering
    setupFilter({
      input: document.getElementById('status-filter'),
      items: Array.from(document.querySelectorAll('.status-entry')),
      getIndexText: (entry) => entry.textContent,
    });

    // Card type filtering
    setupFilter({
      input: document.getElementById('card-type-filter'),
      items: Array.from(document.querySelectorAll('.card-type-entry')),
      getIndexText: (entry) => entry.textContent,
    });
  };

  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(init);
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
