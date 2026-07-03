const teams = {
  canada: { id: "canada", name: "加拿大", short: "加" },
  south_africa: { id: "south_africa", name: "南非", short: "南" },
  morocco: { id: "morocco", name: "摩洛哥", short: "摩" },
  netherlands: { id: "netherlands", name: "荷兰", short: "荷" },
  paraguay: { id: "paraguay", name: "巴拉圭", short: "巴" },
  germany: { id: "germany", name: "德国", short: "德" },
  france: { id: "france", name: "法国", short: "法" },
  sweden: { id: "sweden", name: "瑞典", short: "瑞" },
  spain: { id: "spain", name: "西班牙", short: "西" },
  austria: { id: "austria", name: "奥地利", short: "奥" },
  portugal: { id: "portugal", name: "葡萄牙", short: "葡" },
  croatia: { id: "croatia", name: "克罗地亚", short: "克" },
  belgium: { id: "belgium", name: "比利时", short: "比" },
  senegal: { id: "senegal", name: "塞内加尔", short: "塞" },
  usa: { id: "usa", name: "美国", short: "美" },
  bosnia: { id: "bosnia", name: "波黑", short: "波" },
  brazil: { id: "brazil", name: "巴西", short: "巴" },
  japan: { id: "japan", name: "日本", short: "日" },
  norway: { id: "norway", name: "挪威", short: "挪" },
  ivory_coast: { id: "ivory_coast", name: "科特迪瓦", short: "科" },
  mexico: { id: "mexico", name: "墨西哥", short: "墨" },
  ecuador: { id: "ecuador", name: "厄瓜多尔", short: "厄" },
  england: { id: "england", name: "英格兰", short: "英" },
  dr_congo: { id: "dr_congo", name: "刚果民主共和国", short: "刚" },
  australia: { id: "australia", name: "澳大利亚", short: "澳" },
  egypt: { id: "egypt", name: "埃及", short: "埃" },
  argentina: { id: "argentina", name: "阿根廷", short: "阿" },
  cabo_verde: { id: "cabo_verde", name: "佛得角", short: "佛" },
  switzerland: { id: "switzerland", name: "瑞士", short: "瑞" },
  algeria: { id: "algeria", name: "阿尔及利亚", short: "阿" },
  colombia: { id: "colombia", name: "哥伦比亚", short: "哥" },
  ghana: { id: "ghana", name: "加纳", short: "加" }
};

