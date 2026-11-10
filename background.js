/*
 * background.js — Service Worker (MV3)
 */

/* Na primeira instalação, liga o modo escuro por padrão.
   Em atualizações o valor existente é preservado (não sobrescreve a
   preferência de quem desligou o tema). */
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.storage.local.get(['sigaa_dark_enabled'], (result) => {
      if (result.sigaa_dark_enabled === undefined) {
        chrome.storage.local.set({ sigaa_dark_enabled: true });
      }
    });
  }
});
