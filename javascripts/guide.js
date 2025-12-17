document.addEventListener('DOMContentLoaded', () => {
  const sanitize = (value) => (value || '').toString().toLowerCase();

  // Characters list filtering
  const characterInput = document.getElementById('character-filter');
  const characterCards = Array.from(document.querySelectorAll('.character-card'));
  if (characterInput && characterCards.length) {
    const filterCharacters = () => {
      const term = sanitize(characterInput.value);
      characterCards.forEach((card) => {
        const combined = sanitize(
          `${card.dataset.name} ${card.dataset.version} ${card.dataset.tags}`
        );
        const matchesTerm = combined.includes(term);
        card.style.display = matchesTerm ? '' : 'none';
      });
    };
    characterInput.addEventListener('input', filterCharacters);
    filterCharacters();
  }

  // Terminology filtering
  const termInput = document.getElementById('term-filter');
  const termRows = Array.from(document.querySelectorAll('#terminology-table tbody tr'));
  if (termInput && termRows.length) {
    const filterTerms = () => {
      const term = sanitize(termInput.value);
      termRows.forEach((row) => {
        const matchesTerm = row.textContent.toLowerCase().includes(term);
        row.style.display = matchesTerm ? '' : 'none';
      });
    };
    termInput.addEventListener('input', filterTerms);
    filterTerms();
  }

  // Keyword filtering
  const keywordInput = document.getElementById('keyword-filter');
  const keywordEntries = Array.from(document.querySelectorAll('.keyword-entry'));
  if (keywordInput && keywordEntries.length) {
    const filterKeywords = () => {
      const term = sanitize(keywordInput.value);
      keywordEntries.forEach((entry) => {
        const matchesTerm = entry.textContent.toLowerCase().includes(term);
        entry.style.display = matchesTerm ? '' : 'none';
      });
    };
    keywordInput.addEventListener('input', filterKeywords);
    filterKeywords();
  }

  // Keyword chip click-to-scroll and highlight
  const chips = Array.from(document.querySelectorAll('.keyword-chip'));
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const targetId = chip.dataset.target;
      const target = targetId ? document.getElementById(targetId) : null;
      if (!target) return;

      target.classList.remove('keyword-highlight');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      window.setTimeout(() => {
        target.classList.add('keyword-highlight');
      }, 50);

      window.setTimeout(() => {
        target.classList.remove('keyword-highlight');
      }, 1500);
    });
  });
});
