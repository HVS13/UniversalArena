import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const getArg = (name) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? null : process.argv[index + 1] || null;
};

const webRootArg = getArg("--web-root");
const expectedRepository = getArg("--source-repository");
const expectedCommit = getArg("--source-commit");
const expectedSchemaVersion = Number(getArg("--schema-version"));
const expectedRosterCount = Number(getArg("--roster-count"));

if (
  !webRootArg ||
  !expectedRepository ||
  !expectedCommit ||
  !Number.isInteger(expectedSchemaVersion) ||
  !Number.isInteger(expectedRosterCount)
) {
  console.error(
    "Usage: node validate-web-sync.mjs --web-root <path> --source-repository <owner/repo> --source-commit <sha> --schema-version <number> --roster-count <number>",
  );
  process.exit(1);
}

const webRoot = path.resolve(process.cwd(), webRootArg);
const dataDir = path.join(webRoot, "packages", "data", "src");
const manifestPath = path.join(dataDir, "manifest.json");
const expectedJsonFiles = [
  "card-types.json",
  "characters.json",
  "keywords.json",
  "roles.json",
  "status-effects.json",
  "terms.json",
];
const allowedGeneratedFiles = new Set([
  ...expectedJsonFiles.map((filename) => `packages/data/src/${filename}`),
  "packages/data/src/manifest.json",
]);
const allowedAssetPrefix = "apps/client/public/assets/characters/";
const errors = [];

const runGit = (args) =>
  execFileSync("git", ["-C", webRoot, ...args], {
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });

const normalizeGitPath = (value) => value.replaceAll("\\", "/");
const isAllowedPath = (filename) =>
  allowedGeneratedFiles.has(filename) || filename.startsWith(allowedAssetPrefix);

const jsonFiles = (await fs.readdir(dataDir))
  .filter((filename) => filename.endsWith(".json") && filename !== "manifest.json")
  .sort((left, right) => left.localeCompare(right));

if (JSON.stringify(jsonFiles) !== JSON.stringify(expectedJsonFiles)) {
  errors.push(
    `Generated JSON set mismatch: expected ${expectedJsonFiles.join(", ")}; received ${jsonFiles.join(", ")}.`,
  );
}

const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
const characters = JSON.parse(await fs.readFile(path.join(dataDir, "characters.json"), "utf8"));
const hash = createHash("sha256");

for (const filename of jsonFiles) {
  hash.update(filename);
  hash.update("\0");
  hash.update(await fs.readFile(path.join(dataDir, filename)));
  hash.update("\0");
}

const calculatedHash = `sha256:${hash.digest("hex")}`;
const actualRosterCount = characters.characters?.length;

if (!/^[0-9a-f]{40}$/.test(expectedCommit)) {
  errors.push(`Expected source commit is not a full lowercase Git SHA: ${expectedCommit}.`);
}
if (manifest.sourceRepository !== expectedRepository) {
  errors.push(
    `sourceRepository mismatch: expected ${expectedRepository}, received ${manifest.sourceRepository}.`,
  );
}
if (manifest.sourceCommit !== expectedCommit) {
  errors.push(`sourceCommit mismatch: expected ${expectedCommit}, received ${manifest.sourceCommit}.`);
}
if (manifest.schemaVersion !== expectedSchemaVersion) {
  errors.push(
    `schemaVersion mismatch: expected ${expectedSchemaVersion}, received ${manifest.schemaVersion}.`,
  );
}
if (manifest.contentHash !== calculatedHash) {
  errors.push(`contentHash mismatch: expected ${calculatedHash}, received ${manifest.contentHash}.`);
}
if (manifest.rosterCount !== expectedRosterCount || actualRosterCount !== expectedRosterCount) {
  errors.push(
    `rosterCount mismatch: expected ${expectedRosterCount}, manifest has ${manifest.rosterCount}, characters.json has ${actualRosterCount}.`,
  );
}
if (Number.isNaN(Date.parse(manifest.generatedAt))) {
  errors.push(`generatedAt is not a valid timestamp: ${manifest.generatedAt}.`);
}

const statusEntries = runGit(["status", "--porcelain=v1", "-z", "--untracked-files=all"])
  .split("\0")
  .filter(Boolean);

for (let index = 0; index < statusEntries.length; index += 1) {
  const entry = statusEntries[index];
  const status = entry.slice(0, 2);
  const filename = normalizeGitPath(entry.slice(3));
  if (status.includes("R") || status.includes("C")) {
    const source = normalizeGitPath(statusEntries[index + 1] || "");
    errors.push(`Generated sync must not rename or copy files: ${source} -> ${filename}.`);
    index += 1;
    continue;
  }
  if (!isAllowedPath(filename)) {
    errors.push(`Handwritten or unexpected Web path changed: ${filename}.`);
  }
}

if (errors.length) {
  errors.forEach((error) => console.error(`Error: ${error}`));
  process.exit(1);
}

console.log(
  `Validated Web sync for ${expectedRepository}@${expectedCommit}: schema ${expectedSchemaVersion}, ${expectedRosterCount} characters, ${calculatedHash}.`,
);
if (statusEntries.length) {
  console.log("Validated generated-only changes:");
  statusEntries.forEach((entry) => console.log(`- ${normalizeGitPath(entry.slice(3))}`));
} else {
  console.log("Canonical export already matches the Web checkout.");
}
