/*
  Project: Dev Refresh
  Description: App logic for the home, list, card, and quick match screens
  Author: Dominique Thomas (github.com/dominique-thomas)
  License: Shared publicly for demonstration purposes only. Reuse or redistribution not permitted without permission.
*/

import { CATEGORIES, CARDS } from "./cards.js";

//----------------------------------
//  Global Variables
//----------------------------------

const STORAGE_KEY = "devRefresh.progress";
const MATCH_LENGTH = 5;
const MATCH_MIN_SEEN = 4;

const ICON_CHEVRON = `<svg class="icon-muted" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>`;
const ICON_BACK = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg>`;
const ICON_STAR = `<svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" aria-hidden="true"><path d="M8 1.8l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6z"/></svg>`;
const ICON_STAR_FILLED = ICON_STAR.replace(`fill="none"`, `fill="currentColor"`);

const app = document.getElementById("app");

let progress = loadProgress();

// The set of cards that Back and Next move through
let deck = { ids: [], index: 0, source: "" };

// The quick match round in play, or null
let match = null;

let listFilter = "all";
let listFilterFor = "";
const listScroll = {};

//----------------------------------
//  Storage
//----------------------------------

// Read saved progress, falling back to empty if storage is unavailable
function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { seen: saved?.seen || {}, starred: saved?.starred || {} };
  } catch (error) {
    return { seen: {}, starred: {} };
  }
}

// Write progress to local storage
function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    // Progress still works for this visit, it just will not persist
  }
}

// Record that a card has been opened
function markSeen(id) {
  if (progress.seen[id]) return;
  progress.seen[id] = true;
  saveProgress();
}

// Flip the star on a card and return the new state
function toggleStar(id) {
  if (progress.starred[id]) {
    delete progress.starred[id];
  } else {
    progress.starred[id] = true;
  }
  saveProgress();
  return isStarred(id);
}

// Clear the seen marks for one category
function resetSeen(categoryId) {
  cardsIn(categoryId).forEach((card) => delete progress.seen[card.id]);
  saveProgress();
}

//----------------------------------
//  Helpers
//----------------------------------

// Check whether a card has been opened
function isSeen(id) {
  return Boolean(progress.seen[id]);
}

// Check whether a card is starred
function isStarred(id) {
  return Boolean(progress.starred[id]);
}

// Look up a card by id
function getCard(id) {
  return CARDS.find((card) => card.id === id);
}

// Look up a category by id
function getCategory(id) {
  return CATEGORIES.find((category) => category.id === id);
}

// Get every card in a category, in file order
function cardsIn(categoryId) {
  return CARDS.filter((card) => card.category === categoryId);
}

// Get the starred cards, in file order
function starredCards() {
  return CARDS.filter((card) => isStarred(card.id));
}

// Get the cards quick match can ask about
function matchPool() {
  return CARDS.filter((card) => isSeen(card.id) && card.scenarios?.length);
}

// Make text safe to place inside markup
function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;");
}

