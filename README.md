<div align="center">

# 🌙 SIGAA Dark Mode — CEFET-MG

**Tema escuro para o portal SIGAA do CEFET-MG.**
Feito de aluno para aluno, pra poupar a vista nas madrugadas de estudo.

![Chrome](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![Manifest](https://img.shields.io/badge/Manifest-V3-green)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-orange)
![License](https://img.shields.io/badge/license-MIT-blue)

> Projeto **não oficial**, sem qualquer vínculo com o CEFET-MG.

</div>

---

## Prévia

| Antes | Depois |
|:---:|:---:|
| <img width="1299" height="962" alt="SIGAA no modo claro" src="https://github.com/user-attachments/assets/c8a06bf3-ceb6-47dc-9b34-96dac302a1c5" /> | <img width="1299" height="962" alt="SIGAA no modo escuro" src="https://github.com/user-attachments/assets/06fe3a93-d72f-4f2c-afa2-248bde6996de" /> |

---

## Instalação

A extensão ainda não está na Chrome Web Store, então a instalação é feita pelo **modo desenvolvedor**. Leva menos de 2 minutos.

1. Nesta página, clique no botão verde **Code** e depois em **Download ZIP**.
2. Extraia o `.zip` em uma pasta fixa do seu computador.
3. Abra o Chrome e acesse `chrome://extensions/`.
4. Ative o **Modo do desenvolvedor** (canto superior direito).
5. Clique em **Carregar sem compactação** (*Load unpacked*).
6. Selecione a pasta `sigaa-cefetmg-modoescuro-main/`.
7. Acesse [sig.cefetmg.br/sigaa](https://sig.cefetmg.br/sigaa/) e pronto!

> [!IMPORTANT]
> Selecione a pasta que contém o arquivo `manifest.json` **diretamente dentro dela**. Em alguns casos o Windows cria uma pasta dentro de outra com o mesmo nome ao extrair; se der erro de "arquivo de manifesto ausente", é isso.

> [!WARNING]
> Não apague nem mova a pasta depois de instalar, senão o Chrome desativa a extensão.

### Dica: fixe a extensão na barra

Clique no ícone de quebra-cabeça ao lado da barra de endereço e depois no alfinete ao lado de **SIGAA Dark Mode**. Assim o botão de ligar/desligar fica sempre à mão.

### Como atualizar

Quem instala pelo ZIP não recebe atualizações automáticas:

1. Baixe o ZIP novamente.
2. Substitua os arquivos da pasta antiga pelos novos.
3. Em `chrome://extensions/`, clique no botão de recarregar da extensão.

---

## Como usar

Clique no ícone da extensão na barra do Chrome para **ligar ou desligar** o modo escuro. Sua preferência fica salva no navegador.

---

## Paleta de cores

| Função | Cor | Código |
|---|:---:|---|
| Fundo base | ![](https://placehold.co/16x16/121212/121212.png) | `#121212` |
| Superfície | ![](https://placehold.co/16x16/1e1e1e/1e1e1e.png) | `#1e1e1e` |
| Header | ![](https://placehold.co/16x16/1a2236/1a2236.png) | `#1a2236` |
| Texto | ![](https://placehold.co/16x16/e0e0e0/e0e0e0.png) | `#e0e0e0` |
| Links | ![](https://placehold.co/16x16/90caf9/90caf9.png) | `#90caf9` |
| Sucesso | ![](https://placehold.co/16x16/a5d6a7/a5d6a7.png) | `#a5d6a7` |
| Erro | ![](https://placehold.co/16x16/ef9a9a/ef9a9a.png) | `#ef9a9a` |

---

## Não funcionou?

- Recarregue a página do SIGAA (`Ctrl + F5`).
- Confira em `chrome://extensions/` se a extensão está **ativada**.
- Clique no ícone da extensão e veja se o modo escuro está **ligado**.
- Se ainda assim não resolver, tente limpar o cache do navegador.
- Continua com problema? [Abra uma Issue](../../issues) com um print.

---

## Privacidade e permissões

A extensão **não coleta, armazena nem envia nenhum dado seu**. Todo o código roda localmente no seu navegador e é aberto para você conferir.

| Permissão | Para que serve |
|---|---|
| `storage` | Salvar a preferência do toggle (ligado/desligado) |
| `scripting` | Comunicar com as abas abertas |
| `sig.cefetmg.br` e `sigaa.cefetmg.br` | Aplicar o tema somente nesses sites |

---

## Arquitetura

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

---

## Como contribuir

Encontrou um bug visual? Toda ajuda é bem-vinda.

- **Issue:** abra uma [Issue](../../issues) com o **print** e o **endereço da página** (sem dados pessoais).
- **Pull Request:** já sabe a correção? Envie um PR com o ajuste no `style.css`.

---

## Transparência

Este projeto foi desenvolvido com auxílio de Inteligência Artificial ([Claude](https://claude.ai)) para acelerar a criação do CSS.

O SIGAA é um sistema legado, com centenas de telas e estruturas dinâmicas, então **podem existir bugs visuais ou textos com pouco contraste** em páginas específicas. A extensão foi feita de aluno para aluno, para "quebrar um galho" e poupar nossa visão durante a madrugada. Se achar algo, abra uma Issue. Ajuda muito!


---
## Licença

Distribuído sob a licença [MIT](LICENSE).

---
<div align="center">

[Política de Privacidade](https://gist.github.com/hgiulliano/0c154e28da48c9751e743187ea09aebc)

</div>

---

<div align="center">

Feito por [@hgiulliano](https://github.com/hgiulliano)

</div>
