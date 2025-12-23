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