const matches = {
  m73: { id: "m73", label: "", round: "left-r32", teams: ["canada", "south_africa"], feeds: "m89" },
  m74: { id: "m74", label: "", round: "left-r32", teams: ["morocco", "netherlands"], feeds: "m89" },
  m75: { id: "m75", label: "", round: "left-r32", teams: ["paraguay", "germany"], feeds: "m90" },
  m76: { id: "m76", label: "", round: "left-r32", teams: ["france", "sweden"], feeds: "m90" },
  m77: { id: "m77", label: "", round: "left-r32", teams: ["spain", "austria"], feeds: "m93" },
  m78: { id: "m78", label: "", round: "left-r32", teams: ["portugal", "croatia"], feeds: "m93" },
  m79: { id: "m79", label: "", round: "left-r32", teams: ["belgium", "senegal"], feeds: "m94" },
  m80: { id: "m80", label: "", round: "left-r32", teams: ["usa", "bosnia"], feeds: "m94" },
  m81: { id: "m81", label: "", round: "right-r32", teams: ["brazil", "japan"], feeds: "m91" },
  m82: { id: "m82", label: "", round: "right-r32", teams: ["norway", "ivory_coast"], feeds: "m91" },
  m83: { id: "m83", label: "", round: "right-r32", teams: ["mexico", "ecuador"], feeds: "m92" },
  m84: { id: "m84", label: "", round: "right-r32", teams: ["england", "dr_congo"], feeds: "m92" },
  m85: { id: "m85", label: "", round: "right-r32", teams: ["australia", "egypt"], feeds: "m95" },
  m86: { id: "m86", label: "", round: "right-r32", teams: ["argentina", "cabo_verde"], feeds: "m95" },
  m87: { id: "m87", label: "", round: "right-r32", teams: ["switzerland", "algeria"], feeds: "m96" },
  m88: { id: "m88", label: "", round: "right-r32", teams: ["colombia", "ghana"], feeds: "m96" },
  m89: { id: "m89", label: "", round: "left-r16", sources: ["m73", "m74"], feeds: "m97" },
  m90: { id: "m90", label: "", round: "left-r16", sources: ["m75", "m76"], feeds: "m97" },
  m93: { id: "m93", label: "", round: "left-r16", sources: ["m77", "m78"], feeds: "m98" },
  m94: { id: "m94", label: "", round: "left-r16", sources: ["m79", "m80"], feeds: "m98" },
  m91: { id: "m91", label: "", round: "right-r16", sources: ["m81", "m82"], feeds: "m99" },
  m92: { id: "m92", label: "", round: "right-r16", sources: ["m83", "m84"], feeds: "m99" },
  m95: { id: "m95", label: "", round: "right-r16", sources: ["m85", "m86"], feeds: "m100" },
  m96: { id: "m96", label: "", round: "right-r16", sources: ["m87", "m88"], feeds: "m100" },
  m97: { id: "m97", label: "", round: "left-qf", sources: ["m89", "m90"], feeds: "m101" },
  m98: { id: "m98", label: "", round: "left-qf", sources: ["m93", "m94"], feeds: "m101" },
  m99: { id: "m99", label: "", round: "right-qf", sources: ["m91", "m92"], feeds: "m102" },
  m100: { id: "m100", label: "", round: "right-qf", sources: ["m95", "m96"], feeds: "m102" },
  m101: { id: "m101", label: "", round: "left-sf", sources: ["m97", "m98"], feeds: "m103" },
  m102: { id: "m102", label: "", round: "right-sf", sources: ["m99", "m100"], feeds: "m103" },
  m103: { id: "m103", label: "", round: "final", sources: ["m101", "m102"], feeds: "champion" }
};

const rounds = {
  "left-r32": ["m73", "m74", "m75", "m76", "m77", "m78", "m79", "m80"],
  "left-r16": ["m89", "m90", "m93", "m94"],
  "left-qf": ["m97", "m98"],
  "left-sf": ["m101"],
  "right-r32": ["m81", "m82", "m83", "m84", "m85", "m86", "m87", "m88"],
  "right-r16": ["m91", "m92", "m95", "m96"],
  "right-qf": ["m99", "m100"],
  "right-sf": ["m102"],
  final: ["m103"]
};

const initialWinners = {};

const state = {
  winners: { ...initialWinners },
  savedScenarios: [],
  dragging: null
};

const boardTargets = {
  "left-r32": document.querySelector("#round-left-r32"),
  "left-r16": document.querySelector("#round-left-r16"),
  "left-qf": document.querySelector("#round-left-qf"),
  "left-sf": document.querySelector("#round-left-sf"),
  "right-r32": document.querySelector("#round-right-r32"),
  "right-r16": document.querySelector("#round-right-r16"),
  "right-qf": document.querySelector("#round-right-qf"),
  "right-sf": document.querySelector("#round-right-sf"),
  final: document.querySelector("#round-final")
};

const championTarget = document.querySelector("#champion-slot");
const saveButton = document.querySelector("#save-scenario");
const resetButton = document.querySelector("#reset-board");
const nameInput = document.querySelector("#scenario-name");
const savedList = document.querySelector("#saved-scenarios");
const savedCount = document.querySelector("#saved-count");
const currentSummary = document.querySelector("#current-summary");
const mediaQuery = window.matchMedia("(max-width: 1180px)");
let boardBuilt = false;

