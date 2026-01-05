(() => {
  const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'BUTTON', 'SVG']);

  const normalizeInlineText = (text) => (text ?? '').replace(/\s+/g, ' ');
  const stripTrailingNewlines = (text) => (text ?? '').replace(/\n+$/, '');

  const getContentRoot = (doc = document) =>
    doc.querySelector('article.md-content__inner') ??
    doc.querySelector('.md-content__inner');

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

  const removeUnsafeNodes = (root) => {
    root.querySelectorAll('script, style, noscript').forEach((node) => node.remove());
  };

  const neutralizeLinks = (root) => {
    root.querySelectorAll('a').forEach((node) => {
      if (isPermalinkNode(node)) {
        node.remove();
        return;
      }
      node.removeAttribute('href');
      node.removeAttribute('target');
      node.removeAttribute('rel');
    });
  };

  const cloneContentRoot = (doc = document, options = {}) => {
    const root = getContentRoot(doc);
    if (!root) return null;

    const clone = root.cloneNode(true);
    clone.querySelectorAll('.ua-print-actions').forEach((node) => node.remove());
    clone
      .querySelectorAll(
        '.ua-export-panel, .ua-export-panel__content, .ua-export-panel__backdrop'
      )
      .forEach((node) => node.remove());
    clone.querySelectorAll('button.md-content__button').forEach((node) => node.remove());
    removeUnsafeNodes(clone);
    removePermalinks(clone);
    removeImages(clone);
    if (options.stripLinks) neutralizeLinks(clone);
    return clone;
  };

  const getExportTitle = (root, doc = document) => {
    const heading = root.querySelector('h1');
    if (heading && heading.textContent) return heading.textContent;
    return doc.title || 'page';
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

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const escapeHtml = (value) =>
    (value ?? '')
      .toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const escapeXml = (value) =>
    (value ?? '')
      .toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

  const getSiteTitle = () => {
    const appName = document
      .querySelector('meta[name="application-name"]')
      ?.getAttribute('content');
    const ogName = document
      .querySelector('meta[property="og:site_name"]')
      ?.getAttribute('content');
    const headerTitle = document.querySelector('.md-header__title .md-ellipsis');
    const title = (appName || ogName || (headerTitle ? headerTitle.textContent : '') || 'site')
      .toString()
      .trim();
    return title || 'site';
  };

  let crcTable = null;

  const createCrcTable = () => {
    const table = new Uint32Array(256);
    for (let i = 0; i < 256; i += 1) {
      let crc = i;
      for (let j = 0; j < 8; j += 1) {
        if (crc & 1) {
          crc = 0xedb88320 ^ (crc >>> 1);
        } else {
          crc >>>= 1;
        }
      }
      table[i] = crc >>> 0;
    }
    return table;
  };

  const crc32 = (data) => {
    if (!crcTable) crcTable = createCrcTable();
    let crc = 0xffffffff;
    for (const byte of data) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ byte) & 0xff];
    }
    return (crc ^ 0xffffffff) >>> 0;
  };

  const getDosDateTime = (date = new Date()) => {
    const seconds = Math.floor(date.getSeconds() / 2);
    const time =
      (date.getHours() << 11) | (date.getMinutes() << 5) | seconds;
    const year = Math.max(1980, date.getFullYear());
    const dosYear = year - 1980;
    const dateValue =
      (dosYear << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
    return { time, date: dateValue };
  };

  const buildLocalHeader = ({ nameLength, time, date, crc, size }) => {
    const buffer = new ArrayBuffer(30);
    const view = new DataView(buffer);
    view.setUint32(0, 0x04034b50, true);
    view.setUint16(4, 20, true);
    view.setUint16(6, 0x0800, true);
    view.setUint16(8, 0, true);
    view.setUint16(10, time, true);
    view.setUint16(12, date, true);
    view.setUint32(14, crc, true);
    view.setUint32(18, size, true);
    view.setUint32(22, size, true);
    view.setUint16(26, nameLength, true);
    view.setUint16(28, 0, true);
    return new Uint8Array(buffer);
  };

  const buildCentralHeader = ({ nameLength, time, date, crc, size, offset }) => {
    const buffer = new ArrayBuffer(46);
    const view = new DataView(buffer);
    view.setUint32(0, 0x02014b50, true);
    view.setUint16(4, 20, true);
    view.setUint16(6, 20, true);
    view.setUint16(8, 0x0800, true);
    view.setUint16(10, 0, true);
    view.setUint16(12, time, true);
    view.setUint16(14, date, true);
    view.setUint32(16, crc, true);
    view.setUint32(20, size, true);
    view.setUint32(24, size, true);
    view.setUint16(28, nameLength, true);
    view.setUint16(30, 0, true);
    view.setUint16(32, 0, true);
    view.setUint16(34, 0, true);
    view.setUint16(36, 0, true);
    view.setUint32(38, 0, true);
    view.setUint32(42, offset, true);
    return new Uint8Array(buffer);
  };

  const buildEndRecord = (entryCount, centralSize, centralOffset) => {
    const buffer = new ArrayBuffer(22);
    const view = new DataView(buffer);
    view.setUint32(0, 0x06054b50, true);
    view.setUint16(4, 0, true);
    view.setUint16(6, 0, true);
    view.setUint16(8, entryCount, true);
    view.setUint16(10, entryCount, true);
    view.setUint32(12, centralSize, true);
    view.setUint32(16, centralOffset, true);
    view.setUint16(20, 0, true);
    return new Uint8Array(buffer);
  };

  const buildZip = (files) => {
    const encoder = new TextEncoder();
    const { time, date } = getDosDateTime();
    const localParts = [];
    const centralParts = [];
    const records = [];
    let offset = 0;

    files.forEach((file) => {
      const nameBytes = encoder.encode(file.name);
      const dataBytes =
        typeof file.content === 'string' ? encoder.encode(file.content) : file.content;
      const size = dataBytes.length;
      const crc = crc32(dataBytes);
      const localHeader = buildLocalHeader({
        nameLength: nameBytes.length,
        time,
        date,
        crc,
        size,
      });
      localParts.push(localHeader, nameBytes, dataBytes);
      records.push({ nameBytes, crc, size, offset });
      offset += localHeader.length + nameBytes.length + dataBytes.length;
    });

    let centralSize = 0;
    records.forEach((record) => {
      const centralHeader = buildCentralHeader({
        nameLength: record.nameBytes.length,
        time,
        date,
        crc: record.crc,
        size: record.size,
        offset: record.offset,
      });
      centralParts.push(centralHeader, record.nameBytes);
      centralSize += centralHeader.length + record.nameBytes.length;
    });

    const endRecord = buildEndRecord(records.length, centralSize, offset);
    return new Blob([...localParts, ...centralParts, endRecord], {
      type: 'application/zip',
    });
  };

  const isSameOrigin = (url) => {
    if (url.origin === location.origin) return true;
    if (url.origin === 'null' && location.origin === 'null') return true;
    return false;
  };

  const getSitePageUrls = () => {
    const links = Array.from(
      document.querySelectorAll('nav.md-nav a.md-nav__link[href]')
    );
    const urls = [];
    const seen = new Set();

    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#')) return;
      if (href.startsWith('mailto:') || href.startsWith('tel:')) return;

      let url;
      try {
        url = new URL(href, document.baseURI);
      } catch (error) {
        return;
      }

      if (!['http:', 'https:', 'file:'].includes(url.protocol)) return;
      if (!isSameOrigin(url)) return;

      url.hash = '';
      const normalized = url.href;
      if (seen.has(normalized)) return;
      seen.add(normalized);
      urls.push(normalized);
    });

    if (!urls.length) {
      urls.push(new URL(document.location.href).href);
    }

    return urls;
  };

  const fetchPageDocument = async (url) => {
    try {
      const response = await fetch(url, { credentials: 'same-origin' });
      if (!response.ok) return null;
      const html = await response.text();
      return new DOMParser().parseFromString(html, 'text/html');
    } catch (error) {
      return null;
    }
  };

  const collectSitePages = async (options = {}) => {
    const urls = getSitePageUrls();
    const pages = [];

    for (const url of urls) {
      const doc = await fetchPageDocument(url);
      if (!doc) continue;
      const root = cloneContentRoot(doc, options);
      if (!root) continue;
      const title = getExportTitle(root, doc);
      pages.push({ title, root, url });
    }

    return pages;
  };

  const buildPrintHtml = (pages, title) => {
    const safeTitle = escapeHtml(title);
    const sections = pages
      .map((page, index) => {
        const hasHeading = !!page.root.querySelector('h1');
        const heading = !hasHeading && page.title ? `<h1>${escapeHtml(page.title)}</h1>` : '';
        const content = page.root.innerHTML;
        const separator = index < pages.length - 1 ? '<div class="page-break"></div>' : '';
        return `<section>${heading}${content}</section>${separator}`;
      })
      .join('');

    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${safeTitle}</title>
    <style>
      :root { color-scheme: light; }
      body {
        font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
        color: #111;
        margin: 2rem;
        line-height: 1.6;
      }
      h1, h2, h3, h4, h5, h6 {
        page-break-after: avoid;
        margin: 1.4rem 0 0.55rem;
      }
      section { margin-bottom: 2.2rem; }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 0.75rem 0;
        font-size: 0.95rem;
      }
      th, td {
        border: 1px solid #c9c9c9;
        padding: 0.35rem 0.5rem;
        text-align: left;
        vertical-align: top;
      }
      pre {
        background: #f4f4f4;
        padding: 0.75rem;
        border-radius: 6px;
        white-space: pre-wrap;
      }
      code { font-family: "Consolas", "Courier New", monospace; }
      a {
        color: inherit;
        text-decoration: none;
      }
      .page-break { page-break-after: always; }
      @media print {
        body { margin: 0.75in; }
        .page-break { page-break-after: always; }
      }
    </style>
  </head>
  <body>
    ${sections}
  </body>
