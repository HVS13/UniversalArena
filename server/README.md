# Universal Arena Relay Server

This is a tiny WebSocket relay for 2-player lobbies. It stores rooms in memory and does not use a database.

## Local usage

```bash
cd server
npm install
npm run start
```

Default URL: `ws://localhost:8787`

## Environment variables

- `PORT` (default: 8787)
- `MAX_PLAYERS` (default: 2)

## Wiring the site

Update `docs/javascripts/game/config.js` with your deployed relay URL, for example:

```js
window.UA_GAME_CONFIG = {
  serverUrl: "wss://your-relay-host",
  localServerUrl: "ws://localhost:8787",
  maxPlayers: 2,
};
```

The MkDocs site stays static. The relay server handles lobbies and relays match events.