function getParticipants(matchId) {
  const match = matches[matchId];
  if (match.teams) {
    return match.teams.map((teamId) => teams[teamId]);
  }

  return match.sources.map((sourceId) => {
    const winnerId = state.winners[sourceId];
    return winnerId ? teams[winnerId] : null;
  });
}

function createTeamCard(team, sourceMatchId) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "team-card";
  card.draggable = true;
  card.dataset.teamId = team.id;
  card.dataset.sourceMatchId = sourceMatchId;

  card.innerHTML = `
    <span class="team-main">
      <span class="team-badge">${team.short}</span>
      <span class="team-name">${team.name}</span>
    </span>
  `;

  // Prevent focus-driven viewport jumps on click while keeping the element clickable.
  card.addEventListener("mousedown", (event) => {
    event.preventDefault();
  });

  card.addEventListener("click", () => {
    setWinner(sourceMatchId, team.id);
  });

  card.addEventListener("dragstart", (event) => {
    state.dragging = { teamId: team.id, sourceMatchId };
    card.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", JSON.stringify(state.dragging));
  });

  card.addEventListener("dragend", () => {
    state.dragging = null;
    card.classList.remove("dragging");
    clearDropHighlights();
  });

  return card;
}

function createEmptyCard(text) {
  const empty = document.createElement("div");
  empty.className = "empty-card";
  empty.textContent = text || "";
  return empty;
}

function clearDropHighlights() {
  document.querySelectorAll(".team-slot").forEach((slot) => slot.classList.remove("drop-target"));
}

function isValidDrop(expectedSourceId, droppedSourceId) {
  return expectedSourceId === droppedSourceId;
}

function createAdvancementSlot(currentMatchId, expectedSourceId) {
  const slot = document.createElement("div");
  slot.className = "team-slot";
  slot.dataset.expectedSourceId = expectedSourceId;

  const teamId = state.winners[expectedSourceId];
  if (teamId) {
    slot.appendChild(createTeamCard(teams[teamId], currentMatchId));
  } else {
    slot.appendChild(createEmptyCard(""));
  }

  slot.addEventListener("dragover", (event) => {
    const dragging = state.dragging;
    if (!dragging || !isValidDrop(expectedSourceId, dragging.sourceMatchId)) {
      return;
    }

    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    slot.classList.add("drop-target");
  });

  slot.addEventListener("dragleave", () => {
    slot.classList.remove("drop-target");
  });

  slot.addEventListener("drop", (event) => {
    const payload = state.dragging || JSON.parse(event.dataTransfer.getData("text/plain"));
    slot.classList.remove("drop-target");

    if (!payload || !isValidDrop(expectedSourceId, payload.sourceMatchId)) {
      return;
    }

    event.preventDefault();
    setWinner(expectedSourceId, payload.teamId);
  });

  return slot;
}

function setWinner(matchId, teamId) {
  state.winners[matchId] = teamId;
  clearInvalidDescendants(matchId);
  refreshInteractiveBoard();
}

function clearInvalidDescendants(changedMatchId) {
  const impactedMatches = Object.values(matches)
    .filter((match) => match.sources && match.sources.includes(changedMatchId))
    .map((match) => match.id);

  impactedMatches.forEach((matchId) => {
    const participants = getParticipants(matchId)
      .filter(Boolean)
      .map((team) => team.id);

    if (state.winners[matchId] && !participants.includes(state.winners[matchId])) {
      delete state.winners[matchId];
      clearInvalidDescendants(matchId);
    }
  });

  const finalParticipants = getParticipants("m103")
    .filter(Boolean)
    .map((team) => team.id);

  if (state.winners.m103 && !finalParticipants.includes(state.winners.m103)) {
    delete state.winners.m103;
  }
}

function renderMatch(matchId) {
  const match = matches[matchId];
  const card = document.createElement("article");
  card.className = "match-card";
  card.dataset.matchId = matchId;
  card.innerHTML = match.label
    ? `<p class="match-title">${match.label}</p>`
    : `<p class="match-title ghost-title">.</p>`;

  const slots = document.createElement("div");
  slots.className = "match-slots";
  card.appendChild(slots);
  updateMatchSlots(card, matchId);
  return card;
}

