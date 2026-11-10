# Criando um tema novo

Guia para adicionar uma paleta ao SIGAA Dark Mode. Não precisa saber nada de
além do que está aqui — são **3 passos**, todos em arquivos que já existem.

> **Resumo do caminho:** o CSS do tema inteiro é feito de `var(--sd-...)`. Um tema
> nada mais é que um bloco que redefine essas variáveis. Você só escolhe as
> cores; o resto do CSS continua igual.

---

## Passo 1 — Criar o bloco de cores no `style.css`

Abra o `style.css`. No começo do arquivo existe uma seção assim:

```css
/* 2) ROXO */
html.sigaa-dark-mode[data-sd-tema="roxo"] {
  --sd-page:    #170f2b;
  --sd-surface: #1f1836;
  --sd-raised:  #292045;
  --sd-header:  #2b2049;
  --sd-border:  #3d3159;
  --sd-border-strong: #57497e;
  --sd-text:     #e9e2f7;
  --sd-text-dim: #b0a2cc;
  --sd-link:        #c9a6ff;
  --sd-link-hover:  #e2ccff;
}
```

Copie esse bloco, cole logo depois e **renomeie** o `data-sd-tema`. Exemplo de um
tema novo chamado `"oceano"`:

```css
/* 6) OCEANO */
html.sigaa-dark-mode[data-sd-tema="oceano"] {
  --sd-page:    #0a1a24;
  --sd-surface: #10242f;
  --sd-raised:  #172e3b;
  --sd-header:  #14313f;
  --sd-border:  #1f4051;
  --sd-border-strong: #2c586e;
  --sd-text:     #dceaf0;
  --sd-text-dim: #98b6c4;
  --sd-link:        #6fd3f5;
  --sd-link-hover:  #96e4ff;
}
```

Só isso. Nenhuma outra regra do CSS precisa ser tocada.

### Como escolher as cores

A relação entre as camadas é o que faz o tema funcionar. Pense em 4 níveis, do
mais escuro para o mais claro:

| Variável | Papel | Regra prática |
|---|---|---|
| `--sd-page` | fundo da página | o mais escuro de tudo |
| `--sd-surface` | painéis, células de tabela | um passo acima |
| `--sd-raised` | menu, botões, hover | mais um passo |
| `--sd-header` | topo e hover de menu | pode ser o mais claro dos 4 |
| `--sd-border` | bordas | entre `surface` e `raised` |
| `--sd-border-strong` | borda de input/botão | um pouco mais claro que `border` |
| `--sd-text` | texto | claro, com bom contraste sobre `page` |
| `--sd-text-dim` | texto secundário | entre `text` e `border-strong` |
| `--sd-link` | links | a cor de identidade do tema |
| `--sd-link-hover` | link com mouse | um tom mais claro que `link` |

**Como acertar o tom sem ficar testando no olho:**

1. Escolha a cor base do tema (ex.: um azul oceano `#0ea5e9`).
2. Para os fundos, pegue essa cor e vá **escurecendo** até ficar quase preta,
   matizando ela. Um bom atalho: use um gerador de cores e baixe o *lightness*
   para algo entre **5% e 15%**.
3. Para os links, faça o contrário: suba o *lightness* para **70–80%** e baixe a
   saturação um pouco, se necessário, para não cansar a vista.
4. Confira o contraste: texto claro (`#dceaf0`) sobre `--sd-page` (#0a1a24) dá
   contraste alto o suficiente para leitura longa. Na dúvida, use uma
  calculadora de contraste WCAG e mire **4.5:1 ou mais** para o texto.

**Não mexa nestas variáveis** — elas são iguais em todos os temas porque têm
significado fixo, não estético:

```css
--sd-blue / --sd-teal / --sd-green / --sd-red / --sd-amber   /* alertas */
--sd-light-bg / --sd-light-text / --sd-light-border         /* popup de Módulos */
```

---

## Passo 2 — Adicionar o botão no seletor (`popup.html`)

O seletor fica no `popup.html`, dentro de `<div class="themes" id="themes">`.
Cada tema é um `<button>`. Copie um existente e troque três coisas:

```html
<button class="theme-btn" type="button" data-tema="oceano" aria-pressed="false"
        title="Oceano — fundo azul-marinho com links ciano">
  <span class="swatch" style="background:linear-gradient(135deg,#0a1a24 45%,#6fd3f5 46%)"></span>
  <span class="theme-name">Oceano</span>
</button>
```

Os três pontos que **precisam** casar:

1. **`data-tema="oceano"`** → tem que ser **exatamente** o mesmo nome usado no
   `data-sd-tema` do CSS. É assim que os dois se ligam.
2. **`aria-pressed="false"`** → em todos os temas, menos no que é o padrão
   (hoje o `deep-dark`, que fica com `"true"`).
3. **`background:linear-gradient(...)`** no `.swatch` → metade com o
   `--sd-page` novo, metade com o `--sd-link` novo. É a bolinha que aparece no
   popup, então use as duas cores que melhor representam o tema.

O `title` é o texto que aparece quando a pessoa deixa o mouse em cima.

> **Dica:** se o nome do tema tiver dois pedaços, use hífen nos dois lugares
> (`data-tema="azul-escuro"`). Não use espaço nem acento.

---

## Passo 3 — Atualizar o `popup.js` (só se listar nomes)

Se você **só adicionou um botão**, não precisa mexer em nada: o `popup.js`
descobre os botões sozinho, via `document.querySelectorAll('.theme-btn')`, e lê
o tema do `data-tema` de cada um.

Só é preciso mexer no `popup.js` se você criar uma lista fixa de temas em algum
lugar (hoje existe só a constante `DEFAULT_THEME`, que define qual tema vale
quando a pessoa nunca escolheu nenhum).

---

## Testando antes de commitar

Rode a extensão carregada no Chrome (`chrome://extensions/` → *Carregar sem
compactação*) e:

1. Clique no botão novo no popup → a página muda na hora.
2. Recarregue a página (F5) → o tema continua.
3. Desligue e religue o modo escuro pelo toggle → o tema continua.
4. Dê uma olhada em páginas diferentes: portal, turma virtual, relatório de
   notas, editar perfil.

Se alguma área ficar com cor estranha, provavelmente falta uma das 10 variáveis
no bloco, ou o nome do `data-sd-tema` não bate com o `data-tema` do botão.

---

## Checklist

- [ ] bloco novo no `style.css` com as 10 variáveis
- [ ] `data-sd-tema` com nome único, sem espaço nem acento
- [ ] botão novo no `popup.html` com `data-tema` igual ao do CSS
- [ ] `aria-pressed="false"` no botão novo (e `"true"` só no padrão)
- [ ] gradiente do `.swatch` com as duas cores principais
- [ ] `title` descrevendo o tema
- [ ] testado nas 4 telas principais

---

## Referência rápida dos temas atuais

| `data-sd-tema` | Nome | page | link |
|---|---|---|---|
| `deep-dark` | Dark | `#121212` | `#8ab4f8` |
| `roxo` | Roxo | `#170f2b` | `#c9a6ff` |
| `rosa` | Rosa | `#200d15` | `#ff9ec4` |
| `verde` | Verde | `#0b1c13` | `#7ddba3` |
| `vermelho` | Vermelho | `#1e0b0b` | `#ff9e9e` |