</html>`;
  };

  const openPrintWindow = (title) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return null;
    const safeTitle = escapeHtml(title);
    printWindow.document.open();
    printWindow.document.write(
      `<!doctype html><title>${safeTitle}</title><p>Preparing export...</p>`
    );
    printWindow.document.close();
    return printWindow;
  };

  const renderPrintWindow = (printWindow, pages, title) => {
    const html = buildPrintHtml(pages, title);
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
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

  const getTextFromRoot = (root) =>
    (root.innerText ?? '').replace(/\n{3,}/g, '\n\n').trim();

  const ensureTextTitle = (page, text) => {
    if (!text) return '';
    if (page.root.querySelector('h1')) return text;
    const title = (page.title ?? '').trim();
    return title ? `${title}\n\n${text}` : text;
  };

  const ensureMarkdownTitle = (page, markdown) => {
    if (!markdown) return '';
    if (page.root.querySelector('h1')) return markdown;
    const title = (page.title ?? '').trim();
    return title ? `# ${title}\n\n${markdown}` : markdown;
  };

  const buildPageBaseName = (page, index, usedNames) => {
    const rawTitle = (page.title ?? '').trim();
    const fallback = `page-${index + 1}`;
    const baseName = sanitizeFilename(rawTitle || fallback) || fallback;
    let name = baseName;
    let counter = 2;
    let candidate = name;

    while (usedNames.has(candidate)) {
      candidate = `${baseName}-${counter}`;
      counter += 1;
    }

    usedNames.add(candidate);
    return candidate;
  };

  const normalizeExportFormats = (options = {}) => {
    const allowed = new Set(['html', 'md', 'txt']);
    const rawFormats = Array.isArray(options.formats)
      ? options.formats
      : options.format
        ? [options.format]
        : ['html', 'md', 'txt'];
    const unique = new Set();

    rawFormats.forEach((value) => {
      const normalized = (value ?? '').toString().trim().toLowerCase();
      if (allowed.has(normalized)) unique.add(normalized);
    });

    if (!unique.size) return ['html', 'md', 'txt'];
    return Array.from(unique);
  };

  const normalizeCharacterMode = (options = {}) => {
    const mode = (options.characterMode ?? '').toString().trim().toLowerCase();
    if (mode === 'combined') return 'combined';
    if (mode === 'xlsx') return 'xlsx';
    return 'split';
  };

  const getNormalizedPathname = (url) => {
    try {
      let pathname = new URL(url).pathname || '';
      pathname = pathname.replace(/\\/g, '/');
      pathname = pathname.replace(/\/+/g, '/');
      if (pathname.length > 1 && pathname.endsWith('/')) {
        pathname = pathname.slice(0, -1);
      }
      return pathname;
    } catch (error) {
      return '';
    }
  };

  const isCharacterPage = (page) => {
    if (!page) return false;
    if (page.root?.querySelector?.('.character-header')) return true;
    if (!page.url) return false;
    const pathname = getNormalizedPathname(page.url);
    if (!pathname) return false;
    const cleaned = pathname.replace(/\/index\.html$/, '');
    const lower = cleaned.toLowerCase();
    const marker = '/characters';
    const index = lower.lastIndexOf(marker);
    if (index === -1) return false;
    const before = index === 0 ? '' : lower[index - 1];
    const after = lower[index + marker.length] || '';
    if (before && before !== '/') return false;
    if (after && after !== '/') return false;
    const remainder = cleaned.slice(index + marker.length);
    if (!remainder || remainder === '/') return false;
    return true;
  };

  const splitPagesByCharacter = (pages) => {
    const characterPages = [];
    const otherPages = [];
    pages.forEach((page) => {
      if (isCharacterPage(page)) {
        characterPages.push(page);
      } else {
        otherPages.push(page);
      }
    });
    return { characterPages, otherPages };
  };

  const isTemplateCharacterPage = (page) => {
    if (!page) return false;
    const title = (page.title ?? '').toString().trim().toLowerCase();
    if (title === 'template character' || title === 'template-character') return true;
    if (page.root?.querySelector?.('img[alt="Template character portrait placeholder"]')) {
      return true;
    }
    const pathname = getNormalizedPathname(page.url).toLowerCase();
    return pathname.includes('/characters/template');
  };

  const buildCombinedText = (pages) => {
    const parts = pages
      .map((page) => ensureTextTitle(page, getTextFromRoot(page.root)))
      .map((part) => (part ?? '').trim())
      .filter(Boolean);
    return parts.join('\n\n');
  };

  const buildCombinedMarkdown = (pages) => {
    const parts = pages
      .map((page) => {
        const markdown = toMarkdown(page.root).trim();
        return ensureMarkdownTitle(page, markdown);
      })
      .map((part) => (part ?? '').trim())
      .filter(Boolean);
    return parts.join('\n\n');
  };

  const normalizeExportText = (value) => normalizeInlineText(value ?? '').trim();

  const getSectionHeading = (root, headingText) => {
    const target = normalizeExportText(headingText).toLowerCase();
    return Array.from(root.querySelectorAll('h2')).find((heading) => {
      const text = normalizeExportText(heading.textContent).toLowerCase();
      return text === target;
    });
  };

  const getSectionNodes = (heading) => {
    const nodes = [];
    if (!heading) return nodes;
    let current = heading.nextElementSibling;
    while (current) {
      const tag = current.tagName?.toUpperCase?.();
      if (tag === 'H1' || tag === 'H2') break;
      nodes.push(current);
      current = current.nextElementSibling;
    }
    return nodes;
  };

  const extractCharacterMeta = (root) => {
    const meta = {};
    const metaRoot = root.querySelector('.character-header .character-meta');
    if (!metaRoot) return meta;
    metaRoot.querySelectorAll('p').forEach((row) => {
      const strong = row.querySelector('strong');
      if (!strong) return;
      const label = normalizeExportText(strong.textContent).replace(/:$/, '');
      if (!label) return;
      let value = normalizeExportText(row.textContent);
      if (value.toLowerCase().startsWith(label.toLowerCase())) {
        value = value.slice(label.length).trim();
      }
      if (value.startsWith(':')) value = value.slice(1).trim();
      meta[label] = value;
    });
    return meta;
  };

  const extractInnates = (root) => {
    const section = getSectionHeading(root, 'Innates');
    const nodes = getSectionNodes(section);
    return nodes
      .filter((node) => node.classList?.contains?.('card-block'))
      .map((block) => {
        const title = normalizeExportText(
          block.querySelector('.card-block__title')?.textContent
        );
        const paragraphs = Array.from(block.querySelectorAll('p')).filter(
          (p) => !p.classList.contains('card-block__title')
        );
        const text = paragraphs
          .map((p) => normalizeExportText(p.textContent))
          .filter(Boolean)
          .join('\n');
        return { title, text };
      })
      .filter((entry) => entry.title || entry.text);
  };

  const extractStatusEffects = (root) => {
    const section = getSectionHeading(root, 'Status Effects');
    const nodes = getSectionNodes(section);
    return nodes
      .filter((node) => node.classList?.contains?.('ua-entry'))
      .map((entry) => {
        const title = normalizeExportText(
          entry.querySelector('.ua-entry__title')?.textContent
        );
        const meta = {};
        entry.querySelectorAll('.ua-entry__meta').forEach((row) => {
          const pill = row.querySelector('.ua-pill');
          if (!pill) return;
          const label = normalizeExportText(pill.textContent);
          if (!label) return;
          let value = normalizeExportText(row.textContent);
          if (value.toLowerCase().startsWith(label.toLowerCase())) {
            value = value.slice(label.length).trim();
          }
          if (value.startsWith(':')) value = value.slice(1).trim();
          meta[label] = value;
        });
        return { title, meta };
      })
      .filter((entry) => entry.title || Object.keys(entry.meta).length);
  };

  const extractCards = (root) => {
    const section = getSectionHeading(root, 'Cards');
    const nodes = getSectionNodes(section);
    const cards = [];
    nodes.forEach((node) => {
      if (node.tagName?.toUpperCase?.() !== 'H3') return;
      const headingText = normalizeExportText(node.textContent);
      const cardBlock = node.nextElementSibling;
      if (!cardBlock || !cardBlock.classList?.contains?.('card-block')) return;
      const [labelPart, ...nameParts] = headingText.split(':');
      const label = normalizeExportText(labelPart);
      const name = normalizeExportText(nameParts.join(':'));
      const meta = {};
      cardBlock.querySelectorAll('.card-block__meta span').forEach((span) => {
        const strong = span.querySelector('strong');
        if (!strong) return;
        const metaLabel = normalizeExportText(strong.textContent).replace(/:$/, '');
        if (!metaLabel) return;
        let value = normalizeExportText(span.textContent);
        if (value.toLowerCase().startsWith(metaLabel.toLowerCase())) {
          value = value.slice(metaLabel.length).trim();
        }
        if (value.startsWith(':')) value = value.slice(1).trim();
        meta[metaLabel] = value;
      });
      const paragraphs = Array.from(cardBlock.querySelectorAll('p')).filter(
        (p) =>
          !p.classList.contains('card-block__heading') &&
          !p.classList.contains('card-block__title')
      );
      const effect = paragraphs
        .map((p) => normalizeExportText(p.textContent))
        .filter(Boolean)
        .join('\n');
      cards.push({ label, name, meta, effect });
    });
    return cards;
  };

  const sortKeysByPriority = (keys, priority) => {
    const normalized = new Map();
    keys.forEach((key) => {
      const trimmed = normalizeExportText(key);
      if (!trimmed) return;
      const lowered = trimmed.toLowerCase();
      if (!normalized.has(lowered)) normalized.set(lowered, trimmed);
    });
    const ordered = [];
    const used = new Set();
    priority.forEach((key) => {
      const lowered = key.toLowerCase();
      if (normalized.has(lowered)) {
        ordered.push(normalized.get(lowered));
        used.add(lowered);
      }
    });
    const remaining = Array.from(normalized.entries())
      .filter(([lowered]) => !used.has(lowered))
      .map(([, value]) => value)
      .sort((a, b) => a.localeCompare(b));
    return [...ordered, ...remaining];
  };

  const columnNumberToName = (column) => {
    let index = column;
    let name = '';
    while (index > 0) {
      const remainder = (index - 1) % 26;
      name = String.fromCharCode(65 + remainder) + name;
      index = Math.floor((index - 1) / 26);
    }
    return name || 'A';
  };

  const sanitizeSheetName = (name, usedNames) => {
    const cleaned = (name ?? '')
      .toString()
      .trim()
      .replace(/[\\/?*\[\]:]/g, '')
      .slice(0, 31);
    const baseName = cleaned || 'Sheet';
    let candidate = baseName;
    let counter = 2;
    while (usedNames.has(candidate)) {
      const suffix = ` ${counter}`;
      const maxLength = Math.max(0, 31 - suffix.length);
      candidate = `${baseName.slice(0, maxLength)}${suffix}`;
      counter += 1;
    }
    usedNames.add(candidate);
    return candidate;
  };

  const buildWorksheetXml = (rows, getSharedStringIndex) => {
    const rowXml = rows
      .map((row, rowIndex) => {
        const cells = (row ?? []).map((value, colIndex) => {
          if (value === null || value === undefined || value === '') return '';
          const cellRef = `${columnNumberToName(colIndex + 1)}${rowIndex + 1}`;
          const index = getSharedStringIndex(String(value));
          return `<c r="${cellRef}" t="s"><v>${index}</v></c>`;
        });
        return `<row r="${rowIndex + 1}">${cells.join('')}</row>`;
      })
      .join('');
    const rowCount = Math.max(rows.length, 1);
    const columnCount = Math.max(
      rows.reduce((max, row) => Math.max(max, (row ?? []).length), 1),
      1
    );
    const dimension = `A1:${columnNumberToName(columnCount)}${rowCount}`;
    const sheetViews =
      rowCount > 1
        ? '<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>'
        : '<sheetViews><sheetView workbookViewId="0"/></sheetViews>';
    return `<?xml version="1.0" encoding="UTF-8"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <dimension ref="${dimension}"/>
  ${sheetViews}
  <sheetFormatPr defaultRowHeight="15"/>
  <sheetData>${rowXml}</sheetData>
</worksheet>`;
  };

  const buildWorkbookXml = (sheets) => {
    const sheetXml = sheets
      .map(
        (sheet, index) =>
          `<sheet name="${escapeXml(sheet.name)}" sheetId="${index + 1}" r:id="rId${
            index + 1
          }"/>`
      )
      .join('');
    return `<?xml version="1.0" encoding="UTF-8"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>${sheetXml}</sheets>
</workbook>`;
  };

  const buildWorkbookRelsXml = (sheetCount) => {
    const sheetRels = Array.from({ length: sheetCount }, (_, index) => {
      const id = index + 1;
      return `<Relationship Id="rId${id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${id}.xml"/>`;
    }).join('');
    const sharedId = sheetCount + 1;
    const stylesId = sheetCount + 2;
    return `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  ${sheetRels}
  <Relationship Id="rId${sharedId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>
  <Relationship Id="rId${stylesId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;
  };

  const buildContentTypesXml = (sheetCount) => {
    const sheetOverrides = Array.from({ length: sheetCount }, (_, index) => {
      const id = index + 1;
      return `<Override PartName="/xl/worksheets/sheet${id}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`;
    }).join('');
    return `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  ${sheetOverrides}
  <Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`;
  };

  const buildSharedStringsXml = (strings, count) => {
    const items = strings
      .map((value) => `<si><t xml:space="preserve">${escapeXml(value)}</t></si>`)
      .join('');
    return `<?xml version="1.0" encoding="UTF-8"?>
<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="${count}" uniqueCount="${strings.length}">
  ${items}
</sst>`;
  };

  const buildStylesXml = () => `<?xml version="1.0" encoding="UTF-8"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="1">
    <font>
      <sz val="11"/>
      <color theme="1"/>
      <name val="Calibri"/>
      <family val="2"/>
    </font>
  </fonts>
  <fills count="1">
    <fill>
      <patternFill patternType="none"/>
    </fill>
  </fills>
  <borders count="1">
    <border>
      <left/>
      <right/>
      <top/>
      <bottom/>
      <diagonal/>
    </border>
  </borders>
  <cellStyleXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
  </cellStyleXfs>
  <cellXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
  </cellXfs>
  <cellStyles count="1">
    <cellStyle name="Normal" xfId="0" builtinId="0"/>
  </cellStyles>
</styleSheet>`;

  const buildCharacterWorkbookData = (characterPages) => {
    const characterRows = [];
    const innateRows = [];
    const statusRows = [];
    const cardRows = [];
    const characterMetaKeys = new Set();
    const statusMetaKeys = new Set();
    const cardMetaKeys = new Set();

    characterPages.forEach((page) => {
      const root = page.root;
      if (!root) return;
      const displayName = normalizeExportText(page.title);
      const meta = extractCharacterMeta(root);
      Object.keys(meta).forEach((key) => characterMetaKeys.add(key));
      const name = meta.Name || '';
      const version = meta.Version || '';

      characterRows.push({ displayName, meta });

      extractInnates(root).forEach((innate) => {
        innateRows.push([displayName, name, version, innate.title || '', innate.text || '']);
      });

      extractStatusEffects(root).forEach((status) => {
        Object.keys(status.meta).forEach((key) => statusMetaKeys.add(key));
        statusRows.push({
          displayName,
          name,
          version,
          title: status.title || '',
          meta: status.meta || {},
        });
      });

      extractCards(root).forEach((card) => {
        Object.keys(card.meta).forEach((key) => cardMetaKeys.add(key));
        cardRows.push({
          displayName,
          name,
          version,
          label: card.label || '',
          cardName: card.name || '',
          meta: card.meta || {},
          effect: card.effect || '',
        });
      });
    });

    ['Name', 'Version', 'Origin', 'Roles', 'Difficulty', 'Gameplan'].forEach((key) =>
      characterMetaKeys.add(key)
    );

    const characterMetaOrder = sortKeysByPriority(characterMetaKeys, [
      'Name',
      'Version',
      'Origin',
      'Roles',
      'Difficulty',
      'Gameplan',
    ]);

    const characterHeader = ['Character', ...characterMetaOrder];

    const characterData = characterRows.map((entry) => [
      entry.displayName,
      ...characterMetaOrder.map((key) => entry.meta[key] || ''),
    ]);

    const statusMetaOrder = sortKeysByPriority(statusMetaKeys, [
      'Type',
      'Potency',
      'Count',
      'Max Value',
      'Max Stack',
      'Max Stacks',
      'Value',
      'Stack',
      'Stacks',
      'Effect',
      'Turn Start',
      'Turn End',
      'Trigger',
      'Expiry',
      'Duration',
    ]);

    const cardMetaOrder = sortKeysByPriority(cardMetaKeys, [
      'Cost',
      'Power',
      'Type',
      'Target',
      'Speed',
    ]);

    const statusHeader = [
      'Character',
      'Name',
      'Version',
      'Status',
      ...statusMetaOrder,
    ];

    const statusData = statusRows.map((entry) => [
      entry.displayName,
      entry.name,
      entry.version,
      entry.title,
      ...statusMetaOrder.map((key) => entry.meta[key] || ''),
    ]);

    const cardHeader = [
      'Character',
      'Name',
      'Version',
      'Card',
      'Card Name',
      ...cardMetaOrder,
      'Effect',
    ];

    const cardData = cardRows.map((entry) => [
      entry.displayName,
      entry.name,
      entry.version,
      entry.label,
      entry.cardName,
      ...cardMetaOrder.map((key) => entry.meta[key] || ''),
      entry.effect,
    ]);

    const sheets = [
      {
        name: 'Characters',
        rows: [characterHeader, ...characterData],
      },
      {
        name: 'Innates',
        rows: [['Character', 'Name', 'Version', 'Innate', 'Text'], ...innateRows],
      },
      {
        name: 'Status Effects',
        rows: [statusHeader, ...statusData],
      },
      {
        name: 'Cards',
        rows: [cardHeader, ...cardData],
      },
    ];

    return { sheets };
  };

  const buildCharactersXlsx = async (characterPages) => {
    if (!characterPages.length) return null;
    const { sheets } = buildCharacterWorkbookData(characterPages);
    if (!sheets.length) return null;
    const usedSheetNames = new Set();
    const sheetInfos = sheets.map((sheet) => ({
      name: sanitizeSheetName(sheet.name, usedSheetNames),
      rows: sheet.rows,
    }));
    const sharedStrings = [];
    const sharedIndex = new Map();
    let sharedCount = 0;

    const getSharedStringIndex = (value) => {
      sharedCount += 1;
      const key = value ?? '';
      if (sharedIndex.has(key)) return sharedIndex.get(key);
      const index = sharedStrings.length;
      sharedStrings.push(key);
      sharedIndex.set(key, index);
      return index;
    };

    const sheetFiles = sheetInfos.map((sheet, index) => ({
      name: `xl/worksheets/sheet${index + 1}.xml`,
      content: buildWorksheetXml(sheet.rows, getSharedStringIndex),
    }));

    const files = [
      {
        name: '[Content_Types].xml',
        content: buildContentTypesXml(sheetInfos.length),
      },
      {
        name: '_rels/.rels',
        content: `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`,
      },
      {
        name: 'xl/workbook.xml',
        content: buildWorkbookXml(sheetInfos),
      },
      {
        name: 'xl/_rels/workbook.xml.rels',
        content: buildWorkbookRelsXml(sheetInfos.length),
      },
      {
        name: 'xl/sharedStrings.xml',
        content: buildSharedStringsXml(sharedStrings, sharedCount),
      },
      {
        name: 'xl/styles.xml',
        content: buildStylesXml(),
      },
      ...sheetFiles,
    ];

    const workbookBlob = buildZip(files);
    const workbookBuffer = await workbookBlob.arrayBuffer();
    return new Uint8Array(workbookBuffer);
  };

  const exportPageText = () => {
    const root = cloneContentRoot();
    if (!root) return;
    const text = getTextFromRoot(root);
    const title = sanitizeFilename(getExportTitle(root, document));
    downloadFile(`${text}\n`, `${title}.txt`, 'text/plain');
  };

  const exportPageMarkdown = () => {
    const root = cloneContentRoot();
    if (!root) return;
    const markdown = toMarkdown(root);
    const title = sanitizeFilename(getExportTitle(root, document));
    downloadFile(markdown || '', `${title}.md`, 'text/markdown');
  };

  const exportPagePdf = () => {
    const root = cloneContentRoot(document, { stripLinks: true });
    if (!root) return;
    const title = getExportTitle(root, document);
    const printWindow = openPrintWindow(title);
    if (!printWindow) return;
    renderPrintWindow(printWindow, [{ title, root }], title);
    printWindow.focus();
    printWindow.print();
  };

  const exportSiteArchive = async (options = {}) => {
    const formats = normalizeExportFormats(options);
    const formatSet = new Set(formats);
    const characterMode = normalizeCharacterMode(options);
    const pages = await collectSitePages({ stripLinks: true });
    if (!pages.length) return;

    const { characterPages, otherPages } = splitPagesByCharacter(pages);
    const excludedCharacterPages = characterPages.filter(isTemplateCharacterPage);
    const combinedCharacterPages = characterPages.filter(
      (page) => !isTemplateCharacterPage(page)
    );
    const usedNames = new Set();
    const files = [];

    const addPageFiles = (page, index) => {
      const baseName = buildPageBaseName(page, index, usedNames);

      if (formatSet.has('txt')) {
        const text = ensureTextTitle(page, getTextFromRoot(page.root));
        if (text) files.push({ name: `txt/${baseName}.txt`, content: `${text}\n` });
      }

      if (formatSet.has('md')) {
        const markdown = toMarkdown(page.root).trim();
        const mdContent = ensureMarkdownTitle(page, markdown);
        if (mdContent) files.push({ name: `md/${baseName}.md`, content: `${mdContent}\n` });
      }

      if (formatSet.has('html')) {
        const title = page.title || baseName;
        const html = buildPrintHtml([{ title: page.title, root: page.root }], title);
        files.push({ name: `html/${baseName}.html`, content: html });
      }
    };

    const pagesToExport =
      characterMode === 'combined' || characterMode === 'xlsx'
        ? [...otherPages, ...excludedCharacterPages]
        : pages;
    pagesToExport.forEach((page, index) => addPageFiles(page, index));

    if (characterMode === 'combined' && combinedCharacterPages.length) {
      const combinedTitle = 'All Characters';
      const combinedBaseName = buildPageBaseName(
        { title: combinedTitle },
        usedNames.size,
        usedNames
      );

      if (formatSet.has('txt')) {
        const text = buildCombinedText(combinedCharacterPages);
        if (text) files.push({ name: `txt/${combinedBaseName}.txt`, content: `${text}\n` });
      }

      if (formatSet.has('md')) {
        const markdown = buildCombinedMarkdown(combinedCharacterPages);
        if (markdown) {
          files.push({ name: `md/${combinedBaseName}.md`, content: `${markdown}\n` });
        }
      }

      if (formatSet.has('html')) {
        const html = buildPrintHtml(combinedCharacterPages, combinedTitle);
        files.push({ name: `html/${combinedBaseName}.html`, content: html });
      }
    }

    if (characterMode === 'xlsx' && combinedCharacterPages.length) {
      const workbookTitle = 'All Characters';
      const workbookBaseName = buildPageBaseName(
        { title: workbookTitle },
        usedNames.size,
        usedNames
      );
      const workbookData = await buildCharactersXlsx(combinedCharacterPages);
      if (workbookData) {
        files.push({
          name: `xlsx/${workbookBaseName}.xlsx`,
          content: workbookData,
        });
      }
    }

    if (!files.length) return;
    const archiveName = sanitizeFilename(`${getSiteTitle()}-all-pages`);
    const zipBlob = buildZip(files);
    downloadBlob(zipBlob, `${archiveName}.zip`);
  };

  const setMenuState = (menu, isOpen) => {
    menu.classList.toggle('is-open', isOpen);
    const toggle = menu.querySelector('[data-ua-export-toggle]');
    const dropdown = menu.querySelector('.ua-export-dropdown');
    if (toggle) toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (dropdown) dropdown.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  };

  const closeMenus = () => {
    document.querySelectorAll('[data-ua-export-menu].is-open').forEach((menu) => {
      setMenuState(menu, false);
    });
  };

  const bindMenus = () => {
    const menus = Array.from(document.querySelectorAll('[data-ua-export-menu]'));
    if (!menus.length) return;

    menus.forEach((menu) => {
      if (menu.dataset.uaMenuBound) return;
      menu.dataset.uaMenuBound = 'true';

      const toggle = menu.querySelector('[data-ua-export-toggle]');
      const dropdown = menu.querySelector('.ua-export-dropdown');
      if (!toggle || !dropdown) return;

      toggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = menu.classList.contains('is-open');
        closeMenus();
        setMenuState(menu, !isOpen);
      });

      dropdown.addEventListener('click', (event) => {
        const item = event.target.closest('.ua-export-item[data-action]');
        if (!item) return;
        closeMenus();
      });
    });

    if (!document.body.dataset.uaExportMenuBound) {
      document.body.dataset.uaExportMenuBound = 'true';
      document.addEventListener('click', (event) => {
        if (!event.target.closest('[data-ua-export-menu]')) closeMenus();
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenus();
      });
    }
  };

  const setButtonBusy = (button, busy) => {
    if (!button) return;
    button.disabled = busy;
    button.setAttribute('aria-busy', busy ? 'true' : 'false');
  };

  const setExportPanelState = (panel, isOpen) => {
    panel.hidden = !isOpen;
    document.body.classList.toggle('ua-export-panel-open', isOpen);
  };

  const openExportPanel = () => {
    const panel = document.querySelector('[data-ua-export-panel]');
    if (!panel) return;
    setExportPanelState(panel, true);
    const focusTarget = panel.querySelector('input, button, select, textarea');
    if (focusTarget) focusTarget.focus();
  };

  const closeExportPanel = () => {
    const panel = document.querySelector('[data-ua-export-panel]');
    if (!panel || panel.hidden) return;
    setExportPanelState(panel, false);
  };

  const getCheckedValue = (form, name, fallback) =>
    form.querySelector(`input[name="${name}"]:checked`)?.value ?? fallback;

  const bindExportPanel = () => {
    const panel = document.querySelector('[data-ua-export-panel]');
    if (!panel || panel.dataset.uaBound) return;
    panel.dataset.uaBound = 'true';

    panel.addEventListener('click', (event) => {
      if (event.target.closest('[data-ua-export-close]')) {
        closeExportPanel();
      }
    });

    const form = panel.querySelector('[data-ua-export-form]');
    if (form && !form.dataset.uaBound) {
      form.dataset.uaBound = 'true';
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const submitButton = form.querySelector('[data-ua-export-submit]');
        const format = getCheckedValue(form, 'ua-export-format', 'all');
        const characterMode = getCheckedValue(form, 'ua-export-characters', 'split');
        setButtonBusy(submitButton, true);

        try {
          let normalizedCharacterMode = 'split';
          if (characterMode === 'combined') normalizedCharacterMode = 'combined';
          if (characterMode === 'xlsx') normalizedCharacterMode = 'xlsx';
          await exportSiteArchive({
            format,
            characterMode: normalizedCharacterMode,
          });
          closeExportPanel();
        } finally {
          setButtonBusy(submitButton, false);
        }
      });
    }

    if (!document.body.dataset.uaExportPanelBound) {
      document.body.dataset.uaExportPanelBound = 'true';
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeExportPanel();
      });
    }
  };

  const bindExportActions = () => {
    const buttons = Array.from(document.querySelectorAll('.ua-export-item[data-action]'));
    if (!buttons.length) return;

    buttons.forEach((button) => {
      if (button.dataset.uaBound) return;
      button.dataset.uaBound = 'true';

      button.addEventListener('click', async (event) => {
        event.preventDefault();
        if (button.disabled) return;

        const action = button.dataset.action;
        if (action === 'zip-options') {
          openExportPanel();
          return;
        }

        setButtonBusy(button, true);

        try {
          if (action === 'zip') {
            await exportSiteArchive();
            return;
          }

          if (action === 'print') {
            exportPagePdf();
            return;
          }

          if (action === 'md') {
            exportPageMarkdown();
            return;
          }

          if (action === 'txt') {
            exportPageText();
          }
        } finally {
          setButtonBusy(button, false);
        }
      });
    });
  };

  const init = () => {
    bindMenus();
    bindExportPanel();
    bindExportActions();
  };

  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(init);
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
