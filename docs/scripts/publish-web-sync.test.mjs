import assert from "node:assert/strict";
import test from "node:test";

import {
  executePublishWebSync,
  publishWebSync,
  syncBranchForCommit,
} from "./publish-web-sync.mjs";

const sourceCommit = "def16b684d509001f2c165be08bdac1c91d75e30";
const options = { sourceCommit };

test("ready PR exits non-zero before branch push or PR mutation", async () => {
  const calls = [];
  const errors = [];
  const readyPullRequest = {
    url: "https://github.com/HVS13/UniversalArena-Web/pull/99",
    isDraft: false,
  };

  const exitCode = await executePublishWebSync(
    options,
    {
      listOpenPullRequests: async (branch) => {
        calls.push(["query", branch]);
        return [readyPullRequest];
      },
      pushBranch: async (branch) => calls.push(["push", branch]),
      createDraftPullRequest: async (branch) => {
        calls.push(["create-pr", branch]);
        return "unexpected";
      },
    },
    {
      log: () => assert.fail("Ready-PR guard must not report a successful publish."),
      error: (message) => errors.push(String(message)),
    },
  );

  assert.equal(exitCode, 1);
  assert.deepEqual(calls, [["query", syncBranchForCommit(sourceCommit)]]);
  assert.deepEqual(errors, [
    "Existing sync PR https://github.com/HVS13/UniversalArena-Web/pull/99 is ready for review; refusing to push or mutate it.",
  ]);
});

test("draft PR is preflighted before its branch is updated", async () => {
  const calls = [];
  const draftPullRequest = {
    url: "https://github.com/HVS13/UniversalArena-Web/pull/99",
    isDraft: true,
  };

  const result = await publishWebSync(options, {
    listOpenPullRequests: async (branch) => {
      calls.push(["query", branch]);
      return [draftPullRequest];
    },
    pushBranch: async (branch) => calls.push(["push", branch]),
    createDraftPullRequest: async (branch) => {
      calls.push(["create-pr", branch]);
      return "unexpected";
    },
  });

  assert.deepEqual(calls, [
    ["query", syncBranchForCommit(sourceCommit)],
    ["push", syncBranchForCommit(sourceCommit)],
  ]);
  assert.equal(result.updatedDraft, true);
  assert.equal(result.pullRequestUrl, draftPullRequest.url);
});

test("missing PR is created as draft only after branch push", async () => {
  const calls = [];
  const newPullRequestUrl = "https://github.com/HVS13/UniversalArena-Web/pull/100";

  const result = await publishWebSync(options, {
    listOpenPullRequests: async (branch) => {
      calls.push(["query", branch]);
      return [];
    },
    pushBranch: async (branch) => calls.push(["push", branch]),
    createDraftPullRequest: async (branch) => {
      calls.push(["create-pr", branch]);
      return newPullRequestUrl;
    },
  });

  assert.deepEqual(calls, [
    ["query", syncBranchForCommit(sourceCommit)],
    ["push", syncBranchForCommit(sourceCommit)],
    ["create-pr", syncBranchForCommit(sourceCommit)],
  ]);
  assert.equal(result.updatedDraft, false);
  assert.equal(result.pullRequestUrl, newPullRequestUrl);
});
