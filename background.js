/*
 * background.js — Service Worker (MV3)
 * Gerencia estado global da extensão
 */

chrome.runtime.onInstalled.addListener(() => {
  // Ativar dark mode por padrão na instalação
  chrome.storage.local.set({ sigaa_dark_enabled: true });
});