function updateMatchSlots(card, matchId) {
  const match = matches[matchId];
  const slots = card.querySelector(".match-slots");
  slots.innerHTML = "";

  if (match.teams) {
    match.teams.forEach((teamId) => {
      const slot = document.createElement("div");
      slot.className = "team-slot";
      slot.appendChild(createTeamCard(teams[teamId], matchId));
      slots.appendChild(slot);
    });
    return;
  }

  match.sources.forEach((sourceId) => {
    slots.appendChild(createAdvancementSlot(matchId, sourceId));
  });
}

function renderChampionSlot() {
  championTarget.innerHTML = "";
  const championContainer = document.createElement("div");
  championContainer.className = "team-slot";

  const finalWinnerId = state.winners.m103;
  if (finalWinnerId) {
    championContainer.appendChild(createTeamCard(teams[finalWinnerId], "m103"));
  } else {
    championContainer.appendChild(createEmptyCard(""));
  }

  championContainer.addEventListener("dragover", (event) => {
    const dragging = state.dragging;
    if (!dragging || dragging.sourceMatchId !== "m103") {
      return;
    }

    event.preventDefault();
    championContainer.classList.add("drop-target");
  });

  championContainer.addEventListener("dragleave", () => {
    championContainer.classList.remove("drop-target");
  });

  championContainer.addEventListener("drop", (event) => {
    const payload = state.dragging || JSON.parse(event.dataTransfer.getData("text/plain"));
    championContainer.classList.remove("drop-target");

    if (!payload || payload.sourceMatchId !== "m103") {
      return;
    }

    event.preventDefault();
    setWinner("m103", payload.teamId);
  });

  championTarget.appendChild(championContainer);
}

function renderSummary() {
  const champion = state.winners.m103 ? teams[state.winners.m103].name : "尚未预测";
  const selectedCount = Object.keys(state.winners).length;
  currentSummary.textContent = `当前已确定 ${selectedCount} 场比赛的胜者，冠军：${champion}`;
}

function renderSavedScenarios() {
  savedList.innerHTML = "";
  savedCount.textContent = `${state.savedScenarios.length} 个方案`;

  if (!state.savedScenarios.length) {
    const empty = document.createElement("div");
    empty.className = "empty-saved";
    empty.textContent = "还没有保存的竞猜结果，先拖或点一条晋级路线试试。";
    savedList.appendChild(empty);
    return;
  }

  state.savedScenarios.forEach((scenario) => {
    const champion = scenario.winners.m103 ? teams[scenario.winners.m103].name : "未选冠军";
    const item = document.createElement("article");
    item.className = "saved-item";
    item.innerHTML = `
      <h4>${scenario.name}</h4>
      <p class="saved-meta">${scenario.savedAt}</p>
      <p class="saved-champion">冠军预测：${champion}</p>
    `;

    const actions = document.createElement("div");
    actions.className = "saved-actions";

    const loadButton = document.createElement("button");
    loadButton.type = "button";
    loadButton.className = "mini-btn";
    loadButton.textContent = "载入";
    loadButton.addEventListener("click", () => {
      state.winners = { ...scenario.winners };
      nameInput.value = scenario.name;
      refreshInteractiveBoard();
    });

    actions.append(loadButton);
    item.appendChild(actions);
    savedList.appendChild(item);
  });
}

function buildBoardOnce() {
  Object.entries(boardTargets).forEach(([roundId, container]) => {
    container.innerHTML = "";
    container.style.height = "";
    rounds[roundId].forEach((matchId) => {
      container.appendChild(renderMatch(matchId));
    });
  });
  boardBuilt = true;
}

