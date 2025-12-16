document.addEventListener('DOMContentLoaded', () => {
  const sanitize = (value) => (value || '').toString().toLowerCase();

  const matchesLetter = (label, letter) => {
    if (!letter) return true;
    const first = (label || '').trim().charAt(0).toLowerCase();
    if (!first) return false;
    if (letter === '0-9') return first >= '0' && first <= '9';
    if (letter === '#') return !(/[a-z0-9]/i).test(first);
    return first === letter;
  };

  document.querySelectorAll('.az-index').forEach((bar) => {
    const inputId = bar.dataset.target;
    const input = inputId ? document.getElementById(inputId) : null;
    if (!input) return;
    bar.querySelectorAll('button[data-letter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        input.dataset.letterFilter = btn.dataset.letter || '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      });
    });
  });

  // Characters list filtering
  const characterInput = document.getElementById('character-filter');
  const characterCards = Array.from(document.querySelectorAll('.character-card'));
  if (characterInput && characterCards.length) {
    const filterCharacters = () => {
      const term = sanitize(characterInput.value);
      const letter = sanitize(characterInput.dataset.letterFilter || '');
      characterCards.forEach((card) => {
        const combined = sanitize(
          `${card.dataset.name} ${card.dataset.version} ${card.dataset.tags}`
        );
        const nameLabel = sanitize(card.dataset.name || '');
        const matchesTerm = combined.includes(term);
        const matchesInitial = matchesLetter(nameLabel, letter);
        card.style.display = matchesTerm && matchesInitial ? '' : 'none';
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
      const letter = sanitize(termInput.dataset.letterFilter || '');
      termRows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        const label = cells.length ? sanitize(cells[0].textContent) : sanitize(row.textContent);
        const matchesTerm = row.textContent.toLowerCase().includes(term);
        const matchesInitial = matchesLetter(label, letter);
        row.style.display = matchesTerm && matchesInitial ? '' : 'none';
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
      const letter = sanitize(keywordInput.dataset.letterFilter || '');
      keywordEntries.forEach((entry) => {
        const heading = entry.querySelector('h3');
        const label = heading ? sanitize(heading.textContent) : sanitize(entry.textContent);
        const matchesTerm = entry.textContent.toLowerCase().includes(term);
        const matchesInitial = matchesLetter(label, letter);
        entry.style.display = matchesTerm && matchesInitial ? '' : 'none';
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
