---
title: "Glossário"
slug: glossary
description: "Definições de termos comuns usados na OpenCode School."
---

## agent (agente)

Um assistente de IA que pode ler ficheiros, escrever código, executar comandos e realizar tarefas em seu nome. Os agentes integrados do OpenCode incluem "build" (para fazer alterações) e "plan" (para pensar nos problemas sem fazer alterações). Também pode criar agentes personalizados para tarefas especializadas.

## AGENTS.md

Um ficheiro de texto simples que contém instruções personalizadas que o OpenCode lê no início de cada sessão. Pense nele como um conjunto de ordens permanentes para a IA. Pode existir globalmente (`~/.config/opencode/AGENTS.md`) ou por projeto (na raiz do projeto). O global é pessoal; o de projeto é tipicamente registado no Git e partilhado com a equipa.

## CLI

**Command-Line Interface (Interface de Linha de Comandos).** Uma forma de interagir com software escrevendo comandos de texto. O OpenCode tem uma CLI para executar tarefas pontuais, como `opencode run "explica esta função"`. Ao contrário da [TUI](#tui), a CLI executa um único comando e termina.

## command (comando)

Uma ação prefixada com barra que pode executar dentro do OpenCode, como `/models` para mudar de modelo de IA, `/share` para partilhar uma conversa, ou `/undo` para reverter a última alteração. Também pode criar comandos personalizados para tarefas repetitivas.

## config (configuração)

Abreviatura de configuração. Um ficheiro (normalmente `opencode.json`) onde define preferências para o comportamento do OpenCode — qual [modelo](#model-modelo) usar, que [permissões](#permissions-permissões) conceder, a que [servidores MCP](#mcp) ligar, e mais. Os ficheiros de configuração podem ser globais (aplicando-se a todas as sessões) ou por projeto.

## context window (janela de contexto)

A quantidade de texto que um [modelo](#model-modelo) consegue "ver" de uma só vez durante uma conversa. Medida em tokens (aproximadamente ¾ de uma palavra). Um modelo com uma janela de contexto de 128K pode trabalhar com cerca de 128.000 tokens de entrada e saída combinadas — incluindo as suas mensagens, conteúdo de ficheiros, resultados de ferramentas e as respostas do próprio modelo. Janelas de contexto maiores permitem ao modelo lidar com bases de código maiores e conversas mais longas sem perder o rasto de detalhes anteriores.

## GUI

**Graphical User Interface (Interface Gráfica do Utilizador).** Uma interface visual com janelas, botões e menus com a qual interage usando o rato e o teclado. O OpenCode Desktop é uma GUI. Compare com [TUI](#tui) e [CLI](#cli).

## Homebrew

Um gestor de pacotes para macOS (e Linux) que permite instalar software a partir da linha de comandos. Execute `brew install <pacote>` para instalar algo, `brew update` para atualizar o Homebrew, e `brew upgrade` para atualizar os pacotes instalados. O OpenCode Desktop pode ser instalado com `brew install --cask opencode-desktop`. Consulte [brew.sh](https://brew.sh/).

## LLM

**Large Language Model (Modelo de Linguagem de Grande Escala).** Um tipo de IA que funciona como uma versão sofisticada de autocompletar — recebe texto existente e prevê as próximas palavras mais prováveis. Dê-lhe o início de uma frase e prevê como continuar. Dê-lhe uma pergunta e prevê como seria uma resposta. Dê-lhe código com um erro e prevê como seria a correção.

Os LLMs são treinados em vastas quantidades de texto e código da internet, e é assim que "aprendem" padrões de linguagem, raciocínio e programação. São eles que alimentam ferramentas como o OpenCode — quando escreve um [prompt](#prompt), é um LLM que o lê e gera uma resposta. Exemplos incluem o Claude (da Anthropic), o GPT (da OpenAI) e o Gemini (da Google).

Para uma compreensão mais profunda de como os LLMs funcionam, veja [Intro to Large Language Models](https://www.youtube.com/watch?v=7xTGNNLPyMI) de Andrej Karpathy — uma explicação clara e não técnica que cobre como estes modelos são construídos, como pensar sobre eles e como tirar o máximo proveito deles.

## LM Studio

Uma aplicação de computador para descarregar e executar [LLMs](#llm) localmente no seu computador. Oferece uma [GUI](#gui) para navegar modelos, gerir transferências e executar um servidor de API local ao qual o OpenCode pode ligar-se como [fornecedor](#provider-fornecedor). Consulte [lmstudio.ai](https://lmstudio.ai/).

## Markdown

Um formato de texto simples preferido por programadores para escrever conteúdo. Ao contrário de formatos associados a programas específicos (como `.docx` para o Microsoft Word ou `.pages` para o Apple Pages), o Markdown é leve e não está associado a nenhum programa, empresa ou tecnologia em particular. Os ficheiros terminam em `.md` e usam caracteres simples para formatação: `#` para cabeçalhos, `**` para negrito, `- ` para listas com marcadores, e `[texto](url)` para ligações.

O Markdown é também o formato de texto preferido pelos [LLMs](#llm) — tanto para ler entradas como para gerar saídas. Muitos dos ficheiros com que irá trabalhar no OpenCode são Markdown, incluindo o [AGENTS.md](#agentsmd) e os ficheiros de lições deste curso.

Para aprender o formato Markdown interativamente, consulte o [Markdown Live Preview](https://markdownlivepreview.com/).

## MCP

**Model Context Protocol (Protocolo de Contexto de Modelo).** Um padrão aberto que permite ao OpenCode ligar-se a ferramentas e serviços externos. Por exemplo, pode adicionar um servidor MCP que dá ao OpenCode acesso aos seus issues do GitHub, registos de erros do Sentry, ou pesquisa de documentação. Os servidores MCP podem ser locais (a correr na sua máquina) ou remotos (alojados na internet).

## mode (modo)

O OpenCode tem diferentes modos de operação. O **modo Build** permite ao agente fazer alterações nos seus ficheiros. O **modo Plan** restringe-o a apenas ler e sugerir — útil para pensar num problema antes de se comprometer com alterações. Alterne entre eles com a tecla Tab na TUI, ou através do seletor de modo no Desktop.

## model (modelo)

O cérebro de IA que alimenta o OpenCode. Os modelos são criados por empresas como a Anthropic (Claude), a OpenAI (GPT) e a Google (Gemini). Diferentes modelos têm diferentes forças, velocidades e custos. Pode escolher qual modelo usar e alternar entre eles a qualquer momento.

## Ollama

Uma ferramenta [CLI](#cli) para descarregar e executar [LLMs](#llm) localmente no seu computador. Funciona como um gestor de pacotes para modelos de IA — execute `ollama pull llama3` para descarregar um modelo e `ollama run llama3` para começar a conversar com ele. O OpenCode pode ligar-se ao Ollama como [fornecedor](#provider-fornecedor) local. Consulte [ollama.com](https://ollama.com/).

## permissions (permissões)

Regras que controlam o que o OpenCode pode fazer na sua máquina. Cada ação pode ser definida como `allow` (executar sem perguntar), `ask` (pedir aprovação) ou `deny` (bloquear completamente). Por exemplo, pode permitir a leitura de ficheiros mas exigir aprovação antes de apagar ficheiros.

## prompt

A mensagem ou instrução que escreve no OpenCode. Um bom prompt dá à IA contexto suficiente para fazer o que pretende. Por exemplo: "Adiciona um botão de modo escuro à página de definições" ou "Explica como funciona a autenticação neste projeto."

## provider (fornecedor)

Uma empresa ou serviço que aloja [modelos](#model-modelo) de IA. A Anthropic, a OpenAI e a Google são fornecedores. O OpenCode suporta mais de 75 fornecedores, incluindo opções auto-alojadas como o Ollama para executar modelos localmente.

## session (sessão)

Uma conversa individual com o OpenCode. Cada sessão tem o seu próprio contexto e histórico. Pode executar múltiplas sessões em paralelo e partilhar sessões com outros usando o comando `/share`.

## skill (competência)

Um conjunto reutilizável de instruções empacotado como ficheiro `SKILL.md`. As skills são carregadas a pedido pelo OpenCode quando são relevantes para a tarefa atual. Pense nelas como pacotes de conhecimento especializado — por exemplo, uma skill que sabe como redigir notas de lançamento ou configurar um novo componente React.

## text editor (editor de texto)

Um programa para escrever e editar ficheiros de texto simples. Precisará de um para visualizar e editar os ficheiros de [configuração](#config-configuração) do OpenCode, embora o próprio OpenCode trate da maior parte da criação e edição de ficheiros.

Alguns editores multiplataforma populares (todos gratuitos): [VS Code](https://code.visualstudio.com), [Cursor](https://cursor.com), [Zed](https://zed.dev) e [Windsurf](https://windsurf.com/editor). Se não quiser instalar nada extra, o seu sistema operativo inclui um: TextEdit no macOS (defina para modo de texto simples nas Definições), Bloco de notas no Windows, ou gedit/Kate/nano no Linux.

## tool (ferramenta)

Uma capacidade que o agente de IA do OpenCode pode utilizar. As ferramentas integradas incluem ler ficheiros, editar código, executar comandos shell, pesquisar na web, e mais. Os [servidores MCP](#mcp) podem adicionar ferramentas adicionais de serviços externos.

## TUI

**Terminal User Interface (Interface de Utilizador no Terminal).** Uma interface baseada em texto que funciona dentro do seu terminal. A TUI do OpenCode parece uma aplicação de chat mas funciona inteiramente no terminal — sem necessidade de rato. É a forma original de usar o OpenCode, e é popular entre programadores que estão confortáveis no terminal. Compare com [GUI](#gui) e [CLI](#cli).
