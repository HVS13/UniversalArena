(() => {
  let teardown = null;
  const init = () => {
    const root = document.querySelector("[data-ua-game]");
    if (!root) return;
    if (root.dataset.uaGameReady === "true") return;
    if (teardown) teardown();
    root.dataset.uaGameReady = "true";
  
    const config = window.UA_GAME_CONFIG ?? {};
    const maxPlayers = Number(config.maxPlayers) || 2;
    const storage = window.localStorage;
  
    const ui = {
      connectionStatus: root.querySelector("#ua-connection-status"),
      connectionNote: root.querySelector("#ua-connection-note"),
      statusDot: root.querySelector(".ua-game__status-dot"),
      retryConnect: root.querySelector("#ua-retry-connect"),
      nameInput: root.querySelector("#ua-player-name"),
      nameContinue: root.querySelector("#ua-name-continue"),
      createLobby: root.querySelector("#ua-create-lobby"),
      joinLobby: root.querySelector("#ua-join-lobby"),
      joinCode: root.querySelector("#ua-join-code"),
      lobbyCode: root.querySelector("#ua-lobby-code"),
      copyCode: root.querySelector("#ua-copy-code"),
      lobbyPlayers: root.querySelector("#ua-lobby-players"),
      startMatch: root.querySelector("#ua-start-match"),
      leaveLobby: root.querySelector("#ua-leave-lobby"),
      backLobby: root.querySelector("#ua-back-lobby"),
      lockChoice: root.querySelector("#ua-lock-choice"),
      characterGrid: root.querySelector("#ua-character-grid"),
      yourChoice: root.querySelector("#ua-your-choice"),
      opponentChoice: root.querySelector("#ua-opponent-choice"),
      youName: root.querySelector("#ua-you-name"),
      youCharacter: root.querySelector("#ua-you-character"),
      youActive: root.querySelector("#ua-you-active"),
      youHp: root.querySelector("#ua-you-hp"),
      youShield: root.querySelector("#ua-you-shield"),
      youEnergy: root.querySelector("#ua-you-energy"),
      youUltimate: root.querySelector("#ua-you-ultimate"),
      opponentName: root.querySelector("#ua-opponent-name"),
      opponentCharacter: root.querySelector("#ua-opponent-character"),
      opponentActive: root.querySelector("#ua-opponent-active"),
      opponentHp: root.querySelector("#ua-opponent-hp"),
      opponentShield: root.querySelector("#ua-opponent-shield"),
      opponentEnergy: root.querySelector("#ua-opponent-energy"),
      opponentUltimate: root.querySelector("#ua-opponent-ultimate"),
      phase: root.querySelector("#ua-phase"),
      turn: root.querySelector("#ua-turn"),
      stack: root.querySelector("#ua-stack"),
      pass: root.querySelector("#ua-pass"),
      end: root.querySelector("#ua-end"),
      cardList: root.querySelector("#ua-card-list"),
      log: root.querySelector("#ua-log"),
      clearLog: root.querySelector("#ua-clear-log"),
    };
  
    const stages = Array.from(root.querySelectorAll("[data-ua-stage]"));
  
    const phaseLabels = {
      turn_start: "Turn Start",
      combat_start: "Combat Start",
      combat_resolve: "Combat Resolve",
      combat_end: "Combat End",
      turn_end: "Turn End",
      finished: "Match Ended",
    };
  
    let socket = null;
    let lobby = null;
    let selections = {};
    let selectedCharacterId = "";
    let characters = [];
    let characterMap = new Map();
    let matchState = null;
    let isHost = false;
    let playerName = "";
    let charactersPromise = null;
    let relayOnline = false;
  
    const clientId = (() => {
      const stored = storage.getItem("ua-game-client-id");
      if (stored) return stored;
  
      const created =
        (window.crypto && typeof window.crypto.randomUUID === "function")
          ? window.crypto.randomUUID()
          : `ua-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      storage.setItem("ua-game-client-id", created);
      return created;
    })();
  
    const lastName = storage.getItem("ua-game-player-name");
    if (lastName && ui.nameInput) {
      ui.nameInput.value = lastName;
      ui.nameContinue.disabled = !lastName.trim();
    }
  
    const setStage = (name) => {
      stages.forEach((stage) => {
        stage.toggleAttribute("hidden", stage.dataset.uaStage !== name);
      });
    };

    const setOnlineState = (online) => {
      relayOnline = Boolean(online);
      if (ui.createLobby) ui.createLobby.disabled = !relayOnline;
      if (ui.joinLobby) ui.joinLobby.disabled = !relayOnline;
      if (ui.joinCode) ui.joinCode.disabled = !relayOnline;
      if (relayOnline) {
        if (ui.startMatch && lobby) {
          ui.startMatch.disabled = !isHost || lobby.players.length < maxPlayers;
        }
        if (ui.lockChoice && selectedCharacterId) {
          ui.lockChoice.disabled = false;
        }
      } else {
        if (ui.startMatch) ui.startMatch.disabled = true;
        if (ui.lockChoice) ui.lockChoice.disabled = true;
        if (ui.pass) ui.pass.disabled = true;
        if (ui.end) ui.end.disabled = true;
        if (ui.clearLog) ui.clearLog.disabled = true;
        if (ui.cardList) {
          ui.cardList.querySelectorAll(".ua-game__card-button").forEach((button) => {
            button.disabled = true;
          });
        }
      }
    };

    const setStatus = (text, note, online) => {
      if (ui.connectionStatus) ui.connectionStatus.textContent = text;
      if (ui.connectionNote && note !== undefined) ui.connectionNote.textContent = note;
      if (ui.statusDot) ui.statusDot.classList.toggle("is-online", Boolean(online));
      setOnlineState(online);
    };
  
    const setError = (message) => {
      if (!message) return;
      addLocalLog(`System: ${message}`);
    };
  
    const addLocalLog = (text) => {
      if (!ui.log) return;
      const entry = document.createElement("div");
      entry.className = "ua-game__log-entry";
      entry.textContent = text;
      ui.log.prepend(entry);
    };
  
    const showLog = (entries) => {
      if (!ui.log) return;
      ui.log.innerHTML = "";
      entries.slice(-80).forEach((entry) => {
        const item = document.createElement("div");
        item.className = "ua-game__log-entry";
        item.textContent = entry;
        ui.log.appendChild(item);
      });
    };
  
    const getMaterialBase = () => {
      const configEl = document.getElementById("__config");
      if (!configEl) return "";
      try {
        return JSON.parse(configEl.textContent ?? "{}").base ?? "";
      } catch {
        return "";
      }
    };
  
    const getBaseUrl = () => {
      const base = getMaterialBase();
      if (base) {
        const normalized = base.endsWith("/") ? base : `${base}/`;
        return new URL(normalized, window.location.origin);
      }
  
      const baseTag = document.querySelector("base[href]");
      if (baseTag) {
        return new URL(baseTag.getAttribute("href") ?? "/", window.location.origin);
      }
  
      return new URL("/", window.location.origin);
    };
  
    const baseUrl = getBaseUrl();
  
    const resolveServerUrl = () => {
      const isLocal = ["localhost", "127.0.0.1", "0.0.0.0"].includes(window.location.hostname);
      if (isLocal && config.localServerUrl) return config.localServerUrl;
      if (config.serverUrl) return config.serverUrl;
      return "";
    };
  
    const connect = () => {
      const url = resolveServerUrl();
      if (!url) {
        setStatus("Offline", "Set UA_GAME_CONFIG.serverUrl to enable multiplayer.", false);
        return;
      }
  
      if (socket && socket.readyState === WebSocket.OPEN) return;
      if (socket && socket.readyState === WebSocket.CONNECTING) return;
  
      setStatus("Connecting...", "Establishing relay connection.", false);
      socket = new WebSocket(url);
  
      socket.addEventListener("open", () => {
        setStatus("Online", "Relay connected. You can create or join a lobby.", true);
        sendHello();
      });
  
      socket.addEventListener("close", () => {
        setStatus("Offline", "Connection lost. Retry to reconnect.", false);
      });
  
      socket.addEventListener("error", () => {
        setStatus("Offline", "Unable to reach relay server.", false);
      });
  
      socket.addEventListener("message", (event) => {
        let message = null;
        try {
          message = JSON.parse(event.data);
        } catch {
          return;
        }
  
        if (!message || !message.type) return;
  
        switch (message.type) {
          case "lobby_snapshot":
            handleLobbySnapshot(message.lobby);
            break;
          case "lobby_closed":
            handleLobbyClosed(message.reason);
            break;
          case "lobby_event":
            handleLobbyEvent(message);
            break;
          case "game_event":
            handleGameEvent(message);
            break;
          case "error":
            setError(message.message);
            break;
          default:
            break;
        }
      });
    };
  
    const sendMessage = (type, data = {}) => {
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        setError("Relay not connected.");
        return;
      }
      socket.send(JSON.stringify({ type, ...data }));
    };
  
    const sendHello = () => {
      if (!playerName) return;
      if (!socket || socket.readyState !== WebSocket.OPEN) return;
      sendMessage("hello", { clientId, name: playerName });
    };
  
    const resetState = () => {
      lobby = null;
      selections = {};
      selectedCharacterId = "";
      matchState = null;
      isHost = false;
      ui.lobbyCode.textContent = "----";
      ui.lobbyPlayers.innerHTML = "";
      ui.characterGrid.innerHTML = "";
      ui.yourChoice.textContent = "None";
      ui.opponentChoice.textContent = "Waiting";
      ui.lockChoice.disabled = true;
      ui.startMatch.disabled = true;
      ui.cardList.innerHTML = "";
      delete ui.cardList.dataset.built;
      setStage("lobby-choice");
    };
  
    const handleLobbySnapshot = (snapshot) => {
      lobby = snapshot;
      if (!lobby) return;
  
      isHost = lobby.hostId === clientId;
  
      ui.lobbyCode.textContent = lobby.code;
      ui.startMatch.disabled = !relayOnline || !isHost || lobby.players.length < maxPlayers;
  
      ui.lobbyPlayers.innerHTML = "";
      lobby.players.forEach((player) => {
        const pill = document.createElement("div");
        pill.className = "ua-game__player-pill";
        pill.textContent = player.name;
        const tag = document.createElement("span");
        tag.textContent = player.id === lobby.hostId ? "Host" : "Player";
        pill.appendChild(tag);
        ui.lobbyPlayers.appendChild(pill);
      });
  
      setStage("lobby");
    };
  
    const handleLobbyClosed = (reason) => {
      addLocalLog(reason || "Lobby closed.");
      resetState();
    };
  
    const handleLobbyEvent = (message) => {
      if (message.event === "start_match") {
        selections = {};
        selectedCharacterId = "";
        ui.lockChoice.disabled = true;
        ui.yourChoice.textContent = "None";
        ui.opponentChoice.textContent = "Waiting";
        setStage("characters");
        ensureCharacters();
      }
  
      if (message.event === "return_to_lobby") {
        selections = {};
        selectedCharacterId = "";
        ui.lockChoice.disabled = true;
        ui.yourChoice.textContent = "None";
        ui.opponentChoice.textContent = "Waiting";
        setStage("lobby");
      }
    };
  
    const handleGameEvent = (message) => {
      switch (message.event) {
        case "select_character":
          if (isHost) {
            if (!message.data?.characterId) return;
            selections[message.from] = message.data.characterId;
            broadcastSelection();
            if (lobby && Object.keys(selections).length === lobby.players.length) startMatch();
          }
          break;
        case "selection_update":
          if (message.data?.selections) updateSelectionDisplay(message.data.selections);
          break;
        case "player_action":
          if (isHost) {
            if (!message.data) return;
            applyAction(message.from, message.data);
            broadcastState();
          }
          break;
        case "state_update":
          matchState = message.data.state;
          ui.cardList.innerHTML = "";
          delete ui.cardList.dataset.built;
          setStage("match");
          renderMatch();
          break;
        default:
          break;
      }
    };
  
    const broadcastSelection = () => {
      sendMessage("game_event", {
        event: "selection_update",
        data: { selections },
      });
    };
  
    const startMatch = () => {
      if (!lobby) return;
      matchState = createMatchState(lobby, selections);
      sendMessage("game_event", {
        event: "state_update",
        data: { state: matchState },
      });
    };
  
    const createMatchState = (lobbyInfo, selectionMap) => {
      const state = {
        turn: 1,
        phase: "combat_start",
        stack: [],
        log: [],
        winnerId: null,
        initiativePlayerId: lobbyInfo.hostId,
        activePlayerId: lobbyInfo.hostId,
        players: {},
      };
  
      lobbyInfo.players.forEach((player) => {
        state.players[player.id] = {
          id: player.id,
          name: player.name,
          characterId: selectionMap[player.id],
          hp: 100,
          shield: 0,
          energy: 5,
          ultimate: 0,
          ended: false,
        };
      });
  
      const initiator = state.players[state.initiativePlayerId];
      addLog(state, `Turn 1 begins. ${initiator ? initiator.name : "Host"} has initiative.`);
      return state;
    };
  
    const addLog = (state, entry) => {
      if (!state.log) state.log = [];
      state.log.push(entry);
    };
  
    const getOpponentId = (state, playerId) => {
      return Object.keys(state.players).find((id) => id !== playerId) || playerId;
    };
  
    const formatCharacterName = (characterId) => {
      const character = characterMap.get(characterId);
      if (!character) return "Unknown";
      return `${character.name} (${character.version})`;
    };
  
    const getCardById = (characterId, cardId) => {
      const character = characterMap.get(characterId);
      if (!character) return null;
      return character.cards.find((card) => card.id === cardId);
    };
  
    const applyAction = (playerId, action) => {
      if (!matchState || matchState.winnerId) return;
      if (matchState.phase !== "combat_start") return;
      if (matchState.activePlayerId !== playerId) return;
  
      const player = matchState.players[playerId];
      const opponentId = getOpponentId(matchState, playerId);
      const opponent = matchState.players[opponentId];
  
      if (!player || player.ended) return;
  
      if (action.type === "play_card") {
        const card = getCardById(player.characterId, action.cardId);
        if (!card) return;
  
        if (card.costType === "energy" && player.energy < card.costValue) {
          addLog(matchState, `${player.name} tried to play ${card.name} but lacked energy.`);
          return;
        }
        if (card.costType === "ultimate" && player.ultimate < card.costValue) {
          addLog(matchState, `${player.name} tried to play ${card.name} but lacked ultimate.`);
          return;
        }
  
        if (card.costType === "energy") {
          player.energy -= card.costValue;
          player.ultimate += card.costValue + 1;
        }
        if (card.costType === "ultimate") {
          player.ultimate -= card.costValue;
        }
  
        matchState.stack.push({
          cardId: card.id,
          name: card.name,
          effect: card.effectText,
          playedBy: playerId,
          target: card.target,
          cost: card.costText,
          powerValue: card.powerValue,
          powerText: card.powerText,
        });
  
        addLog(matchState, `${player.name} plays ${card.name}.`);
        matchState.activePlayerId = opponent && !opponent.ended ? opponentId : playerId;
        return;
      }
  
      if (action.type === "pass") {
        addLog(matchState, `${player.name} passes.`);
        matchState.activePlayerId = opponent && !opponent.ended ? opponentId : playerId;
        return;
      }
  
      if (action.type === "end") {
        player.ended = true;
        addLog(matchState, `${player.name} ends their combat step.`);
        if (opponent && opponent.ended) {
          resolveCombat(matchState);
        } else {
          matchState.activePlayerId = opponentId;
        }
        return;
      }
  
      if (action.type === "clear_log") {
        matchState.log = [];
        return;
      }
    };
  
    const resolveCombat = (state) => {
      state.phase = "combat_resolve";
      addLog(state, "Combat Resolve begins.");
  
      const queue = state.stack.slice().reverse();
      queue.forEach((entry) => {
        if (state.winnerId) return;
        const cardOwner = state.players[entry.playedBy];
        const targetId = getOpponentId(state, entry.playedBy);
        const target = state.players[targetId];
        applyCardEffect(state, entry, cardOwner, target);
      });
  
      if (state.winnerId) {
        state.phase = "finished";
        return;
      }
  
      state.phase = "combat_end";
      addLog(state, "Combat End.");
      state.phase = "turn_end";
      addLog(state, "Turn End.");
      advanceTurn(state);
    };
  
    const advanceTurn = (state) => {
      if (state.winnerId) return;
      state.turn += 1;
      state.stack = [];
      state.initiativePlayerId = getOpponentId(state, state.initiativePlayerId);
      state.activePlayerId = state.initiativePlayerId;
      Object.values(state.players).forEach((player) => {
        player.energy = 5;
        player.ended = false;
      });
      const initiator = state.players[state.activePlayerId];
      addLog(state, `Turn ${state.turn} begins. ${initiator ? initiator.name : "Host"} has initiative.`);
      state.phase = "combat_start";
    };

    const getHitCount = (text) => {
      if (!text) return 1;
      if (/twice/i.test(text)) return 2;
      const timesMatch = text.match(/(\d+)\s+times/i);
      if (timesMatch) return Number(timesMatch[1]);
      if (/x\+1\s+times/i.test(text)) return 2;
      return 1;
    };

    const applyCardEffect = (state, entry, source, target) => {
      if (!source || !target) return;

      const effectText = (entry.effect || "").toString();
      const hitCount = getHitCount(effectText);
      const powerValue = Number(entry.powerValue) || 0;
      const damageMatch = effectText.match(/deal\s+(\d+)\s+damage/i);
      const powerDamageMatch = /deal\s+power\s+damage/i.test(effectText);
      const shieldMatch = effectText.match(/gain\s+(\d+)\s+shield/i);
      const powerShieldMatch = /gain\s+power\s+shield/i.test(effectText);
      const healMatch = effectText.match(/heal\s+(\d+)\s+hp/i);
      const powerHealMatch = /heal\s+power\s+hp/i.test(effectText);
      const ultimateMatch = effectText.match(/gain\s+(\d+)\s+ultimate\s+meter/i);
      const powerUltimateMatch = /gain\s+power\s+ultimate\s+meter/i.test(effectText);

      const damageTarget =
        entry.target && /self|ally|allies/i.test(entry.target) ? source : target;

      const damageValue = damageMatch
        ? Number(damageMatch[1]) * hitCount
        : powerDamageMatch
          ? powerValue * hitCount
          : 0;

      if (damageValue > 0) {
        const damage = damageValue;
        const absorbed = Math.min(damageTarget.shield, damage);
        damageTarget.shield -= absorbed;
        const hpLoss = damage - absorbed;
        damageTarget.hp = Math.max(damageTarget.hp - hpLoss, 0);
        addLog(state, `${source.name} deals ${damage} damage to ${damageTarget.name}.`);
      }

      const shieldValue = shieldMatch
        ? Number(shieldMatch[1])
        : powerShieldMatch
          ? powerValue
          : 0;

      if (shieldValue > 0) {
        const shield = shieldValue;
        source.shield += shield;
        addLog(state, `${source.name} gains ${shield} shield.`);
      }

      const healValue = healMatch
        ? Number(healMatch[1])
        : powerHealMatch
          ? powerValue
          : 0;

      if (healValue > 0) {
        const heal = healValue;
        source.hp = Math.min(source.hp + heal, 100);
        addLog(state, `${source.name} heals ${heal} HP.`);
      }

      const ultimateValue = ultimateMatch
        ? Number(ultimateMatch[1])
        : powerUltimateMatch
          ? powerValue
          : 0;

      if (ultimateValue > 0) {
        const gain = ultimateValue;
        source.ultimate += gain;
        addLog(state, `${source.name} gains ${gain} ultimate meter.`);
      }
  
      if (damageTarget.hp <= 0) {
        state.winnerId = source.id;
        addLog(state, `${source.name} wins the match.`);
      }
    };
  
    const renderMatch = () => {
      if (!matchState) return;
  
      const you = matchState.players[clientId];
      const opponentId = getOpponentId(matchState, clientId);
      const opponent = matchState.players[opponentId];
  
      if (you) {
        ui.youName.textContent = you.name;
        ui.youCharacter.textContent = formatCharacterName(you.characterId);
        ui.youHp.textContent = you.hp;
        ui.youShield.textContent = you.shield;
        ui.youEnergy.textContent = you.energy;
        ui.youUltimate.textContent = you.ultimate;
      }
  
      if (opponent) {
        ui.opponentName.textContent = opponent.name;
        ui.opponentCharacter.textContent = formatCharacterName(opponent.characterId);
        ui.opponentHp.textContent = opponent.hp;
        ui.opponentShield.textContent = opponent.shield;
        ui.opponentEnergy.textContent = opponent.energy;
        ui.opponentUltimate.textContent = opponent.ultimate;
      }
  
      const isActive = matchState.activePlayerId === clientId;
      ui.youActive.textContent = isActive ? "Active" : "Waiting";
      ui.youActive.classList.toggle("is-active", isActive);
  
      const opponentActive = matchState.activePlayerId === opponentId;
      ui.opponentActive.textContent = opponentActive ? "Active" : "Waiting";
      ui.opponentActive.classList.toggle("is-active", opponentActive);
  
      ui.phase.textContent = phaseLabels[matchState.phase] || matchState.phase;
      ui.turn.textContent = matchState.turn;
  
      renderStack(matchState.stack);
      showLog(matchState.log || []);
      renderCardList();
  
      const canAct = relayOnline && isActive && matchState.phase === "combat_start" && !matchState.winnerId;
      ui.pass.disabled = !canAct || (you && you.ended);
      ui.end.disabled = !canAct || (you && you.ended);
    };
  
    const renderStack = (stack) => {
      ui.stack.innerHTML = "";
      if (!stack.length) {
        const empty = document.createElement("div");
        empty.className = "ua-game__log-entry";
        empty.textContent = "No cards on the stack yet.";
        ui.stack.appendChild(empty);
        return;
      }
  
      stack.slice().reverse().forEach((entry) => {
        const item = document.createElement("div");
        item.className = "ua-game__stack-item";
        const owner = matchState.players[entry.playedBy];
        const ownerName = owner ? owner.name : "Player";
        const title = document.createElement("strong");
        title.textContent = entry.name;
        const meta = document.createElement("div");
        meta.textContent = `${ownerName} | ${entry.cost || "Cost"} | ${entry.target || "Target"}`;
        item.appendChild(title);
        item.appendChild(meta);
        ui.stack.appendChild(item);
      });
    };
  
    const renderCardList = () => {
      const you = matchState ? matchState.players[clientId] : null;
      if (!you) return;
      const character = characterMap.get(you.characterId);
      if (!character) return;
  
      if (!ui.cardList.dataset.built) {
        ui.cardList.innerHTML = "";
        character.cards.forEach((card) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "ua-game__card-button";
          button.dataset.cardId = card.id;
          const title = document.createElement("div");
          title.className = "ua-game__card-title";
          title.textContent = card.name;
  
          const meta = document.createElement("div");
          meta.className = "ua-game__card-meta";
          meta.textContent = `Cost: ${card.costText} | Target: ${card.target}`;

          const power = document.createElement("div");
          power.className = "ua-game__card-meta";
          power.textContent = `Power: ${card.powerText || "-"}`;

          const types = document.createElement("div");
          types.className = "ua-game__card-meta";
          types.textContent = card.types.join(", ");
  
          const effect = document.createElement("div");
          effect.className = "ua-game__card-meta";
          effect.textContent = card.effectText;
  
          button.appendChild(title);
          button.appendChild(meta);
          button.appendChild(power);
          button.appendChild(types);
          button.appendChild(effect);
          button.addEventListener("click", () => {
            sendAction({ type: "play_card", cardId: card.id });
          });
          ui.cardList.appendChild(button);
        });
        ui.cardList.dataset.built = "true";
      }
  
      const canAct = relayOnline && matchState.activePlayerId === clientId && matchState.phase === "combat_start" && !matchState.winnerId;
      ui.cardList.querySelectorAll(".ua-game__card-button").forEach((button) => {
        const card = character.cards.find((item) => item.id === button.dataset.cardId);
        const canPay = card ? canAffordCard(you, card) : false;
        button.disabled = !(canAct && canPay && !you.ended);
      });
    };
  
    const canAffordCard = (player, card) => {
      if (!card) return false;
      if (card.costType === "energy") return player.energy >= card.costValue;
      if (card.costType === "ultimate") return player.ultimate >= card.costValue;
      return true;
    };
  
    const sendAction = (action) => {
      if (!matchState) return;
      if (!relayOnline) {
        setError("Relay not connected.");
        return;
      }
      if (isHost) {
        applyAction(clientId, action);
        broadcastState();
      } else {
        sendMessage("game_event", { event: "player_action", data: action });
      }
    };
  
    const broadcastState = () => {
      if (!matchState) return;
      sendMessage("game_event", { event: "state_update", data: { state: matchState } });
    };
  
    const ensureCharacters = () => {
      if (!charactersPromise) {
        charactersPromise = loadCharacters().catch(() => {
          charactersPromise = null;
        });
      }
      return charactersPromise;
    };
  
    const loadCharacters = async () => {
      try {
        ui.characterGrid.innerHTML = "Loading characters...";
        const indexUrl = new URL("characters/", baseUrl);
        const indexDoc = await fetchDocument(indexUrl.toString());
        const entries = parseCharacterIndex(indexDoc, indexUrl.toString());
  
        const details = [];
        for (const entry of entries) {
          try {
            const detailDoc = await fetchDocument(entry.href);
            const detail = parseCharacterDetail(detailDoc, entry.href, entry);
            details.push(detail);
          } catch {
            // Skip failed character
          }
        }
  
        characters = details;
        characterMap = new Map(characters.map((character) => [character.id, character]));
        renderCharacterGrid();
      } catch {
        ui.characterGrid.textContent = "Unable to load characters. Check the docs roster.";
      }
    };
  
    const fetchDocument = async (url) => {
      const response = await fetch(url, { credentials: "same-origin" });
      if (!response.ok) throw new Error("Failed to fetch" + url);
      const html = await response.text();
      return new DOMParser().parseFromString(html, "text/html");
    };
  
    const parseCharacterIndex = (doc, base) => {
      const cards = Array.from(doc.querySelectorAll(".character-card"));
      return cards
        .map((card) => {
          const name = (card.dataset.name || "").trim();
          const version = (card.dataset.version || "").trim();
          const tags = (card.dataset.tags || "")
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);
          const summary = (card.querySelector(".character-card__summary")?.textContent || "").trim();
          const href = card.getAttribute("href") || "";
          const isTemplate = name.toLowerCase().includes("template") || version.includes("[[");
          if (isTemplate) return null;
          const url = new URL(href, base).toString();
          return {
            id: slugify(`${name}-${version}`),
            name,
            version,
            tags,
            summary,
            href: url,
          };
        })
        .filter(Boolean);
    };
  
    const parseCharacterDetail = (doc, base, indexEntry) => {
      const meta = {};
      Array.from(doc.querySelectorAll(".character-meta p")).forEach((row) => {
        const key = row.querySelector("strong")?.textContent || "";
        const text = row.textContent || "";
        const cleanedKey = key.replace(":", "").trim().toLowerCase();
        const value = text.replace(key, "").trim();
        if (cleanedKey) meta[cleanedKey] = value;
      });
  
      const image = doc.querySelector(".character-image img")?.getAttribute("src") || "";
      const imageUrl = image ? new URL(image, base).toString() : new URL("assets/characters/placeholder.svg", baseUrl).toString();
  
      const cards = [];
      const headings = Array.from(doc.querySelectorAll("h3"));
      headings.forEach((heading) => {
        const block = heading.nextElementSibling;
        if (!block || !block.classList.contains("card-block")) return;
        const title = heading.textContent.trim();
        const name = title.replace(/^Card\s+\d+\s*:\s*/i, "").replace(/^Ultimate\s*:\s*/i, "");
        const metaEntries = Array.from(block.querySelectorAll(".card-block__meta span"));
        let costText = "";
        let powerText = "";
        let target = "";
        let types = [];
        metaEntries.forEach((span) => {
          const text = span.textContent.trim();
          if (/^Cost:/i.test(text)) costText = text.replace(/^Cost:/i, "").trim();
          if (/^Power Range:/i.test(text)) powerText = text.replace(/^Power Range:/i, "").trim();
          if (/^Target:/i.test(text)) target = text.replace(/^Target:/i, "").trim();
          if (/^Type:/i.test(text)) {
            const raw = text.replace(/^Type:/i, "").trim();
            types = raw.split(",").map((part) => part.trim()).filter(Boolean);
          }
        });
  
        const effectLines = Array.from(block.querySelectorAll("p"))
          .filter((p) => !p.classList.contains("card-block__heading"))
          .map((p) => p.textContent.trim())
          .filter(Boolean);
  
        const { costValue, costType } = parseCost(costText);
        const powerRange = parsePowerRange(powerText);

        cards.push({
          id: slugify(`${name}-${costText}`),
          name,
          costText,
          costValue,
          costType,
          powerText,
          powerMin: powerRange.min,
          powerMax: powerRange.max,
          powerValue: powerRange.value,
          target,
          types,
          effectText: effectLines.join(" "),
        });
      });
  
      return {
        id: indexEntry.id,
        name: indexEntry.name,
        version: indexEntry.version,
        summary: indexEntry.summary,
        tags: indexEntry.tags,
        image: imageUrl,
        meta,
        cards,
      };
    };
  
    const parseCost = (costText) => {
      const match = costText.match(/(\d+)\s*(energy|ultimate\s+meter)/i);
      if (!match) return { costValue: 0, costType: "" };
      const value = Number(match[1]);
      const type = match[2].toLowerCase().includes("ultimate") ? "ultimate" : "energy";
      return { costValue: value, costType: type };
    };

    const parsePowerRange = (powerText) => {
      const cleaned = (powerText || "").trim();
      if (!cleaned || cleaned === "-") return { min: 0, max: 0, value: 0 };
      const rangeMatch = cleaned.match(/(\d+)\s*-\s*(\d+)/);
      if (rangeMatch) {
        const min = Number(rangeMatch[1]);
        const max = Number(rangeMatch[2]);
        return { min, max, value: Math.round((min + max) / 2) };
      }
      const valueMatch = cleaned.match(/(\d+)/);
      if (valueMatch) {
        const value = Number(valueMatch[1]);
        return { min: value, max: value, value };
      }
      return { min: 0, max: 0, value: 0 };
    };

    const slugify = (value) => {
      return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    };
  
    const renderCharacterGrid = () => {
      ui.characterGrid.innerHTML = "";
      if (!characters.length) {
        ui.characterGrid.textContent = "No characters found. Add character pages to the docs.";
        return;
      }
  
      characters.forEach((character) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "ua-game__character-card";
        if (character.id === selectedCharacterId) card.classList.add("is-selected");
        const image = document.createElement("img");
        image.className = "ua-game__character-thumb";
        image.src = character.image;
        image.alt = `${character.name} portrait`;
        image.loading = "lazy";
  
        const name = document.createElement("div");
        name.className = "ua-game__character-name";
        name.textContent = `${character.name} (${character.version})`;
  
        const summary = document.createElement("div");
        summary.className = "ua-game__character-meta";
        summary.textContent = character.summary;
  
        const tags = document.createElement("div");
        tags.className = "ua-game__tag-list";
        character.tags.forEach((tag) => {
          const chip = document.createElement("span");
          chip.className = "ua-game__tag";
          chip.textContent = tag;
          tags.appendChild(chip);
        });
  
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(summary);
        card.appendChild(tags);
        card.addEventListener("click", () => {
          selectedCharacterId = character.id;
          ui.lockChoice.disabled = !relayOnline;
          ui.yourChoice.textContent = `${character.name} (${character.version})`;
          renderCharacterGrid();
        });
        ui.characterGrid.appendChild(card);
      });
    };
  
    const updateSelectionDisplay = (selectionMap) => {
      if (!characterMap.size) {
        ensureCharacters().then(() => updateSelectionDisplay(selectionMap));
        return;
      }
      const yours = selectionMap[clientId];
      const opponentId = lobby ? lobby.players.find((player) => player.id !== clientId)?.id : null;
      const theirs = opponentId ? selectionMap[opponentId] : null;
  
      if (yours) ui.yourChoice.textContent = formatCharacterName(yours);
      if (theirs) ui.opponentChoice.textContent = formatCharacterName(theirs);
    };
  
    ui.retryConnect.addEventListener("click", connect);
  
    ui.nameInput.addEventListener("input", () => {
      ui.nameContinue.disabled = !ui.nameInput.value.trim();
    });
  
    ui.nameContinue.addEventListener("click", () => {
      playerName = ui.nameInput.value.trim();
      if (!playerName) return;
      storage.setItem("ua-game-player-name", playerName);
      connect();
      sendHello();
      setStage("lobby-choice");
    });
  
    ui.createLobby.addEventListener("click", () => {
      if (!relayOnline) {
        addLocalLog("Relay not connected.");
        return;
      }
      sendMessage("create_lobby", { clientId });
    });

    ui.joinLobby.addEventListener("click", () => {
      if (!relayOnline) {
        addLocalLog("Relay not connected.");
        return;
      }
      const code = ui.joinCode.value.trim().toUpperCase();
      if (!code) return;
      sendMessage("join_lobby", { clientId, code });
    });
  
    ui.copyCode.addEventListener("click", async () => {
      const code = ui.lobbyCode.textContent.trim();
      if (!code) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
        addLocalLog("Lobby code copied.");
      }
    });
  
    ui.startMatch.addEventListener("click", () => {
      if (!isHost) return;
      if (!relayOnline) {
        addLocalLog("Relay not connected.");
        return;
      }
      sendMessage("lobby_event", { event: "start_match" });
    });

    ui.leaveLobby.addEventListener("click", () => {
      if (!relayOnline) {
        resetState();
        return;
      }
      sendMessage("leave_lobby", {});
      resetState();
    });

    ui.backLobby.addEventListener("click", () => {
      if (!isHost) return;
      if (!relayOnline) {
        addLocalLog("Relay not connected.");
        return;
      }
      sendMessage("lobby_event", { event: "return_to_lobby" });
      setStage("lobby");
    });

    ui.lockChoice.addEventListener("click", () => {
      if (!selectedCharacterId) return;
      if (!relayOnline) {
        addLocalLog("Relay not connected.");
        return;
      }
      sendMessage("game_event", { event: "select_character", data: { characterId: selectedCharacterId } });
      ui.lockChoice.disabled = true;
    });
  
    ui.pass.addEventListener("click", () => sendAction({ type: "pass" }));
    ui.end.addEventListener("click", () => sendAction({ type: "end" }));
    ui.clearLog.addEventListener("click", () => sendAction({ type: "clear_log" }));
  
    setStage("identity");
    connect();
    ensureCharacters();
    teardown = () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  };

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(init);
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
