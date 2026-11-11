/*
 * background.js — Service Worker (MV3)
 * Ativa o modo escuro por padrao na primeira instalacao, sem sobrescrever
 * a preferencia de quem ja o desligou.
 * Funciona no Chrome e no Firefox.
 */

const API = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;

API.runtime.onInstalled.addListener(async (details) => {
  if (details.reason !== 'install') return;
  try {
    const result = await API.storage.local.get(['sigaa_dark_enabled']);
    if (result.sigaa_dark_enabled === undefined) {
      await API.storage.local.set({ sigaa_dark_enabled: true });
    }
  } catch (_) { /* storage indisponivel: o content.js assume o padrao */ }
});
