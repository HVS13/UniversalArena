---
name: ua-game-client
description: Modify the UniversalArena web game client in C:\Git\UniversalArena-Web; use when changing gameplay flow, interactions, or UI in apps/client or rules logic in packages/core.
---

# UA Game Client

## Overview

The game client no longer lives in this docs repo. All client/engine changes happen in `C:\Git\UniversalArena-Web`.

## Workflow

1. Update UI code in `C:\Git\UniversalArena-Web\apps\client\src\`.
2. Update rules logic in `C:\Git\UniversalArena-Web\packages\core\src\`.
3. If rules, keywords, status effects, or terms change, update the matching docs reference pages and `docs/data` in `C:\Git\UniversalArena`, then re-export.
4. Keep data synced by exporting from `C:\Git\UniversalArena\docs\data` into `packages/data`.
5. Do not edit `site/` output in this docs repo.

## Notes

- The docs site is static; the web game runs in the separate repo.
- Prefer small, testable changes over large refactors.
- Current engine coverage includes timing windows and status caps/expiry/trigger hooks (cost/speed/power/damage modifiers). Legacy text parsing still handles unmodeled mechanics like spend, draw, card creation, and ammo.
- Keyword data includes an optional `tier` (Core/Advanced); status entries include Mode and explicit Turn End lines in docs.

## References

- `C:\Git\UniversalArena-Web\apps\client\src\`
- `C:\Git\UniversalArena-Web\packages\core\src\`
