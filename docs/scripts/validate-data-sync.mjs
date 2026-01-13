import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "yaml";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(scriptDir, "..");
const charactersDir = path.join(docsRoot, "characters");
const dataDir = path.join(docsRoot, "data", "characters");

const skipFiles = new Set(["index.md", "template.md", "character-creation-guide.md"]);
const sectionBlacklist = new Set([
  "Cards",
  "Created Cards",
  "Innates",
  "Keywords",
  "Status Effects",
  "Terminology",
]);

const headingRegex = /^(#{2,3})\s+(.+)$/;
const cardRegex = /^Card\s+([^:]+):\s*(.+)$/i;
const ultimateRegex = /^Ultimate:\s*(.+)$/i;
const ultimateSlotRegex = /^Ultimate-(\d+):\s*(.+)$/i;
const metaRegex = /<strong>(Cost|Power|Type|Target|Speed):<\/strong>\s*([^<]+)</i;
const paragraphRegex = /<p[^>]*>(.*?)<\/p>/i;

const decodeEntities = (text) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const stripHtml = (text) => {
  const withoutTags = text.replace(/<[^>]+>/g, " ");
  return decodeEntities(withoutTags)
    .replace(/\s+/g, " ")
    .replace(/\s+([.,:;!?])/g, "$1")
    .trim();
};

const normalizeList = (values) => {
  if (!values) return [];
  return values.map((value) => stripHtml(String(value)));
};

const arraysEqual = (left, right) => {
  if (left.length !== right.length) return false;
  return left.every((value, index) => value === right[index]);
};

const parseMarkdownCards = (content) => {
  const cards = [];
  let current = null;
  let inEffect = false;

  content.split(/\r?\n/).forEach((line) => {
    const headingMatch = headingRegex.exec(line);
    if (headingMatch) {
      const level = headingMatch[1];
      const title = headingMatch[2].trim();
      inEffect = false;

      if (sectionBlacklist.has(title)) {
        current = null;
        return;
      }

      let slot = null;
      let name = null;
      const cardMatch = cardRegex.exec(title);
      if (cardMatch) {
        slot = cardMatch[1].trim();
        name = cardMatch[2].trim();
      } else {
        const ultimateSlotMatch = ultimateSlotRegex.exec(title);
        if (ultimateSlotMatch) {
          slot = `ultimate-${ultimateSlotMatch[1]}`;
          name = ultimateSlotMatch[2].trim();
        } else {
          const ultimateMatch = ultimateRegex.exec(title);
          if (ultimateMatch) {
            slot = "ultimate";
            name = ultimateMatch[1].trim();
          } else if (level === "###" || level === "##") {
            name = title;
          }
        }
      }

      if (name) {
        current = {
          slot,
          name,
          cost: null,
          power: null,
          types: null,
          target: null,
          speed: null,
          effect: [],
        };
        cards.push(current);
      } else {
        current = null;
      }
      return;
    }

    if (!current) return;

    const metaMatch = metaRegex.exec(line);
    if (metaMatch) {
      const key = metaMatch[1].toLowerCase();
      const value = metaMatch[2].trim();
      if (key === "type") {
        current.types = value.split(",").map((part) => part.trim());
      } else {
        current[key] = value;
      }
      return;
    }

    if (line.includes("card-block__heading") && line.includes("Effect")) {
      inEffect = true;
      return;
    }

    if (inEffect) {
      if (line.includes("</div>")) {
        inEffect = false;
        return;
      }
      const paragraphMatch = paragraphRegex.exec(line);
      if (paragraphMatch) {
        const text = stripHtml(paragraphMatch[1]);
        if (text) current.effect.push(text);
      }
    }
  });

  return cards;
};

const loadYamlCards = async (filePath) => {
  const raw = await fs.readFile(filePath, "utf8");
  const data = yaml.parse(raw);
  const cards = [];
  ["cards", "createdCards"].forEach((key) => {
    if (Array.isArray(data?.[key])) {
      data[key].forEach((card) => cards.push({ source: key, ...card }));
    }
  });
  return cards;
};

const indexCards = (cards) => {
  const bySlot = new Map();
  const byName = new Map();
  cards.forEach((card) => {
    if (card.slot) {
      if (!bySlot.has(card.slot)) bySlot.set(card.slot, []);
      bySlot.get(card.slot).push(card);
    }
    if (card.name) {
      if (!byName.has(card.name)) byName.set(card.name, []);
      byName.get(card.name).push(card);
    }
  });
  return { bySlot, byName };
};

const isAssistAttackRestrictionMissing = (effectLines, restrictions) => {
  const assistOnly = effectLines.some((line) =>
    /can only be played as assist attack/i.test(line)
  );
  if (!assistOnly) return false;
  if (!Array.isArray(restrictions)) return true;
  return !restrictions.some(
    (restriction) =>
      restriction?.kind === "require_window" && restriction?.window === "assist_attack"
  );
};

const hasMandatorySpendWithoutStructured = (effectLines, effects) => {
  const spendLines = effectLines.filter((line) => /\bSpend\b/i.test(line));
  if (!spendLines.length) return false;
  const mandatory = spendLines.filter((line) => !line.includes("?"));
  if (!mandatory.length) return false;
  if (!Array.isArray(effects)) return true;
  return !effects.some((effect) => effect?.type === "spend_status");
};

const formatIssue = (issue) =>
  `${issue.file} :: ${issue.card ?? "(card)"}${issue.slot ? ` (${issue.slot})` : ""} -> ${issue.field}`;

const run = async () => {
  const files = await fs.readdir(charactersDir);
  const mdFiles = files.filter((file) => file.endsWith(".md") && !skipFiles.has(file));

  const mismatches = [];
  const missingCards = [];
  const extraCards = [];
  const restrictionWarnings = [];
  const spendWarnings = [];

  for (const mdFile of mdFiles) {
    const mdPath = path.join(charactersDir, mdFile);
    const yamlPath = path.join(dataDir, `${path.basename(mdFile, ".md")}.yml`);
    try {
      await fs.access(yamlPath);
    } catch {
      missingCards.push({ file: mdFile, field: "yaml file missing" });
      continue;
    }

    const mdContent = await fs.readFile(mdPath, "utf8");
    const mdCards = parseMarkdownCards(mdContent);
    const yamlCards = await loadYamlCards(yamlPath);
    const { bySlot, byName } = indexCards(yamlCards);
    const usedYaml = new Set();

    const matchCard = (mdCard) => {
      const slotMatches = mdCard.slot ? bySlot.get(mdCard.slot) : null;
      const nameMatches = mdCard.name ? byName.get(mdCard.name) : null;
      const candidates = slotMatches?.length ? slotMatches : nameMatches ?? [];
      for (const card of candidates) {
        if (usedYaml.has(card)) continue;
        usedYaml.add(card);
        return card;
      }
      return null;
    };

    mdCards.forEach((mdCard) => {
      const yamlCard = matchCard(mdCard);
      if (!yamlCard) {
        missingCards.push({
          file: mdFile,
          card: mdCard.name,
          slot: mdCard.slot,
          field: "missing yaml card",
        });
        return;
      }

      ["cost", "power", "target", "speed"].forEach((field) => {
        if (mdCard[field] && yamlCard[field] && mdCard[field] !== yamlCard[field]) {
          mismatches.push({
            file: mdFile,
            card: mdCard.name,
            slot: mdCard.slot,
            field,
            md: mdCard[field],
            yaml: yamlCard[field],
          });
        }
      });

      if (mdCard.types && yamlCard.types && !arraysEqual(mdCard.types, yamlCard.types)) {
        mismatches.push({
          file: mdFile,
          card: mdCard.name,
          slot: mdCard.slot,
          field: "types",
          md: mdCard.types,
          yaml: yamlCard.types,
        });
      }

      const mdEffect = normalizeList(mdCard.effect);
      const yamlEffect = normalizeList(yamlCard.effect);
      if ((mdEffect.length || yamlEffect.length) && !arraysEqual(mdEffect, yamlEffect)) {
        mismatches.push({
          file: mdFile,
          card: mdCard.name,
          slot: mdCard.slot,
          field: "effect",
          md: mdEffect,
          yaml: yamlEffect,
        });
      }

      if (mdEffect.length) {
        const restrictionText = mdEffect.some(
          (line) =>
            /\bcan only be played\b/i.test(line) || /\bcannot be played\b/i.test(line)
        );
        if (restrictionText && !Array.isArray(yamlCard.restrictions)) {
          restrictionWarnings.push({
            file: mdFile,
            card: mdCard.name,
            slot: mdCard.slot,
            field: "restriction missing",
          });
        }
        if (isAssistAttackRestrictionMissing(mdEffect, yamlCard.restrictions)) {
          restrictionWarnings.push({
            file: mdFile,
            card: mdCard.name,
            slot: mdCard.slot,
            field: "assist attack restriction missing",
          });
        }
        if (hasMandatorySpendWithoutStructured(mdEffect, yamlCard.effects)) {
          spendWarnings.push({
            file: mdFile,
            card: mdCard.name,
            slot: mdCard.slot,
            field: "mandatory spend without spend_status",
          });
        }
      }
    });

    yamlCards.forEach((card) => {
      if (!usedYaml.has(card)) {
        extraCards.push({
          file: mdFile,
          card: card.name,
          slot: card.slot,
          field: `extra yaml card (${card.source})`,
        });
      }
    });
  }

  if (!mismatches.length && !missingCards.length && !extraCards.length) {
    console.log("No markdown/YAML mismatches detected.");
  } else {
    if (mismatches.length) {
      console.log("Mismatches:");
      mismatches.forEach((issue) => {
        console.log(`- ${formatIssue(issue)}`);
      });
    }
    if (missingCards.length) {
      console.log("Missing cards:");
      missingCards.forEach((issue) => console.log(`- ${formatIssue(issue)}`));
    }
    if (extraCards.length) {
      console.log("Extra cards:");
      extraCards.forEach((issue) => console.log(`- ${formatIssue(issue)}`));
    }
  }

  if (restrictionWarnings.length || spendWarnings.length) {
    console.log("Warnings:");
    restrictionWarnings.forEach((issue) => console.log(`- ${formatIssue(issue)}`));
    spendWarnings.forEach((issue) => console.log(`- ${formatIssue(issue)}`));
  }

  const hasErrors = mismatches.length || missingCards.length || extraCards.length;
  process.exit(hasErrors ? 1 : 0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
