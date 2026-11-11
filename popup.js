/*
 * popup.js — SIGAA Dark Mode
 * Controla o toggle de liga/desligar, a escolha de tema, e persiste ambos
 * via chrome.storage. Funciona no Chrome e no Firefox.
 *
 * O popup NÃO avisa as abas: ele só grava a preferência. O content.js escuta
 * `storage.onChanged` e aplica na hora em cada aba. Por isso não precisamos de
 * `tabs.query` nem `tabs.sendMessage` — que são APIs de coleta de dados e
 * exigiriam permissões extras (a AMO passou a exigir
 * `data_collection_permissions` desde 2025).
 */

/* `browser` so existe no Firefox (API baseada em Promise). */
const API = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;

const STORAGE_KEY   = 'sigaa_dark_enabled';
const THEME_KEY     = 'sigaa_dark_tema';
const DEFAULT_THEME = 'deep-dark';

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
});

/* ── escolha de tema ──────────────────────────────────────────────────────── */
themeBtns.forEach((btn) => {
  btn.addEventListener('click', async () => {
    const theme = btn.dataset.tema;
    try { await API.storage.local.set({ [THEME_KEY]: theme }); } catch (_) {}
    markTheme(theme);
  });
});
