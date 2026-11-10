/*
 * popup.js — SIGAA Dark Mode
 * Controla o toggle de liga/desliga, a escolha de tema, e persiste ambos
 * via chrome.storage.
 */

const STORAGE_KEY   = 'sigaa_dark_enabled';
const THEME_KEY     = 'sigaa_dark_tema';
const DEFAULT_THEME = 'deep-dark';

const toggle  = document.getElementById('darkToggle');
const badge   = document.getElementById('statusBadge');
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

/* ── manda o tema para todas as abas do SIGAA abertas ─────────────────────── */
function pushThemeToTabs(theme) {
  chrome.tabs.query(
    { url: ['https://sig.cefetmg.br/sigaa/*', 'https://sig.cefetmg.br/*', 'https://sigaa.cefetmg.br/*'] },
    (tabs) => {
      for (const tab of tabs) {
        chrome.tabs.sendMessage(tab.id, { type: 'SET_THEME', theme }, () => {
          void chrome.runtime.lastError;  // abas sem content script, ignorar
        });
      }
    }
  );
}

/* ── estado atual ─────────────────────────────────────────────────────────── */
chrome.storage.local.get([STORAGE_KEY, THEME_KEY], (result) => {
  toggle.checked = result[STORAGE_KEY] !== false;
  updateBadge(toggle.checked);
  markTheme(result[THEME_KEY]);
});

/* ── toggle liga/desliga ──────────────────────────────────────────────────── */
toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ [STORAGE_KEY]: enabled });
  updateBadge(enabled);

  chrome.tabs.query(
    { url: ['https://sig.cefetmg.br/sigaa/*', 'https://sig.cefetmg.br/*', 'https://sigaa.cefetmg.br/*'] },
    (tabs) => {
      for (const tab of tabs) {
        chrome.tabs.sendMessage(tab.id, { type: 'TOGGLE_DARK', enabled }, () => {
          void chrome.runtime.lastError;
        });
      }
    }
  );
});

/* ── escolha de tema ──────────────────────────────────────────────────────── */
themeBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.tema;

    chrome.storage.local.set({ [THEME_KEY]: theme });
    markTheme(theme);
    pushThemeToTabs(theme);
  });
});