// Return a shuffled copy of an array
function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Pick a random card, favoring unseen ones and avoiding the current card
function pickRandomCard(excludeId) {
  const others = CARDS.filter((card) => card.id !== excludeId);
  const unseen = others.filter((card) => !isSeen(card.id));
  const pool = unseen.length ? unseen : others;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Set the cards that Back and Next move through, then open one
function openDeck(ids, index, source) {
  deck = { ids, index, source };
  location.hash = "#/card/" + ids[index];
}

//----------------------------------
//  Home Screen
//----------------------------------

// Build the home screen with the two actions and the category rows
function renderHome() {
  const canMatch = matchPool().length >= MATCH_MIN_SEEN;

  const rows = CATEGORIES.map((category) => {
    const cards = cardsIn(category.id);
    const seen = cards.filter((card) => isSeen(card.id)).length;
    return `
      <li>
        <a class="row" href="#/list/${category.id}">
          <span class="row-title">${escapeHtml(category.label)}</span>
          <span class="meta">${seen} / ${cards.length}</span>
          ${ICON_CHEVRON}
        </a>
      </li>`;
  }).join("");

  app.innerHTML = `
    <h1 class="visually-hidden" tabindex="-1">Dev Refresh</h1>
    <div class="home-actions">
      <button type="button" class="button button--primary" data-action="random">Random card</button>
      <button type="button" class="button button--outline" data-action="start-match" ${canMatch ? "" : "disabled"}>Quick match</button>
    </div>
    ${canMatch ? "" : `<p class="hint">Quick match unlocks once you have seen ${MATCH_MIN_SEEN} cards.</p>`}
    <nav aria-label="Categories">
      <ul>${rows}</ul>
    </nav>
    <a class="row row--boxed" href="#/list/starred">
      <span class="icon-accent">${ICON_STAR_FILLED}</span>
      <span class="row-title">Starred</span>
      <span class="meta">${starredCards().length}</span>
      ${ICON_CHEVRON}
    </a>`;
}

//----------------------------------
//  List Screen
//----------------------------------

// Build the list of cards for a category or for the starred set
function renderList(listId) {
  const isStarredList = listId === "starred";
  const cards = isStarredList ? starredCards() : cardsIn(listId);
  const label = isStarredList ? "Starred" : getCategory(listId).label;
  const seenCount = cards.filter((card) => isSeen(card.id)).length;

  if (listFilterFor !== listId) {
    listFilter = "all";
    listFilterFor = listId;
  }

  const shown = cards.filter((card) => {
    if (listFilter === "unseen") return !isSeen(card.id);
    if (listFilter === "starred") return isStarred(card.id);
    return true;
  });

  const rows = shown.map((card) => `
    <li>
      <button type="button" class="row" data-action="open-card" data-id="${card.id}">
        <span class="dot ${isSeen(card.id) ? "dot--seen" : ""}"></span>
        <span class="visually-hidden">${isSeen(card.id) ? "Seen." : "Not seen yet."}</span>
        <span class="row-title">${escapeHtml(card.title)}</span>
        ${isStarred(card.id) ? `<span class="icon-accent">${ICON_STAR_FILLED}</span><span class="visually-hidden">Starred.</span>` : ""}
      </button>
    </li>`).join("");

  const chips = ["all", "unseen", "starred"].map((filter) => `
    <button type="button" class="chip" data-action="filter" data-filter="${filter}" aria-pressed="${listFilter === filter}">
      ${filter[0].toUpperCase() + filter.slice(1)}
    </button>`).join("");

  let emptyMessage = "";
  if (!shown.length) {
    emptyMessage = isStarredList
      ? "Nothing starred yet. Tap the star on a card to save it here."
      : "No cards match this filter.";
  }

  app.innerHTML = `
    <div class="top-bar">
      <a class="back-link" href="#/">${ICON_BACK} Home</a>
    </div>
    <div class="title-row">
      <h1 class="page-title" tabindex="-1">${escapeHtml(label)}</h1>
      <span class="meta">${isStarredList ? cards.length + " saved" : seenCount + " of " + cards.length + " seen"}</span>
    </div>
    ${isStarredList ? "" : `<div class="chips">${chips}</div>`}
    ${emptyMessage ? `<p class="hint">${emptyMessage}</p>` : `<ul>${rows}</ul>`}
    ${!isStarredList && seenCount ? `<button type="button" class="text-button" data-action="reset-seen" data-id="${listId}">Reset this category</button>` : ""}`;
}

//----------------------------------
//  Card Screen
//----------------------------------

// Point the deck at a card that was opened directly, such as from a reload
function syncDeck(id) {
  if (deck.ids[deck.index] === id) return;
  const index = deck.ids.indexOf(id);
  if (index >= 0) {
    deck.index = index;
    return;
  }
  const card = getCard(id);
  const ids = cardsIn(card.category).map((item) => item.id);
  deck = { ids, index: ids.indexOf(id), source: card.category };
}

// Describe where the current card sits in its deck
function deckPosition() {
  if (deck.source === "random") return "Random";
  const prefix = deck.source === "starred" ? "Starred · " : "";
  return `${prefix}${deck.index + 1} of ${deck.ids.length}`;
}

// Build the demo area of a card: a live example, a good and bad pair, or nothing
function renderDemo(card) {
  if (card.compare) {
    return `
      <div class="compare">
        <figure class="compare-item">
          <figcaption class="compare-label compare-label--bad">Weaker</figcaption>
          <div class="demo">${card.compare.bad}</div>
        </figure>
        <figure class="compare-item">
          <figcaption class="compare-label compare-label--good">Stronger</figcaption>
          <div class="demo">${card.compare.good}</div>
        </figure>
      </div>`;
  }
  return card.demo ? `<div class="demo">${card.demo}</div>` : "";
}

// Build a single card with its bottom bar
function renderCard(id) {
  const card = getCard(id);
  syncDeck(id);
  markSeen(id);

  const isRandom = deck.source === "random";
  const backHref = isRandom ? "#/" : "#/list/" + deck.source;
  const backLabel = isRandom ? "Home" : "List";
  const atStart = deck.index === 0;
  const atEnd = !isRandom && deck.index === deck.ids.length - 1;
  const starred = isStarred(id);
  const example = renderDemo(card);


  app.innerHTML = `
    <div class="top-bar">
      <a class="back-link" href="${backHref}">${ICON_BACK} ${backLabel}</a>
      <span class="meta">${deckPosition()}</span>
    </div>
    <article class="card">
      <header class="card-header">
        <p class="card-tag">${escapeHtml(getCategory(card.category).label)}</p>
        <h1 class="card-title" tabindex="-1">${escapeHtml(card.title)}</h1>
      </header>
      <p class="card-summary">${escapeHtml(card.summary)}</p>

      <section class="example-section section">
        <h2 class="section-label">Example</h2>

        ${card.demo || card.compare || card.action
          ? `
            ${renderDemo(card)}

            ${card.action ? `
              <div class="demo-action">
                <button type="button"
                  class="button button--outline"
                  data-action="run-demo">
                  ${escapeHtml(card.action.label)}
                </button>
                <p id="demo-status" role="status"></p>
              </div>
            ` : ""}
          `
          : "<p>N/A</p>"
        }
      </section>

      <section class="code-section section">
        <h2 class="section-label">Code</h2> 
        ${card.code ? `<pre class="code"><code>${escapeHtml(card.code)}</code></pre>` : ""}
      </section>

      ${card.useCases ? `
        <section class="card-section section">
          <h2 class="section-label">Use Cases</h2>
          <p>${escapeHtml(card.useCases)}</p>
        </section>` : ""}

    </article>
    <div class="card-bar">
      <div class="card-bar-inner">
        <button type="button" class="button" data-action="prev" ${atStart ? "disabled" : ""}>Back</button>
        <button type="button" class="button star-button" data-action="star" aria-pressed="${starred}" aria-label="Star this card">${ICON_STAR}</button>
        <button type="button" class="button button--primary" data-action="next" ${atEnd ? "disabled" : ""}>Next</button>
      </div>
    </div>`;

    
}

// Run the demo button on the current card and show its result
async function runDemo() {
  const card = getCard(deck.ids[deck.index]);
  const status = document.getElementById("demo-status");
  try {
    const message = await card.action.run();
    status.textContent = message || "";
  } catch (error) {
    status.textContent = "That did not work in this browser.";
  }
}

//----------------------------------
//  Quick Match
//----------------------------------

// Build a new round of questions from the cards seen so far
function startMatch() {
  const pool = matchPool();
  const picked = shuffle(pool).slice(0, MATCH_LENGTH);

  const questions = picked.map((card) => {
    const others = shuffle(pool.filter((item) => item.id !== card.id)).slice(0, 3);
    return {
      cardId: card.id,
      scenario: card.scenarios[Math.floor(Math.random() * card.scenarios.length)],
      choices: shuffle([card, ...others]).map((item) => item.id),
      picked: null
    };
  });

  match = { questions, index: 0, correct: 0 };
}

// Build the current question, or the closing screen once the round is over
function renderMatch() {
  if (!match) {
    if (matchPool().length < MATCH_MIN_SEEN) {
      location.hash = "#/";
      return;
    }
    startMatch();
  }

  const total = match.questions.length;

  if (match.index >= total) {
    app.innerHTML = `
      <div class="top-bar">
        <a class="back-link" href="#/">${ICON_BACK} Home</a>
      </div>
      <h1 class="page-title" tabindex="-1">Round finished</h1>
      <p class="card-summary">You matched ${match.correct} of ${total}.</p>
      <div class="match-actions">
        <button type="button" class="button button--primary" data-action="match-again">Another round</button>
        <a class="button button--outline" href="#/" style="display: flex; align-items: center; justify-content: center">Home</a>
      </div>`;
    return;
  }

  const question = match.questions[match.index];
  const answered = question.picked !== null;
  const wasCorrect = question.picked === question.cardId;
  const isLast = match.index === total - 1;

  const choices = question.choices.map((id) => {
    let state = "";
    let note = "";
    if (answered && id === question.cardId) {
      state = "choice--correct";
      note = "Correct";
    } else if (answered && id === question.picked) {
      state = "choice--wrong";
      note = "Your pick";
    }
    return `
      <li>
        <button type="button" class="choice ${state}" data-action="pick" data-id="${id}" ${answered ? "disabled" : ""}>
          <span>${escapeHtml(getCard(id).title)}</span>
          ${note ? `<span class="choice-note">${note}</span>` : ""}
        </button>
      </li>`;
  }).join("");

  const feedback = answered ? `
    <div class="match-feedback" role="status">
      <p>${wasCorrect ? "That is the one." : "Not this time. It was " + escapeHtml(getCard(question.cardId).title) + "."}</p>
      <div class="match-actions">
        <button type="button" class="button button--outline" data-action="open-from-match" data-id="${question.cardId}">Open the card</button>
        <button type="button" class="button button--primary" data-action="match-next">${isLast ? "Finish" : "Next question"}</button>
      </div>
    </div>` : "";

  app.innerHTML = `
    <div class="top-bar">
      <a class="back-link" href="#/">${ICON_BACK} Home</a>
      <span class="meta">Question ${match.index + 1} of ${total}</span>
    </div>
    <p class="section-label">Which card fits?</p>
    <h1 class="match-prompt" tabindex="-1">${escapeHtml(question.scenario)}</h1>
    <ul class="choices">${choices}</ul>
    ${feedback}`;
}

//----------------------------------
//  Routing
//----------------------------------

// Read the address and show the matching screen
function render() {
  const [view, rawParam] = location.hash.replace(/^#\/?/, "").split("/");
  const param = decodeURIComponent(rawParam || "");

  if (view === "list" && (param === "starred" || getCategory(param))) {
    renderList(param);
    window.scrollTo(0, listScroll[param] || 0);
  } else if (view === "card" && getCard(param)) {
    renderCard(param);
    window.scrollTo(0, 0);
  } else if (view === "match") {
    renderMatch();
    window.scrollTo(0, 0);
  } else {
    renderHome();
    window.scrollTo(0, 0);
  }

  app.querySelector("h1")?.focus({ preventScroll: true });
}

//----------------------------------
//  Event Listeners
//----------------------------------

// Handle every tap on a control that carries a data-action
function handleAction(event) {
  const control = event.target.closest("[data-action]");
  if (!control) return;

  const action = control.dataset.action;
  const id = control.dataset.id;

  if (action === "random") {
    openDeck([pickRandomCard().id], 0, "random");
  } else if (action === "start-match") {
    match = null;
    location.hash = "#/match";
  } else if (action === "open-card") {
    const ids = [...app.querySelectorAll("[data-action='open-card']")].map((row) => row.dataset.id);
    listScroll[listFilterFor] = window.scrollY;
    openDeck(ids, ids.indexOf(id), listFilterFor);
  } else if (action === "filter") {
    listFilter = control.dataset.filter;
    renderList(listFilterFor);
  } else if (action === "reset-seen") {
    resetSeen(id);
    renderList(id);
  } else if (action === "prev") {
    openDeck(deck.ids, deck.index - 1, deck.source);
  } else if (action === "next") {
    if (deck.source === "random" && deck.index === deck.ids.length - 1) {
      deck.ids.push(pickRandomCard(deck.ids[deck.index]).id);
    }
    openDeck(deck.ids, deck.index + 1, deck.source);
  } else if (action === "star") {
    control.setAttribute("aria-pressed", toggleStar(deck.ids[deck.index]));
  } else if (action === "run-demo") {
    runDemo();
  } else if (action === "pick") {
    const question = match.questions[match.index];
    question.picked = id;
    if (id === question.cardId) match.correct++;
    renderMatch();
  } else if (action === "match-next") {
    match.index++;
    render();
  } else if (action === "match-again") {
    startMatch();
    render();
  } else if (action === "open-from-match") {
    const ids = cardsIn(getCard(id).category).map((card) => card.id);
    openDeck(ids, ids.indexOf(id), getCard(id).category);
  }
}

// Keep demo forms from reloading the page, while letting dialogs close
function handleSubmit(event) {
  if (event.target.method !== "dialog") event.preventDefault();
}

app.addEventListener("click", handleAction);
app.addEventListener("submit", handleSubmit);
window.addEventListener("hashchange", render);

//----------------------------------
//  Initialization
//----------------------------------

render();
