document.addEventListener('DOMContentLoaded', () => {
  const normalize = (value) => (value ?? '').toString().toLowerCase();

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
        item.style.display = matches ? '' : 'none';
      });
    };

    input.addEventListener('input', apply, { passive: true });
    input.addEventListener('search', apply, { passive: true });
    apply();
  };

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
  const keywordEntries = Array.from(document.querySelectorAll('.keyword-entry'));
  setupFilter({
    input: document.getElementById('keyword-filter'),
    items: keywordEntries,
    getIndexText: (entry) => entry.textContent,
  });

  // Status effects filtering
  setupFilter({
    input: document.getElementById('status-filter'),
    items: Array.from(document.querySelectorAll('.status-entry')),
    getIndexText: (entry) => entry.textContent,
  });
});
