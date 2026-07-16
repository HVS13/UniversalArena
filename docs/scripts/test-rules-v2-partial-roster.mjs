import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync, spawnSync } from "node:child_process";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..", "..");
const dataRoot = path.join(repoRoot, "docs", "data");
const activeDir = path.join(dataRoot, "characters");
const parallelDir = path.join(dataRoot, "rules-v2", "characters");
const exporterPath = path.join(scriptDir, "export-game-data-v2-package.mjs");

const yamlFiles = async (directory) =>
  (await fs.readdir(directory)).filter((filename) => /\.ya?ml$/i.test(filename)).sort();

const main = async () => {
  const [activeFiles, parallelFiles] = await Promise.all([yamlFiles(activeDir), yamlFiles(parallelDir)]);
  const missing = activeFiles
    .filter((filename) => !parallelFiles.includes(filename))
    .map((filename) => filename.replace(/\.ya?ml$/i, ""));
  assert.ok(missing.length > 0, "The staged Rules v2 directory must currently be a partial roster.");

  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "ua-rules-v2-partial-"));
  const previewOut = path.join(tempRoot, "preview");
  const blockedOut = path.join(tempRoot, "blocked");
  try {
    execFileSync(
      process.execPath,
      [
        exporterPath,
        "--characters-dir",
        parallelDir,
        "--out",
        previewOut,
        "--skip-assets",
        "--source-commit",
        "partial-roster-test",
        "--generated-at",
        "2026-07-16T00:00:00.000Z",
      ],
      { cwd: repoRoot, encoding: "utf8", stdio: "pipe" }
    );
    const manifest = JSON.parse(await fs.readFile(path.join(previewOut, "manifest.json"), "utf8"));
    assert.equal(manifest.partialRoster, true);
    assert.equal(manifest.publishable, false);
    assert.deepEqual(manifest.missingRosterCharacters, missing);

    const blocked = spawnSync(
      process.execPath,
      [
        exporterPath,
        "--characters-dir",
        parallelDir,
        "--out",
        blockedOut,
        "--skip-assets",
        "--source-commit",
        "partial-roster-test",
        "--generated-at",
        "2026-07-16T00:00:00.000Z",
        "--require-publishable",
      ],
      { cwd: repoRoot, encoding: "utf8" }
    );
    assert.notEqual(blocked.status, 0, "A partial roster must fail --require-publishable.");
    assert.match(`${blocked.stdout}\n${blocked.stderr}`, /partial roster is missing/i);
    await assert.rejects(fs.access(blockedOut), "Blocked publishable export must not create its output directory.");
  } finally {
    await fs.rm(tempRoot, { recursive: true, force: true });
  }

  console.log("Rules v2 partial roster tests: passed.");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