function refreshInteractiveBoard() {
  if (!boardBuilt) {
    buildBoardOnce();
  } else {
    Object.entries(boardTargets).forEach(([roundId, container]) => {
      rounds[roundId].forEach((matchId) => {
        const card = container.querySelector(`[data-match-id="${matchId}"]`);
        if (card) {
          updateMatchSlots(card, matchId);
        }
      });
    });
  }

  renderChampionSlot();
  renderSummary();
  applyBracketLayout();
}

function render() {
  refreshInteractiveBoard();
  renderSavedScenarios();
}

function applyBracketLayout() {
  if (mediaQuery.matches) {
    document.body.classList.remove("desktop-bracket");
    Object.values(boardTargets).forEach((container) => {
      container.style.height = "";
      Array.from(container.children).forEach((card) => {
        card.style.top = "";
      });
    });
    return;
  }

  document.body.classList.add("desktop-bracket");
  positionBaseRound("left-r32");
  positionBaseRound("right-r32");

  positionRoundFromSources("left-r16");
  positionRoundFromSources("right-r16");
  positionRoundFromSources("left-qf");
  positionRoundFromSources("right-qf");
  positionRoundFromSources("left-sf");
  positionRoundFromSources("right-sf");
  positionRoundFromSources("final");
}

function positionBaseRound(roundId) {
  const container = boardTargets[roundId];
  const cards = Array.from(container.children);
  let top = 0;
  const gap = 16;

  cards.forEach((card) => {
    card.style.top = `${top}px`;
    top += card.offsetHeight + gap;
  });

  container.style.height = `${Math.max(0, top - gap)}px`;
}

function positionRoundFromSources(roundId) {
  const container = boardTargets[roundId];
  const roundMatchIds = rounds[roundId];
  const gap = 16;
  let bottom = 0;

  roundMatchIds.forEach((matchId) => {
    const card = container.querySelector(`[data-match-id="${matchId}"]`);
    const sourceCenters = matches[matchId].sources.map(getMatchCenterY);
    const targetTop = ((sourceCenters[0] + sourceCenters[1]) / 2) - (card.offsetHeight / 2);
    card.style.top = `${targetTop}px`;
    bottom = Math.max(bottom, targetTop + card.offsetHeight);
  });

  container.style.height = `${bottom + gap}px`;
}

function getMatchCenterY(matchId) {
  const sourceMatch = matches[matchId];
  const sourceContainer = boardTargets[sourceMatch.round];
  const sourceCard = sourceContainer.querySelector(`[data-match-id="${matchId}"]`);
  const top = parseFloat(sourceCard.style.top || "0");
  return top + (sourceCard.offsetHeight / 2);
}

function persistScenarios() {
  return fetch("/api/scenarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(state.savedScenarios[0])
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error("Failed to save scenario");
    }

    const savedScenario = await response.json();
    state.savedScenarios[0] = savedScenario;
    return savedScenario;
  });
}

async function loadScenarios() {
  try {
    const response = await fetch("/api/scenarios", {
      headers: {
        Accept: "application/json"
      }
    });
    state.savedScenarios = response.ok ? await response.json() : [];
  } catch (error) {
    state.savedScenarios = [];
  }
}

function formatNow() {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date());
}

async function saveScenario() {
  const scenarioName = nameInput.value.trim() || `竞猜方案 ${state.savedScenarios.length + 1}`;
  const snapshot = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    name: scenarioName,
    savedAt: formatNow(),
    winners: { ...state.winners }
  };

  state.savedScenarios.unshift(snapshot);
  try {
    await persistScenarios();
    nameInput.value = scenarioName;
    renderSavedScenarios();
  } catch (error) {
    state.savedScenarios.shift();
  }
}

function resetBoard() {
  state.winners = { ...initialWinners };
  refreshInteractiveBoard();
}

saveButton.addEventListener("click", saveScenario);
resetButton.addEventListener("click", resetBoard);
window.addEventListener("resize", () => requestAnimationFrame(applyBracketLayout));

loadScenarios().finally(render);
