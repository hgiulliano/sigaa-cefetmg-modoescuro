/*
 * popup.js — SIGAA Dark Mode
 * Controla o toggle do popup e persiste estado via chrome.storage
 */

const STORAGE_KEY = 'sigaa_dark_enabled';
const toggle  = document.getElementById('darkToggle');
const badge   = document.getElementById('statusBadge');

function updateBadge(enabled) {
  if (enabled) {
    badge.textContent = '● ATIVO — tema aplicado';
    badge.className = 'status on';
  } else {
    badge.textContent = '○ INATIVO — tema desligado';
    badge.className = 'status off';
  }
}

/* Carregar estado atual */
chrome.storage.local.get([STORAGE_KEY], (result) => {
  const enabled = result[STORAGE_KEY] !== false;
  toggle.checked = enabled;
  updateBadge(enabled);
});

/* Toggle */
toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ [STORAGE_KEY]: enabled });
  updateBadge(enabled);

  /* Notificar todas as abas abertas do SIGAA */
  chrome.tabs.query({ url: ['https://sig.cefetmg.br/sigaa/*', 'https://sigaa.cefetmg.br/*'] }, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, { type: 'TOGGLE_DARK', enabled }).catch(() => {});
    });
  });
});
