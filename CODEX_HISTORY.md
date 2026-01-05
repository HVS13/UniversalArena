# Codex History

This file preserves the historical intent and decisions for CodexGPT. Append a new entry after each CodexGPT task so future changes keep the original reasons intact.

## Project Intent
- Maintain Universal Arena documentation as the source of truth.
- Provide a text-first, playable prototype with clean UI/UX.
- Support two-player multiplayer: username -> create/join lobby -> character select -> play.
- Keep the game easy to update as docs evolve.

## Separation Rules
- Game pages live in `docs/game/`.
- Game logic lives in `docs/javascripts/game/`.
- Game styles live in `docs/stylesheets/game.css`.
- Game assets live in `docs/assets/game/`.
- Multiplayer relay server lives in `server/` and is optional.
- Removing the game should only require deleting the above paths and removing the Play nav entry in `mkdocs.yml`.

## Multiplayer Architecture
- MkDocs site stays static.
- Real-time multiplayer uses a small WebSocket relay server (Node + `ws`).
- Relay stores lobbies in memory; no database.
- Client auto-selects `ws://localhost:8787` for local dev and `wss://<host>` for GitHub Pages.
- Host is authoritative for match state; relay only forwards messages.

## Current Implementation (as of 2025-12-23)
- Added `docs/game/index.md` with the lobby/character/match UI.
- Added `docs/stylesheets/game.css` for the game UI theme.
- Added `docs/javascripts/game/config.js` and `docs/javascripts/game/game.js`.
- Updated `mkdocs.yml` to include the Play page and game assets.
- Added relay server under `server/` with `index.js`, `package.json`, and `README.md`.
- Game auto-parses `docs/characters/index.md` and character pages for cards.

