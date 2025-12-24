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

  const getPageUrlFromNav = ({ label, hrefPattern, fallbackPath }) => {
    const navLinks = Array.from(document.querySelectorAll('a.md-nav__link[href]'));
    const byLabel = navLinks.find((link) => normalize(link.textContent).trim() === normalize(label).trim());
    const byHref = navLinks.find((link) => hrefPattern.test(link.getAttribute('href') ?? ''));
    const href = (byLabel ?? byHref)?.getAttribute('href');
    if (href) return new URL(href, window.location.href);

    const base = getMaterialBase();
    if (base) return new URL(`${base.replace(/\/$/, '')}/${fallbackPath.replace(/^\//, '')}`, window.location.href);

    return new URL(fallbackPath, window.location.href);
  };

  const setupReferenceLinks = ({ selector, getId, pageUrl, onPage }) => {
    Array.from(document.querySelectorAll(selector)).forEach((link) => {
      const id = getId(link);
      if (!id) return;

      if (onPage) {
        link.href = `#${id}`;
        return;
      }

      const targetUrl = new URL(pageUrl.toString());
      targetUrl.hash = id;
      link.href = targetUrl.toString();
    });
  };

  const isKeywordsPage = () => /\/keywords(\/|\.html$)/.test(window.location.pathname);
  const isStatusEffectsPage = () => /\/status-effects(\/|\.html$)/.test(window.location.pathname);
  const isCardTypesPage = () => /\/card-types(\/|\.html$)/.test(window.location.pathname);
  const isTerminologyPage = () => /\/terminology(\/|\.html$)/.test(window.location.pathname);
  const isRolesPage = () => /\/roles(\/|\.html$)/.test(window.location.pathname);

  const getKeywordsPageUrl = () => {
    return getPageUrlFromNav({
      label: 'keywords',
      hrefPattern: /(^|\/)keywords(\/|index\.html$|\.html$)/,
      fallbackPath: 'keywords/',
    });
  };

  const getStatusEffectsPageUrl = () =>
    getPageUrlFromNav({
      label: 'status effects',
      hrefPattern: /(^|\/)status-effects(\/|index\.html$|\.html$)/,
      fallbackPath: 'status-effects/',
    });

  const getCardTypesPageUrl = () =>
    getPageUrlFromNav({
      label: 'card types',
      hrefPattern: /(^|\/)card-types(\/|index\.html$|\.html$)/,
      fallbackPath: 'card-types/',
    });

  const getTerminologyPageUrl = () =>
    getPageUrlFromNav({
      label: 'terminology',
      hrefPattern: /(^|\/)terminology(\/|index\.html$|\.html$)/,
      fallbackPath: 'terminology/',
    });

  const getRolesPageUrl = () =>
    getPageUrlFromNav({
      label: 'roles',
      hrefPattern: /(^|\/)roles(\/|index\.html$|\.html$)/,
      fallbackPath: 'roles/',
    });

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
      items: Array.from(document.querySelectorAll('#terminology-table tbody tr.term-entry')),
      getIndexText: (row) => row.textContent,
    });

    // Keyword filtering
    setupFilter({
      input: document.getElementById('keyword-filter'),
      items: Array.from(document.querySelectorAll('.keyword-entry')),
      getIndexText: (entry) => entry.textContent,
    });

    // Keyword links (same markup can be copied between pages)
    setupReferenceLinks({
      selector: 'a.ua-keyword-link[data-keyword]',
      getId: (link) => link.dataset.keyword,
      pageUrl: getKeywordsPageUrl(),
      onPage: isKeywordsPage(),
    });

    setupReferenceLinks({
      selector: 'a.ua-status-link[data-status]',
      getId: (link) => link.dataset.status,
      pageUrl: getStatusEffectsPageUrl(),
      onPage: isStatusEffectsPage(),
    });

    setupReferenceLinks({
      selector: 'a.ua-card-type-link[data-card-type]',
      getId: (link) => link.dataset.cardType,
      pageUrl: getCardTypesPageUrl(),
      onPage: isCardTypesPage(),
    });

    setupReferenceLinks({
      selector: 'a.ua-term-link[data-term]',
      getId: (link) => link.dataset.term,
      pageUrl: getTerminologyPageUrl(),
      onPage: isTerminologyPage(),
    });

    setupReferenceLinks({
      selector: 'a.ua-role-link[data-role]',
      getId: (link) => link.dataset.role,
      pageUrl: getRolesPageUrl(),
      onPage: isRolesPage(),
    });

    // Status effects filtering
    setupFilter({
      input: document.getElementById('status-filter'),
      items: Array.from(document.querySelectorAll('.status-entry')),
      getIndexText: (entry) => entry.textContent,
    });

    // Roles filtering
    setupFilter({
      input: document.getElementById('role-filter'),
      items: Array.from(document.querySelectorAll('.role-entry')),
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
