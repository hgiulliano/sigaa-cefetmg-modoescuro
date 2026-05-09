/*
 * content.js — SIGAA Dark Mode
 * Gerencia estado do dark mode e aplica tema em conteúdo dinâmico (Ajax/JSF)
 */

const STORAGE_KEY = 'sigaa_dark_enabled';
const CLASS_DARK   = 'sigaa-dark-mode';

/* ── Injetar classe no <html> para controle via CSS se necessário ── */
function applyTheme(enabled) {
  if (enabled !== false) {
    document.documentElement.classList.add(CLASS_DARK);
  } else {
    document.documentElement.classList.remove(CLASS_DARK);
    // Remove o stylesheet injetado se desligado
    const link = document.getElementById('sigaa-dark-css');
    if (link) link.disabled = true;
  }
}

/* ── Verificar preferência salva ── */
chrome.storage.local.get([STORAGE_KEY], (result) => {
  const enabled = result[STORAGE_KEY] !== false; // padrão: ligado
  applyTheme(enabled);
});

/* ── Ouvir mensagens do popup ── */
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'TOGGLE_DARK') {
    applyTheme(msg.enabled);
    // Reabilitar CSS se necessário
    const link = document.getElementById('sigaa-dark-css');
    if (link && msg.enabled) link.disabled = false;
  }
});

/* ── Observar mudanças dinâmicas (rich:ajaxSingle, etc.) ── */
const observer = new MutationObserver((mutations) => {
  for (const m of mutations) {
    m.addedNodes.forEach((node) => {
      if (node.nodeType !== 1) return;
      // Re-aplicar estilos inline que o JSF pode sobrescrever
      const inlines = node.querySelectorAll?.('[style*="background-color: white"],[style*="background: white"],[style*="color: black"]');
      inlines?.forEach((el) => {
        el.style.removeProperty('background-color');
        el.style.removeProperty('background');
        el.style.removeProperty('color');
      });
    });
  }
});

observer.observe(document.documentElement, {
  childList: true,
  subtree:   true,
});