## Log
- 2025-12-23: Implemented isolated game page + multiplayer lobby prototype; added relay server; wired into MkDocs; game reads character data directly from docs to stay in sync.
- 2025-12-23: Parsed Power Range for card effects, applied power-based combat resolution, gated relay-only actions when offline, and aligned game background theming across light/dark modes.
- 2025-12-23: Hid the Play page from navigation and excluded the game docs page from the MkDocs build until the prototype is ready.
- 2025-12-23: Clarified Ultimate Meter as a shared team resource; codified step-shift speed modifiers with cancellation rules; updated play/FAQ wording to reflect current speed legality and shared meter.
- 2025-12-23: Polished rules and character wording across docs, clarified status timing language, aligned card type ordering, and refined damage mitigation keyword definitions.
- 2025-12-23: Reviewed docs for consistency; refined damage mitigation keywords to support flat/percentage formats and clarified absorb floor behavior.
- 2025-12-23: Standardized card taxonomy by introducing Technique and Created cards in terminology and card types, updated character type tags accordingly, and clarified multi-type damage matching for mitigation keywords to avoid stacking ambiguity.
- 2025-12-23: Added FAQ entries that explain card categories and multi-type mitigation interactions to improve new-player onboarding and reduce rules ambiguity at first read.
- 2025-12-23: Added a Quick Start section, expanded FAQ onboarding (combat flow, speed placement, created cards, mitigation example), and clarified core glossary terms and status triggers so new players can learn the rules without jumping between pages.
- 2025-12-24: Stacked character header images above details for consistent layout and added a subtle last-updated timestamp on the front page.
- 2025-12-24: Added AGENTS.md with repo rules and response style; created and validated skills for content authoring, character kit design, game client edits, and relay server maintenance; packaged the skills for distribution.
- 2025-12-24: Added root .gitignore for skill build artifacts and clarified that game pages are off-limits unless explicitly requested.
- 2025-12-24: Standardized card lifecycle terminology (played/used/cancelled/negated), added explicit timing order rules, and aligned glossary/keyword wording with the new use-based language.
- 2025-12-24: Ported FAQ-only rules into reference pages (status stacking, Potency/Count inflict logic, rule priority, rounding/halve), expanded Ultimate Meter/Created Card glossary entries, and updated last-updated timestamp plus AGENTS/skill guidance to enforce FAQ cross-checks.
- 2025-12-24: Added Focus/Strain/Fortified status effects, defined roles as non-mechanical tags, and assigned roles to the current character roster with updated front-page timestamp.
- 2025-12-24: Updated AGENTS rules and the content-authoring/character-kit skills to reflect roles as a first-class, non-mechanical tag in character workflows.
- 2025-12-24: Added a site-wide print button via MkDocs theme overrides, wired print JS, and styled a Material icon action for consistent UI.
- 2025-12-25: Added MD/TXT export actions alongside print, with client-side export cleanup to drop permalinks, URLs, and images for cleaner downloads.
- 2025-12-26: Reviewed character pages; corrected Leon's roles/innate/gameplan and clarified ammo scaling, fixed a Rocket Launcher target/formatting issue, linked keywords/statuses consistently, adjusted Goku difficulty to High, and aligned Luffy/Rover markup with shared link conventions.
- 2025-12-26: Defined Reload in terminology to formalize the ammo reset behavior referenced by character cards and refreshed the front-page last-updated timestamp.
- 2025-12-26: Added an Ammo glossary entry to define per-weapon ammo tracking and activation requirements; refreshed the front-page last-updated timestamp.
- 2025-12-26: Added Saitama (Hero for Fun) with State-based tiers, local character art, and roster/index/nav updates; refreshed the front-page last-updated timestamp.
- 2025-12-26: Swapped remaining character portraits to local assets, added Leon to the character index and nav, and refreshed the front-page last-updated timestamp.
- 2025-12-29: Renamed Saitama (Hero for Fun) to Saitama (Base) across nav/index/character page and refreshed the front-page last-updated timestamp.
- 2025-12-29: Added Light Yagami (Kira) with unique Stolen Information/Death Note statuses, a single-target meter-accelerated execution, roster/nav updates, and a new Basic card naming rule; refreshed the front-page last-updated timestamp.
- 2025-12-29: Fixed character portrait paths for directory URLs, clarified contributor/skill guidance on `../../assets/characters/<file>`, and refreshed the front-page last-updated timestamp.
- 2025-12-29: Downloaded local Light Yagami portrait asset, swapped the character page to the local image path, and refreshed the front-page last-updated timestamp.
- 2025-12-31: Replaced the export actions with an icon-only dropdown, added all-pages ZIP exports (HTML/MD/TXT in `html/`, `md/`, `txt/`), and refreshed the front-page last-updated timestamp and agent guidance.
- 2026-01-01: Added Naruto Uzumaki (Pre-Timeskip) with local art and roster/nav updates, added a character creation guide and exposed the template in nav, introduced the Assist Attack keyword, clarified Allies include self, codified automatic card replacement plus mandatory Spend rules across terminology/FAQ/guide, tightened status reapply wording, and updated AGENTS/skills with the new content rules while refreshing the front-page timestamp.
- 2026-01-01: Clarified Leon's Handgun spend wording to match the mandatory/optional Spend rule, aligned Naruto's difficulty and gameplan with the One-Tail Cloak/Gamabunta kit updates, fixed a Summoned: Gamabunta Stack reference, corrected Naruto's index power line, and refreshed the front-page timestamp.
- 2026-01-01: Reworded Leon's Handgun multihit ammo spend to allow partial ammo use while keeping damage split tied to remaining multihit count, and refreshed the front-page timestamp.
- 2026-01-01: Made Leon's Handgun ammo spend mandatory while still forcing maximum possible spend, and refreshed the front-page timestamp.
- 2026-01-01: Fixed character index filtering by honoring the `hidden` attribute on character cards, updated AGENTS and the content-authoring skill with the filter rule, and refreshed the front-page timestamp.
- 2026-01-01: Added Kurosaki Ichigo (Soul Society) with local art, roster/nav updates, and fixed naming/count consistency; refreshed the front-page timestamp.
- 2026-01-02: Clarified Evade keyword timing (0 Power damage after Shield), added an Evade vs Shield FAQ example with a glossary cross-link, and refreshed the front-page timestamp while updating agent guidance.
- 2026-01-02: Fixed Gear timing with On Gain triggers and an explicit delayed Deflate on expiry, defined On Gain timing in status/terminology with a FAQ example, clarified Multihit count rules and Leon's Handgun setup, and refreshed the front-page timestamp while updating agent guidance and content skills.
- 2026-01-02: Added DIO (Part 3) with local art and roster/nav updates, defined a Cannot Play Cards glossary entry with a FAQ example for Time Stop lockouts, linked the term in-card, and refreshed the front-page timestamp.
- 2026-01-02: Codified expanded power budgeting rules (mixed/variable/0-cost handling), documented the DIO Ultimate exception in the creation guide, updated agent guidance/skills to point to the guide for Power rules, and refreshed the front-page last-updated timestamp.
- 2026-01-02: Added ZIP export options for format and combined character pages, fixed character page detection for subdirectory paths, and refreshed the front-page timestamp while updating agent/skill guidance.
- 2026-01-02: Fixed combined character exports to detect character pages by content markers (not just URLs) and refreshed the front-page timestamp.
- 2026-01-02: Removed export-panel UI text from exports, excluded the template character from combined character bundles, and refreshed the front-page timestamp.
- 2026-01-03: Established `docs/data/` as the canonical game data source with per-character YAML files, added a docs-side exporter scaffold, updated contributor/agent guidance to keep data in sync, and refreshed the front-page last-updated timestamp.
- 2026-01-03: Added a cross-repo TODO tracker to coordinate the docs-first data pipeline and the game implementation roadmap.
- 2026-01-03: Added canonical YAML files for keywords, status effects, terms, card types, and roles; expanded the exporter to emit shared data JSON alongside characters; and added a GitHub Action to sync exports and character assets into the game repo.
- 2026-01-03: Documented structured card effects and sync settings, validated optional effect objects in the exporter, and added initial structured effects to Rover's data.
- 2026-01-03: Removed the embedded game page, scripts, and styles from the docs repo now that the web game lives in its own repository.
- 2026-01-03: Removed generated `site/` output from tracking, expanded ignores/excludes for build artifacts, and refreshed repo guidance (README/TODO/AGENTS/skills) to reflect the docs-only scope.
- 2026-01-03: Added structured effect extensions (conditions, hits, transforms), converted Goku to structured effects, and validated transforms in the exporter.
- 2026-01-03: Refreshed the front-page timestamp and updated AGENTS/skills/README/TODO to reflect structured effects fields and cross-repo workflow state.
- 2026-01-03: Began Luffy's structured effect pass by adding basic damage/shield effects and gear-based transforms; left choice/X-based effects unstructured for now.
- 2026-01-03: Defined choice and X-scaled structured effect schema, validated them in the exporter, added choice selection plumbing in the game UI/core, and finished Luffy's Gear Transformation/Jet Gatling structured effects with Gear checks.
- 2026-01-03: Implemented full timing windows in the core engine (On Play through Always), added text timing parsing, enforced "Can only be used if..." card restrictions, and wired Evade hit suppression + reuse handling during clashes.
- 2026-01-03: Added after-use follow-up window tracking and out-of-turn Follow-Up/Assist Attack permissions, plus innate-based damage mitigation (Resist/Immune/Weakness/Absorb) in core damage resolution.
- 2026-01-03: Surfaced out-of-turn Follow-Up/Assist play in the client UI, extended mitigation parsing to active statuses and defense card text, and added a deterministic core harness for timing/mitigation checks.
- 2026-01-03: Added a reaction window indicator in the client UI and limited mitigation parsing from global status rules to passive (Effect/Always) entries.
- 2026-01-03: Converted remaining character YAMLs to structured effects where possible (Saitama, Ichigo, Naruto, Leon, Light, DIO, Rover), adding transforms and conditional timing data to match card text.
- 2026-01-03: Implemented status caps/expiry/trigger handling in core (turn start/end rules, On Gain/expire hooks, mitigation and power modifiers, cost and speed shifts, and card-played triggers), plus client-side affordance updates for adjusted costs/speeds and Time Stop follow-up reactions.
- 2026-01-04: Refreshed project metadata (front-page last-updated timestamp, CODEX_HISTORY, AGENTS/skills guidance, README/TODO notes) to document the current engine/data state and next steps.
- 2026-01-04: Updated the front-page timestamp and refreshed AGENTS/README/TODO to reflect the core engine's hand/deck and spend/draw/creation support, while documenting remaining structured-effect gaps.
- 2026-01-05: Added shared status control/positioning/deck keywords, formalized damage resolution order and On Hit/On Damage/On HP Damage timing labels, introduced Barrier/Invulnerable/Regen/Renewal/Redirect/Taunt/Thorns, defined Bounce as an Area type, clarified adjacency/opposed plus Evade/Stagnate wording, and updated FAQ/AGENTS/front-page timestamp with synced data exports.
- 2026-01-05: Updated content authoring and character kit design skills to reflect the current damage order, timing labels, and adjacency/opposed targeting guidance, and refreshed the front-page last-updated timestamp.
- 2026-01-05: Added XLSX export mode for character pages in ZIP exports, generating a multi-sheet workbook (Characters, Innates, Status Effects, Cards) for clean GPT-friendly extraction, and updated export UI/agent guidance with the new option.
- 2026-01-05: Added a Movement Round before Combat, introduced Counter plus Disarm/Seal/Silence/Root/Stagger/Wound/Wither, clarified Stack vs Value usage, clamped Power at 0, standardized Potency caps at 10 with -1 decay (Halve retained for Bleed/Burn/Poison), synced terminology/FAQ/data, and refreshed front-page timestamp plus agent guidance.
- 2026-01-05: Clarified Movement Round as non-card play with no Ultimate Meter gain, added healing reduction FAQ for Wound/Wither with a Healing glossary entry, and refreshed the front-page timestamp.
- 2026-01-05: Aligned Counter timing with Follow-Up/Assist rules, clarified Root swap failure (costs paid, other effects still resolve), expanded Movement Round swap failure note, fixed healing reduction wording, updated Priority glossary to include Movement Round, and refreshed the front-page timestamp.
- 2026-01-05: Added the rooted swap failure note to the Movement Round FAQ and refreshed the front-page timestamp.
- 2026-01-05: Clarified Priority to pass after play, swap, or pass (Movement Round included) and refreshed the front-page timestamp.
- 2026-01-05: Corrected the Wound/Wither FAQ example to match current caps and refreshed the front-page timestamp.
- 2026-01-05: Raised Regen/Renewal Potency caps and Wound/Wither Stack caps to 999, synced data, and refreshed the front-page timestamp.
- 2026-01-05: Added a Combat Round ref card page and nav link, tiered keywords into Core/Advanced with keyword tier metadata (plus web data typing), standardized status effect Mode/Turn End visibility, added timing-labeled card text templates and removed the finisher-range guidance, introduced SKILLS manifests, updated AGENTS/skills guidance, and refreshed the front-page timestamp.
- 2026-01-05: Clarified cross-repo workflow in AGENTS/skills/README/TODO, aligned web repo skills with the current client/core structure, and refreshed the front-page timestamp.
