import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const getArg = (name) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? null : process.argv[index + 1] || null;
};

const run = (command, args, cwd) =>
  execFileSync(command, args, {
    cwd,
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();

export const syncBranchForCommit = (sourceCommit) =>
  `automation/canonical-sync-${sourceCommit}`;

export const publishWebSync = async (options, operations) => {
  const syncBranch = syncBranchForCommit(options.sourceCommit);
  const pullRequests = await operations.listOpenPullRequests(syncBranch);

  if (pullRequests.length > 1) {
    throw new Error(`Multiple open pull requests use sync branch ${syncBranch}.`);
  }

  const existingPullRequest = pullRequests[0] ?? null;
  if (existingPullRequest && existingPullRequest.isDraft !== true) {
    throw new Error(
      `Existing sync PR ${existingPullRequest.url} is ready for review; refusing to push or mutate it.`,
    );
  }

  await operations.pushBranch(syncBranch);

  if (existingPullRequest) {
    return {
      branch: syncBranch,
      pullRequestUrl: existingPullRequest.url,
      updatedDraft: true,
    };
  }

  const pullRequestUrl = await operations.createDraftPullRequest(syncBranch);
  return { branch: syncBranch, pullRequestUrl, updatedDraft: false };
};

export const executePublishWebSync = async (options, operations, output = console) => {
  try {
    const result = await publishWebSync(options, operations);
    output.log(
      `${result.updatedDraft ? "Updated draft" : "Created draft"} Web PR ${result.pullRequestUrl} from ${result.branch}.`,
    );
    return 0;
  } catch (error) {
    output.error(error instanceof Error ? error.message : error);
    return 1;
  }
};

const createOperations = (options) => ({
  listOpenPullRequests: async (syncBranch) => {
    const output = run(
      "gh",
      [
        "pr",
        "list",
        "--repo",
        options.repository,
        "--state",
        "open",
        "--head",
        syncBranch,
        "--json",
        "url,isDraft,headRefOid",
      ],
      options.webRoot,
    );
    const pullRequests = JSON.parse(output || "[]");
    if (!Array.isArray(pullRequests)) {
      throw new Error("GitHub returned an invalid pull-request list.");
    }
    return pullRequests;
  },

  pushBranch: async (syncBranch) => {
    const remoteOutput = run(
      "git",
      ["ls-remote", "--heads", "origin", `refs/heads/${syncBranch}`],
      options.webRoot,
    );
    const remoteSha = remoteOutput ? remoteOutput.split(/\s+/)[0] : "";
    if (remoteSha) {
      run(
        "git",
        ["fetch", "origin", `${syncBranch}:refs/remotes/origin/${syncBranch}`],
        options.webRoot,
      );
    }

    run("git", ["switch", "-c", syncBranch], options.webRoot);
    run("git", ["config", "user.name", "ua-sync-bot"], options.webRoot);
    run(
      "git",
      ["config", "user.email", "ua-sync-bot@users.noreply.github.com"],
      options.webRoot,
    );
    run(
      "git",
      ["commit", "-m", `chore: sync canonical data ${options.sourceCommit.slice(0, 12)}`],
      options.webRoot,
    );

    const pushArgs = ["push"];
    if (remoteSha) {
      pushArgs.push(`--force-with-lease=refs/heads/${syncBranch}:${remoteSha}`);
    }
    pushArgs.push("origin", `HEAD:refs/heads/${syncBranch}`);
    run("git", pushArgs, options.webRoot);
  },

  createDraftPullRequest: async (syncBranch) => {
    const bodyPath = path.join(
      process.env.RUNNER_TEMP || os.tmpdir(),
      `web-sync-pr-${options.sourceCommit}.md`,
    );
    const body = `## What changed

Synchronizes generated Universal Arena data and character assets from canonical commit [${options.sourceCommit}](https://github.com/${options.sourceRepository}/commit/${options.sourceCommit}).

## Safety checks

- Canonical validation passed before export.
- Manifest schema, source repository, exact source commit, content hash, and nine-character roster were verified.
- Only generated data and character asset paths are allowed.
- \`git diff --check\` passed.
- The exact generated artifact is attached to [the canonical workflow run](${options.runUrl}).
- Friend Alpha Checks must pass on this Web PR.

## Review requirement

This PR is intentionally a draft. It requires independent review and must never be merged automatically.
`;
    await fs.writeFile(bodyPath, body, "utf8");
    return run(
      "gh",
      [
        "pr",
        "create",
        "--repo",
        options.repository,
        "--base",
        options.baseBranch,
        "--head",
        syncBranch,
        "--title",
        `Sync canonical data ${options.sourceCommit.slice(0, 12)}`,
        "--body-file",
        bodyPath,
        "--draft",
      ],
      options.webRoot,
    );
  },
});

const isMainModule =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMainModule) {
  const webRootArg = getArg("--web-root");
  const options = {
    webRoot: webRootArg ? path.resolve(webRootArg) : null,
    repository: getArg("--repository"),
    baseBranch: getArg("--base-branch"),
    sourceRepository: getArg("--source-repository"),
    sourceCommit: getArg("--source-commit"),
    runUrl: getArg("--run-url"),
  };
  if (
    !options.webRoot ||
    !options.repository ||
    !options.baseBranch ||
    !options.sourceRepository ||
    !/^[0-9a-f]{40}$/.test(options.sourceCommit || "") ||
    !options.runUrl ||
    !process.env.GH_TOKEN
  ) {
    console.error(
      "Missing or invalid arguments. A full source SHA and GH_TOKEN are required.",
    );
    process.exit(1);
  }

  process.exitCode = await executePublishWebSync(
    options,
    createOperations(options),
  );
}
