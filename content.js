/*
 * content.js — SIGAA Dark Mode
 * Coloca/remove a classe `sigaa-dark-mode` e o atributo `data-sd-tema` no
 * <html>. Todo o CSS do tema é escopado nessa classe (ver style.css), então é
 * assim que o toggle do popup liga/desliga o tema de verdade, sem recarregar.
 */

const STORAGE_KEY   = 'sigaa_dark_enabled';
const THEME_KEY     = 'sigaa_dark_tema';
const CLASS_DARK    = 'sigaa-dark-mode';
const ATTR_TEMA     = 'data-sd-tema';
const DEFAULT_THEME = 'deep-dark';

/* Aplica o tema imediatamente. Roda em document_start, antes da primeira
   pintura, para não haver piscada de tema claro. */
function applyTheme(enabled) {
  document.documentElement.classList.toggle(CLASS_DARK, enabled !== false);
}

function applyTema(tema) {
  const t = tema || DEFAULT_THEME;
  if (t === DEFAULT_THEME) {
    document.documentElement.removeAttribute(ATTR_TEMA);
  } else {
    document.documentElement.setAttribute(ATTR_TEMA, t);
  }
}

applyTheme(true);

/* Depois le a preferencia salva (padrao: ligado, tema deep-dark) */
chrome.storage.local.get([STORAGE_KEY, THEME_KEY], (result) => {
  applyTheme(result[STORAGE_KEY] !== false);
  applyTema(result[THEME_KEY]);
});

/* Mensagens do popup: liga/desliga e trocar de tema, na hora */
chrome.runtime.onMessage.addListener((msg) => {
  if (!msg) return;
  if (msg.type === 'TOGGLE_DARK') {
    applyTheme(msg.enabled);
  }
  if (msg.type === 'SET_THEME') {
    applyTema(msg.theme);
  }
});

/* ── Conteudo dinamico (JSF/RichFaces/Ajax) ──────────────────────────────────
   O JSF as vezes escreve style="background-color: white" direto no elemento.
   Como o tema e aplicado por seletor, esses estilos inline escapam.
   Este observador neutraliza apenas FUNDOS CLAROS escritos inline; ele nao mexe
   em cor de texto nem nos poucos componentes que o tema mantem claros
   (o popup de modulos/portais, cujos icones sao `background-image`). */

const LIGHT_OK = [
  '#modulos li',
  '#portais li',
  '#menu_principal ul li',
  '.fotoPerfil',
  '#fotoPerfil',
  '#perfil-docente .pessoal-docente img'
];

/* So fundos realmente claros sao neutralizados, para nao apagar um fundo
   colorido de proposito (ex.: alerta amarelo). */
function isVeryLight(color) {
  const m = String(color).match(/[\d.]+/g);
  if (!m) return false;
  const [r, g, b] = m.slice(0, 3).map(Number);
  if (String(color).startsWith('rgba') && Number(m[3]) < 0.5) return false;
  return (r + g + b) / 3 > 170;
}

function isLightIsland(el) {
  return LIGHT_OK.some((sel) => {
    try { return el.matches(sel); } catch { return false; }
  });
}

function neutralize(root) {
  /* so elementos que tem style inline */
  const withStyle = root.matches?.('[style]') ? [root] : [];
  if (root.querySelectorAll) withStyle.push(...root.querySelectorAll('[style]'));

  for (const el of withStyle) {
    if (el.nodeType !== 1 || el === document.documentElement) continue;
    if (isLightIsland(el)) continue;
    if (isVeryLight(getComputedStyle(el).backgroundColor)) {
      el.style.setProperty('background-color', '#1e1e1e', 'important');
    }
  }
}

const observer = new MutationObserver((mutations) => {
  if (!document.documentElement.classList.contains(CLASS_DARK)) return;
  for (const m of mutations) {
    for (const node of m.addedNodes) {
      if (node.nodeType === 1) neutralize(node);
    }
  }
});

observer.observe(document.documentElement, {
  childList: true,
  subtree:   true
});
