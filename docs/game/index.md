# Play (Prototype)

This is a text-first multiplayer prototype built from the docs. It uses the character pages and rules reference to keep data in one place.

<div class="ua-game" data-ua-game>
  <header class="ua-game__hero">
    <div class="ua-game__hero-text">
      <p class="ua-game__eyebrow">Universal Arena</p>
      <h2 class="ua-game__title">Relay Match</h2>
      <p class="ua-game__lead">Create a lobby, invite a friend, and play a rules-light match that follows the official phases. Character data stays synced with the documentation.</p>
      <div class="ua-game__hero-actions">
        <a class="ua-game__link" href="../index/#how-to-play">How to Play</a>
        <a class="ua-game__link" href="../characters/">Character Roster</a>
      </div>
    </div>
    <div class="ua-game__hero-card">
      <div class="ua-game__status">
        <span class="ua-game__status-dot" aria-hidden="true"></span>
        <span class="ua-game__status-text" id="ua-connection-status">Offline</span>
      </div>
      <p class="ua-game__status-note" id="ua-connection-note">Connect to the relay server to enable multiplayer.</p>
      <div class="ua-game__status-actions">
        <button class="ua-game__button" type="button" id="ua-retry-connect">Retry connection</button>
      </div>
    </div>
  </header>

  <div class="ua-game__stage" data-ua-stage="identity">
    <div class="ua-game__stage-header">
      <p class="ua-game__stage-kicker">Step 1</p>
      <h3>Choose a callsign</h3>
      <p>Pick a name that shows up in the lobby and battle log.</p>
    </div>
    <div class="ua-game__panel">
      <label class="ua-game__label" for="ua-player-name">Username</label>
      <input class="ua-game__input" id="ua-player-name" type="text" maxlength="20" placeholder="Enter a username" autocomplete="off" />
      <button class="ua-game__button" type="button" id="ua-name-continue" disabled>Continue</button>
    </div>
  </div>

  <div class="ua-game__stage" data-ua-stage="lobby-choice" hidden>
    <div class="ua-game__stage-header">
      <p class="ua-game__stage-kicker">Step 2</p>
      <h3>Create or join a lobby</h3>
      <p>Create a room for a friend or join with an invite code.</p>
    </div>
    <div class="ua-game__grid">
      <div class="ua-game__panel">
        <h4 class="ua-game__panel-title">Create</h4>
        <p class="ua-game__panel-text">Generate a lobby code and share it.</p>
        <button class="ua-game__button ua-game__button--primary" type="button" id="ua-create-lobby">Create lobby</button>
      </div>
      <div class="ua-game__panel">
        <h4 class="ua-game__panel-title">Join</h4>
        <p class="ua-game__panel-text">Enter a code from your friend.</p>
        <label class="ua-game__label" for="ua-join-code">Lobby code</label>
        <input class="ua-game__input" id="ua-join-code" type="text" maxlength="8" placeholder="ABC123" autocomplete="off" />
        <button class="ua-game__button" type="button" id="ua-join-lobby">Join lobby</button>
      </div>
    </div>
  </div>

  <div class="ua-game__stage" data-ua-stage="lobby" hidden>
    <div class="ua-game__stage-header">
      <p class="ua-game__stage-kicker">Step 3</p>
      <h3>Lobby</h3>
      <p>Wait for another player and start the match.</p>
    </div>
    <div class="ua-game__grid">
      <div class="ua-game__panel">
        <h4 class="ua-game__panel-title">Invite Code</h4>
        <div class="ua-game__code" id="ua-lobby-code">----</div>
        <button class="ua-game__button" type="button" id="ua-copy-code">Copy code</button>
      </div>
      <div class="ua-game__panel">
        <h4 class="ua-game__panel-title">Players</h4>
        <div class="ua-game__player-list" id="ua-lobby-players"></div>
      </div>
    </div>
    <div class="ua-game__actions">
      <button class="ua-game__button ua-game__button--primary" type="button" id="ua-start-match" disabled>Start match</button>
      <button class="ua-game__button" type="button" id="ua-leave-lobby">Leave lobby</button>
    </div>
  </div>

  <div class="ua-game__stage" data-ua-stage="characters" hidden>
    <div class="ua-game__stage-header">
      <p class="ua-game__stage-kicker">Step 4</p>
      <h3>Select your character</h3>
      <p>Character data is pulled directly from the documentation.</p>
    </div>
    <div class="ua-game__selection">
      <div>
        <p class="ua-game__selection-label">Your pick</p>
        <p class="ua-game__selection-value" id="ua-your-choice">None</p>
      </div>
      <div>
        <p class="ua-game__selection-label">Opponent pick</p>
        <p class="ua-game__selection-value" id="ua-opponent-choice">Waiting</p>
      </div>
    </div>
    <div class="ua-game__character-grid" id="ua-character-grid"></div>
    <div class="ua-game__actions">
      <button class="ua-game__button ua-game__button--primary" type="button" id="ua-lock-choice" disabled>Lock in</button>
      <button class="ua-game__button" type="button" id="ua-back-lobby">Back to lobby</button>
    </div>
  </div>

  <div class="ua-game__stage" data-ua-stage="match" hidden>
    <div class="ua-game__stage-header">
      <p class="ua-game__stage-kicker">Battle</p>
      <h3>Combat Console</h3>
      <p>Play cards, resolve the stack, and track the results.</p>
    </div>
    <div class="ua-game__match">
      <div class="ua-game__panel ua-game__panel--players">
        <div class="ua-game__player-card" data-role="you">
          <div class="ua-game__player-header">
            <div>
              <p class="ua-game__player-name" id="ua-you-name">You</p>
              <p class="ua-game__player-character" id="ua-you-character">Character</p>
            </div>
            <span class="ua-game__player-tag" id="ua-you-active">Waiting</span>
          </div>
          <div class="ua-game__stat-grid">
            <div class="ua-game__stat"><span>HP</span><strong id="ua-you-hp">0</strong></div>
            <div class="ua-game__stat"><span>Shield</span><strong id="ua-you-shield">0</strong></div>
            <div class="ua-game__stat"><span>Energy</span><strong id="ua-you-energy">0</strong></div>
            <div class="ua-game__stat"><span>Ultimate</span><strong id="ua-you-ultimate">0</strong></div>
          </div>
        </div>
        <div class="ua-game__player-card" data-role="opponent">
          <div class="ua-game__player-header">
            <div>
              <p class="ua-game__player-name" id="ua-opponent-name">Opponent</p>
              <p class="ua-game__player-character" id="ua-opponent-character">Character</p>
            </div>
            <span class="ua-game__player-tag" id="ua-opponent-active">Waiting</span>
          </div>
          <div class="ua-game__stat-grid">
            <div class="ua-game__stat"><span>HP</span><strong id="ua-opponent-hp">0</strong></div>
            <div class="ua-game__stat"><span>Shield</span><strong id="ua-opponent-shield">0</strong></div>
            <div class="ua-game__stat"><span>Energy</span><strong id="ua-opponent-energy">0</strong></div>
            <div class="ua-game__stat"><span>Ultimate</span><strong id="ua-opponent-ultimate">0</strong></div>
          </div>
        </div>
      </div>
      <div class="ua-game__panel ua-game__panel--arena">
        <div class="ua-game__phase">
          <div>
            <p class="ua-game__phase-label">Phase</p>
            <p class="ua-game__phase-value" id="ua-phase">Combat Start</p>
          </div>
          <div>
            <p class="ua-game__phase-label">Turn</p>
            <p class="ua-game__phase-value" id="ua-turn">1</p>
          </div>
        </div>
        <div class="ua-game__stack">
          <p class="ua-game__stack-title">Combat Stack</p>
          <div class="ua-game__stack-list" id="ua-stack"></div>
        </div>
        <div class="ua-game__actions">
          <button class="ua-game__button" type="button" id="ua-pass">Pass</button>
          <button class="ua-game__button ua-game__button--primary" type="button" id="ua-end">End</button>
        </div>
      </div>
      <div class="ua-game__panel ua-game__panel--cards">
        <div class="ua-game__cards-header">
          <p class="ua-game__stack-title">Card List</p>
          <p class="ua-game__panel-text">Playable cards update from the character page.</p>
        </div>
        <div class="ua-game__card-list" id="ua-card-list"></div>
      </div>
    </div>
    <div class="ua-game__log">
      <div class="ua-game__log-header">
        <p class="ua-game__stack-title">Battle Log</p>
        <button class="ua-game__button ua-game__button--ghost" type="button" id="ua-clear-log">Clear log</button>
      </div>
      <div class="ua-game__log-feed" id="ua-log" aria-live="polite"></div>
    </div>
  </div>
</div>
