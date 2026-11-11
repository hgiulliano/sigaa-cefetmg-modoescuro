/*
 * popup.js — SIGAA Dark Mode
 * Controla o toggle de liga/desligar, a escolha de tema, e persiste ambos
 * via chrome.storage. Funciona no Chrome e no Firefox.
 */

/* `browser` so existe no Firefox (API baseada em Promise). */
const API = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;

const STORAGE_KEY   = 'sigaa_dark_enabled';
const THEME_KEY     = 'sigaa_dark_tema';
const DEFAULT_THEME = 'deep-dark';
const URL_PATTERNS  = [
  'https://sig.cefetmg.br/sigaa/*',
  'https://sigaa.cefetmg.br/*'
];

const toggle    = document.getElementById('darkToggle');
const badge     = document.getElementById('statusBadge');
const themeBtns = [...document.querySelectorAll('.theme-btn')];

/* ── badge do toggle ──────────────────────────────────────────────────────── */
function updateBadge(enabled) {
  if (enabled) {
    badge.textContent = '● ATIVO — tema aplicado';
    badge.className = 'status on';
  } else {
    badge.textContent = '○ INATIVO — tema desligado';
    badge.className = 'status off';
  }
}

/* ── marca o tema selecionado no seletor ──────────────────────────────────── */
function markTheme(theme) {
  const t = theme || DEFAULT_THEME;
  themeBtns.forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.tema === t));
  });
}

/* ── manda uma mensagem para todas as abas do SIGAA abertas ───────────────── */
async function pushToTabs(payload) {
  try {
    const tabs = await API.tabs.query({ url: URL_PATTERNS });
    for (const tab of tabs) {
      try { await API.tabs.sendMessage(tab.id, payload); } catch (_) { /* aba sem content script */ }
    }
  } catch (_) { /* sem abas compativeis */ }
}

/* ── estado atual ─────────────────────────────────────────────────────────── */
(async () => {
  try {
    const result = await API.storage.local.get([STORAGE_KEY, THEME_KEY]);
    toggle.checked = result[STORAGE_KEY] !== false;
    updateBadge(toggle.checked);
    markTheme(result[THEME_KEY]);
  } catch (_) { /* mantem o que esta no HTML */ }
})();

/* ── toggle liga/desliga ──────────────────────────────────────────────────── */
toggle.addEventListener('change', async () => {
  const enabled = toggle.checked;
  try { await API.storage.local.set({ [STORAGE_KEY]: enabled }); } catch (_) {}
  updateBadge(enabled);
  pushToTabs({ type: 'TOGGLE_DARK', enabled });
});

/* ── escolha de tema ──────────────────────────────────────────────────────── */
themeBtns.forEach((btn) => {
  btn.addEventListener('click', async () => {
    const theme = btn.dataset.tema;
    try { await API.storage.local.set({ [THEME_KEY]: theme }); } catch (_) {}
    markTheme(theme);
    pushToTabs({ type: 'SET_THEME', theme });
  });
});
