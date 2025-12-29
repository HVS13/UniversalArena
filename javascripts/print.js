(() => {
  const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'BUTTON', 'SVG']);

  const normalizeInlineText = (text) => (text ?? '').replace(/\s+/g, ' ');
  const stripTrailingNewlines = (text) => (text ?? '').replace(/\n+$/, '');

  const getContentRoot = () =>
    document.querySelector('article.md-content__inner') ??
    document.querySelector('.md-content__inner');

  const isPermalinkNode = (node) => {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return false;
    const el = node;
    if (el.classList.contains('headerlink')) return true;
    if (el.classList.contains('toclink')) return true;
    if (el.getAttribute('aria-label') === 'Permanent link') return true;
    return false;
  };

  const removePermalinks = (root) => {
    root.querySelectorAll('.headerlink, .toclink').forEach((node) => node.remove());
  };

  const removeImages = (root) => {
    root.querySelectorAll('img, svg').forEach((node) => node.remove());
    root.querySelectorAll('picture, figure').forEach((node) => {
      if (!(node.textContent ?? '').trim()) node.remove();
    });
    root.querySelectorAll('p').forEach((node) => {
      if (!(node.textContent ?? '').trim() && node.children.length === 0) node.remove();
    });
  };

  const cloneContentRoot = () => {
    const root = getContentRoot();
    if (!root) return null;

    const clone = root.cloneNode(true);
    clone.querySelectorAll('.ua-print-actions').forEach((node) => node.remove());
    clone.querySelectorAll('button.md-content__button').forEach((node) => node.remove());
    removePermalinks(clone);
    removeImages(clone);
    return clone;
  };

  const getExportTitle = (root) => {
    const heading = root.querySelector('h1');
    if (heading && heading.textContent) return heading.textContent;
    return document.title || 'page';
  };

  const sanitizeFilename = (value) => {
    const cleaned = (value ?? '')
      .toString()
      .trim()
      .replace(/[\\/:*?"<>|]/g, '');
    const spaced = cleaned.replace(/\s+/g, ' ').trim();
    return spaced ? spaced.replace(/ /g, '-') : 'page';
  };

  const downloadFile = (contents, filename, mimeType) => {
    const blob = new Blob([contents], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const serializeInlineChildren = (node) =>
    Array.from(node.childNodes)
      .map((child) => serializeInline(child))
      .join('');

  const serializeInline = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return normalizeInlineText(node.textContent);
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return '';

    const tag = node.tagName.toUpperCase();
    if (SKIP_TAGS.has(tag)) return '';

    if (tag === 'BR') return '\n';

    if (tag === 'STRONG' || tag === 'B') {
      const text = serializeInlineChildren(node).trim();
      return text ? `**${text}**` : '';
    }

    if (tag === 'EM' || tag === 'I') {
      const text = serializeInlineChildren(node).trim();
      return text ? `*${text}*` : '';
    }

    if (tag === 'CODE') {
      const code = (node.textContent ?? '').replace(/`/g, '\\`');
      return code ? `\`${code}\`` : '';
    }

    if (tag === 'A') {
      if (isPermalinkNode(node)) return '';
      const label = serializeInlineChildren(node).trim();
      return label;
    }

    if (tag === 'IMG') {
      const alt = node.getAttribute('alt') ?? '';
      return alt;
    }

    return serializeInlineChildren(node);
  };

  const serializeListItemParts = (item) => {
    const inlineNodes = [];
    const nestedLists = [];

    item.childNodes.forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const tag = child.tagName.toUpperCase();
        if (tag === 'UL' || tag === 'OL') {
          nestedLists.push(child);
          return;
        }
        if (tag === 'P') {
          inlineNodes.push(...child.childNodes);
          return;
        }
      }
      inlineNodes.push(child);
    });

    const inlineText = inlineNodes.map((node) => serializeInline(node)).join('').trim();
    return { inlineText, nestedLists };
  };

  const serializeList = (node, depth, ordered) => {
    const items = Array.from(node.children).filter((child) => child.tagName === 'LI');
    if (!items.length) return '';

    return items
      .map((item, index) => {
        const bullet = ordered ? `${index + 1}.` : '-';
        const indent = '  '.repeat(depth);
        const { inlineText, nestedLists } = serializeListItemParts(item);
        let line = `${indent}${bullet}`;
        if (inlineText) line += ` ${inlineText}`;

        const nestedText = nestedLists
          .map((list) => {
            const isOrdered = list.tagName.toUpperCase() === 'OL';
            const listText = serializeList(list, depth + 1, isOrdered);
            return listText ? `\n${listText}` : '';
          })
          .join('');

        return `${line}${nestedText}`;
      })
      .join('\n');
  };

  const getCodeLanguage = (codeEl) => {
    if (!codeEl) return '';
    const match = (codeEl.className ?? '').match(/language-([a-z0-9_-]+)/i);
    return match ? match[1] : '';
  };

  const serializeCodeBlock = (node) => {
    const codeEl = node.querySelector('code');
    const raw = codeEl ? codeEl.textContent ?? '' : node.textContent ?? '';
    const language = getCodeLanguage(codeEl);
    const fence = '```';
    const content = stripTrailingNewlines(raw);
    return `${fence}${language ? language : ''}\n${content}\n${fence}`;
  };

  const serializeBlockquote = (node, depth) => {
    const content = serializeBlockChildren(node, depth).trim();
    if (!content) return '';
    return content
      .split('\n')
      .map((line) => (line ? `> ${line}` : '>'))
      .join('\n');
  };

  const serializeTable = (node) => {
    const rows = Array.from(node.querySelectorAll('tr'));
    if (!rows.length) return '';

    const theadRow = node.querySelector('thead tr');
    let headerRow = theadRow ?? null;
    if (!headerRow && rows.length) {
      headerRow = rows[0];
    }

    const getCells = (row) =>
      Array.from(row.children).filter(
        (cell) => cell.tagName === 'TH' || cell.tagName === 'TD'
      );

    const cellText = (cell) =>
      serializeInlineChildren(cell)
        .replace(/\s+/g, ' ')
        .trim();

    const headerCells = headerRow ? getCells(headerRow) : [];
    const headerTexts = headerCells.map(cellText);
    const columnCount = Math.max(
      headerTexts.length,
      ...rows.map((row) => getCells(row).length)
    );

    if (!columnCount) return '';

    while (headerTexts.length < columnCount) headerTexts.push('');

    const separator = Array.from({ length: columnCount }, () => '---');
    const bodyRows = rows.filter((row) => row !== headerRow);

    const bodyLines = bodyRows.map((row) => {
      const cells = getCells(row).map(cellText);
      while (cells.length < columnCount) cells.push('');
      return `| ${cells.join(' | ')} |`;
    });

    const headerLine = `| ${headerTexts.join(' | ')} |`;
    const separatorLine = `| ${separator.join(' | ')} |`;

    return [headerLine, separatorLine, ...bodyLines].join('\n');
  };

  const serializeBlockChildren = (node, depth) => {
    const parts = [];
    node.childNodes.forEach((child) => {
      const text = serializeBlock(child, depth);
      if (text) parts.push(text);
    });
    return parts.join('');
  };

  const serializeBlock = (node, depth) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = normalizeInlineText(node.textContent).trim();
      return text ? `${text}\n\n` : '';
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return '';

    const tag = node.tagName.toUpperCase();
    if (SKIP_TAGS.has(tag)) return '';

    if (tag === 'H1' || tag === 'H2' || tag === 'H3' || tag === 'H4' || tag === 'H5' || tag === 'H6') {
      const level = Number(tag.replace('H', '')) || 1;
      const text = serializeInlineChildren(node).trim();
      return text ? `${'#'.repeat(level)} ${text}\n\n` : '';
    }

    if (tag === 'P') {
      const text = serializeInlineChildren(node).trim();
      return text ? `${text}\n\n` : '';
    }

    if (tag === 'UL' || tag === 'OL') {
      const listText = serializeList(node, depth, tag === 'OL');
      return listText ? `${listText}\n\n` : '';
    }

    if (tag === 'PRE') {
      return `${serializeCodeBlock(node)}\n\n`;
    }

    if (tag === 'BLOCKQUOTE') {
      const quote = serializeBlockquote(node, depth);
      return quote ? `${quote}\n\n` : '';
    }

    if (tag === 'TABLE') {
      const table = serializeTable(node);
      return table ? `${table}\n\n` : '';
    }

    if (tag === 'HR') {
      return '---\n\n';
    }

    if (tag === 'IMG') {
      const alt = (node.getAttribute('alt') ?? '').trim();
      return alt ? `${alt}\n\n` : '';
    }

    if (tag === 'BR') {
      return '\n';
    }

    return serializeBlockChildren(node, depth);
  };

  const toMarkdown = (root) => {
    const output = serializeBlockChildren(root, 0).replace(/\n{3,}/g, '\n\n').trim();
    return output ? `${output}\n` : '';
  };

  const exportText = () => {
    const root = cloneContentRoot();
    if (!root) return;
    const text = (root.innerText ?? '').replace(/\n{3,}/g, '\n\n').trim();
    const title = sanitizeFilename(getExportTitle(root));
    downloadFile(`${text}\n`, `${title}.txt`, 'text/plain');
  };

  const exportMarkdown = () => {
    const root = cloneContentRoot();
    if (!root) return;
    const markdown = toMarkdown(root);
    const title = sanitizeFilename(getExportTitle(root));
    downloadFile(markdown || '', `${title}.md`, 'text/markdown');
  };

  const init = () => {
    const buttons = Array.from(document.querySelectorAll('.ua-action-button[data-action]'));
    if (!buttons.length) return;

    buttons.forEach((button) => {
      if (button.dataset.uaBound) return;
      button.dataset.uaBound = 'true';

      const action = button.dataset.action;
      if (action === 'print') {
        button.addEventListener('click', () => window.print());
        return;
      }

      if (action === 'md') {
        button.addEventListener('click', exportMarkdown);
        return;
      }

      if (action === 'txt') {
        button.addEventListener('click', exportText);
      }
    });
  };

  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(init);
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
