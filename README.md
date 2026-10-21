# 🌙 SIGAA Dark Mode — CEFET-MG

Extensão para Google Chrome que aplica um tema escuro no portal SIGAA do CEFET-MG.

> ⚠️ Projeto não oficial, sem vínculo com o CEFET-MG.

## 👀 Prévia

| Antes | Depois |
|:---:|:---:|
| <img width="1299" height="962" alt="sigaamodoclaro" src="https://github.com/user-attachments/assets/c8a06bf3-ceb6-47dc-9b34-96dac302a1c5" /> | <img width="1299" height="962" alt="sigaamodoescuro" src="https://github.com/user-attachments/assets/06fe3a93-d72f-4f2c-afa2-248bde6996de" /> |

## 📦 Como instalar (modo desenvolvedor)

1. Nesta página, clique no botão verde **Code** e depois em **Download ZIP**.
2. Extraia o arquivo `.zip` em uma pasta fixa do seu computador.
3. Abra o Chrome e acesse `chrome://extensions/`.
4. Ative o **Modo do desenvolvedor** (canto superior direito).
5. Clique em **Carregar sem compactação** (*Load unpacked*).
6. Selecione a pasta extraída (`sigaa-cefetmg-modoescuro-main/`).
7. Acesse `https://sig.cefetmg.br/sigaa/` e aproveite! 🎉

> Não apague nem mova a pasta depois de instalar, senão o Chrome desativa a extensão.

## 🕹️ Como usar

Clique no ícone da extensão na barra do Chrome para ligar ou desligar o modo escuro. A preferência fica salva no navegador.

## 🎨 Paleta de cores

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

```text
sigaa-cefetmg-modoescuro/
├── manifest.json   # Configuração MV3
├── style.css       # Tema escuro (injetado em document_start)
├── content.js      # Gerencia estado e conteúdo dinâmico (JSF/Ajax)
├── popup.html      # Interface do toggle
├── popup.js        # Lógica do popup
├── background.js   # Service Worker
└── icons/          # Ícones da extensão
```

## 🐛 Problemas conhecidos

- O título "Turmas do Semestre" da página inicial fica com baixo contraste no modo escuro.

## 🤖 Transparência & aviso legal

Este projeto foi construído e estruturado com o auxílio de Inteligência Artificial (Claude) para acelerar o desenvolvimento do CSS e focar na entrega rápida da solução.

Como o SIGAA é um sistema legado gigantesco, com centenas de telas diferentes e estruturas dinâmicas, **não me responsabilizo por eventuais bugs visuais**, quebras de layout em páginas específicas ou textos que fiquem sem contraste. A extensão foi feita de aluno para aluno, com o único objetivo de "quebrar um galho" e poupar nossa visão durante a madrugada.

## 🤝 Como contribuir

Encontrou um bug visual? Abra uma *Issue* com o print e o endereço da página (sem dados pessoais), ou envie um *Pull Request* com a correção.

## 🔒 Permissões

- `storage` — salvar a preferência do toggle
- `scripting` — comunicar com abas abertas
- Host: `sig.cefetmg.br` e `sigaa.cefetmg.br`
