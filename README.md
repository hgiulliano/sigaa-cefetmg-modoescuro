# 🌙 SIGAA Dark Mode — CEFET-MG

Extensão para Google Chrome que aplica um tema escuro no portal SIGAA do CEFET-MG.

## 📦 Como Instalar (Modo Desenvolvedor)

1. Extraia o arquivo `.zip` em uma pasta fixa no seu computador
2. Abra o Chrome e acesse: `chrome://extensions/`
3. Ative o **"Modo do desenvolvedor"** (canto superior direito)
4. Clique em **"Carregar sem compactação"**
5. Selecione a pasta extraída (`sigaa-darkmode/`)
6. Acesse `https://sig.cefetmg.br/sigaa/` e aproveite! 🎉

## 🎨 Paleta de Cores

| Função | Cor |
|---|---|
| Fundo base | `#121212` |
| Superfície | `#1e1e1e` |
| Header | `#1a2236` |
| Texto | `#e0e0e0` |
| Links | `#90caf9` |
| Sucesso | `#a5d6a7` |
| Erro | `#ef9a9a` |

## ⚙️ Arquitetura

```
sigaa-darkmode/
├── manifest.json   # Configuração MV3
├── style.css       # Tema Deep Dark (injetado em document_start)
├── content.js      # Gerencia estado e conteúdo dinâmico (JSF/Ajax)
├── popup.html      # Interface do toggle
├── popup.js        # Lógica do popup
├── background.js   # Service Worker
└── icons/          # Ícones da extensão
```

## 🤖 Transparência & Aviso Legal

Este projeto foi construído e estruturado com o auxílio de Inteligência Artificial (Claude) para acelerar o desenvolvimento do CSS e focar na entrega rápida da solução.

Como o SIGAA é um sistema legado gigantesco, com centenas de telas diferentes e estruturas dinâmicas, **não me responsabilizo por eventuais bugs visuais**, quebras de layout em páginas específicas ou textos que fiquem sem contraste. A extensão foi feita de aluno para aluno, com o único objetivo de "quebrar um galho" e poupar nossa visão durante a madrugada.

Se você encontrar algum bug visual bizarro, sinta-se à vontade para abrir uma *Issue* ou enviar um *Pull Request* com a correção! 🤝
## 🔒 Permissões

- `storage` — Salvar preferência do toggle
- `scripting` — Comunicar com abas abertas
- Host: `sig.cefetmg.br` e `sigaa.cefetmg.br`

