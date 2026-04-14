// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import type { Locale } from "./locales";

const ui = {
	en: {
		// Site
		"site.name": "OpenCode School",
		"site.description":
			"Learn to use OpenCode, the free and open-source AI coding agent.",

		// Navigation
		"nav.allLessons": "All lessons",
		"nav.home": "Home",
		"nav.exercises": "Exercises",
		"nav.about": "About",
		"nav.tips": "Tips",
		"nav.changelog": "Changelog",
		"nav.glossary": "Glossary",
		"nav.troubleshooting": "Troubleshooting",
		"nav.disenroll": "Disenroll",
		"nav.toggleNavigation": "Toggle navigation",

		// Sidebar tooltips
		"sidebar.cloudflare": "Created and sponsored by Cloudflare",
		"sidebar.opencode": "Built with OpenCode",
		"sidebar.github": "Open source on GitHub",
		"sidebar.discord": "OpenCode support community",

		// Homepage
		"home.studentId": "OpenCode Student ID",
		"home.intro":
			'OpenCode School is a free, self-paced course for learning <a href="https://opencode.ai" class="theme-link underline">OpenCode</a>, the open-source AI coding agent.',
		"home.lessons": "Lessons",
		"home.exercises": "Exercises",
		"home.exercisesDescription":
			"Hands-on projects where you apply what you've learned to build real things.",
		"home.learnMore": "Learn more",
		"home.comingSoon": "(coming soon)",
		"home.enroll": "Enroll in OpenCode School",
		"home.enrollFree":
			"Free forever. No account required. No personal data collected.",
		"home.colorPicker":
			"Choose a color for your student ID card and site theme.",
		"home.generating": "Generating your student ID...",
		"home.enrollError": "Something went wrong. Please try again.",

		// Homepage orientation
		"home.whatIsOpenCode": "What is OpenCode?",
		"home.whatIsOpenCodeP1":
			'<a href="https://opencode.ai">OpenCode</a> is a free, open-source AI coding agent that you install on your personal computer. The primary interface is a chat window, much like ChatGPT or Claude, where you have a back and forth dialogue with an AI model. But instead of just chatting, OpenCode can read and write files on your computer, write code, run commands, and interact with other applications.',
		"home.whatIsOpenCodeP2":
			"Despite the name, OpenCode is not just a tool for writing software. You can use it to automate any task on your computer, from managing files to controlling other applications. It's like having an assistant that can understand your intentions, help you brainstorm, do deep research, and build creative things.",
		"home.whatIsOpenCodeP3":
			'Unlike proprietary tools like Claude Code and OpenAI Codex, OpenCode works with <a href="https://opencode.ai/docs/providers/">75+ AI model providers</a>, including <a href="https://anthropic.com">Anthropic</a> (Claude), <a href="https://openai.com">OpenAI</a> (GPT), and <a href="https://deepmind.google/technologies/gemini/">Google</a> (Gemini). You can also run open-source models locally on your own machine using tools like <a href="https://ollama.com">Ollama</a>, <a href="https://lmstudio.ai">LM Studio</a>, or <a href="https://github.com/ggml-org/llama.cpp">llama.cpp</a> — no cloud account needed.',
		"home.whoIsThisFor": "Who is this for?",
		"home.whoIsThisForP1":
			"This course is for anyone who wants to expand their creative potential with AI. Whether you're a student, a hobbyist, a professional developer, or just curious about AI, OpenCode can help you do more with less effort.",
		"home.whoIsThisForP2":
			"This course is for <strong>beginners</strong> who are new to AI coding agents. You don't need to be a programmer, and you don't need any experience with the terminal. We'll be using the OpenCode Desktop app, which provides a familiar graphical interface.",
		"home.whoIsThisForP3":
			"This course is also for <strong>experienced developers</strong>. It'll get you set up with a good foundation for using OpenCode effectively, and you'll learn some tips and tricks for getting the most out of it.",
		"home.whatYoullLearn": "What you'll learn",
		"home.whatYoullLearnIntro":
			"By the end of this course, you'll know how to:",
		"home.whatYoullLearnList": [
			"Install and configure OpenCode",
			"Use AI models to help you write and edit code",
			"Control what OpenCode can and can't do on your machine",
			"Connect external tools and services",
			"Run multiple sessions in parallel",
			"Build websites, games, and other creative projects!",
		],
		"home.howItWorks": "How it works",
		"home.howItWorksP1":
			"The first lesson — Installation — is done here in the browser. Once you have OpenCode up and running, the rest of the course happens interactively <em>inside</em> OpenCode itself. Each lesson page has a prompt you copy and paste into OpenCode. The agent reads the lesson, works through the material with you, and marks it complete — which syncs back to this page in real time.",

		// Lesson page
		"lesson.label": "Lesson",
		"lesson.completed": "You completed this lesson!",
		"lesson.completedOn": "You completed this lesson on {date} {via}.",
		"lesson.viaAgent": "via OpenCode",
		"lesson.viaBrowser": "in the browser",
		"lesson.enrollNudge": "to track your progress through the course.",
		"lesson.enrollFree": "Enroll for free",
		"lesson.nextLesson": "Next lesson: {title}",
		"lesson.markComplete": "Mark this lesson as complete",
		"lesson.complete": "Lesson complete!",
		"lesson.saving": "Saving...",
		"lesson.agentOnlyIncomplete":
			"Complete this lesson in OpenCode to continue.",
		"lesson.agentOnlyComplete": "You completed this lesson in OpenCode.",

		// Exercise page
		"exercise.label": "Exercise",
		"exercise.allExercises": "All exercises",
		"exercise.completed": "You completed this exercise!",
		"exercise.completedOn": "You completed this exercise on {date} {via}.",
		"exercise.nextExercise": "Next exercise: {title}",
		"exercise.markComplete": "Mark this exercise as complete",
		"exercise.complete": "Exercise complete!",
		"exercise.saving": "Saving...",
		"exercise.nudgeHeading": "This exercise works best with OpenCode",
		"exercise.nudgeBody":
			"Enroll in OpenCode School to get a student ID. Then paste the exercise prompt into OpenCode, and it will guide you through this project step by step.",
		"exercise.enrollFree": "Enroll for free",

		// Exercises index
		"exercises.title": "Exercises",
		"exercises.description":
			"Hands-on projects where you apply what you've learned to build real things — websites, media tools, browser automation, and more.",
		"exercises.nudgeHeading": "Exercises work best with OpenCode",
		"exercises.nudgeBody":
			"Enroll in OpenCode School to get a student ID. Then paste the exercise prompt into OpenCode, and it will guide you through each project step by step.",

		// Agent prompt
		"agentPrompt.label": "Prompt for OpenCode",
		"agentPrompt.copy": "Copy",
		"agentPrompt.copied": "Copied! Now go paste that into OpenCode...",

		// CTA buttons
		"cta.continue": "Continue",
		"cta.start": "Start",

		// About page
		"about.title": "About OpenCode School",
		"about.subtitle":
			"A free, open-source course for learning how to use OpenCode.",
		"about.description":
			'OpenCode School is a free, self-paced course for learning how to use the <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer">OpenCode</a> AI coding agent. Despite the name, OpenCode is not just for developers: it\'s for anyone who wants to build creative things on their computer using AI tools. No account is required — a random student ID is generated locally when you enroll. This is a community project, not an official Anomaly product. The course itself is <a href="https://github.com/opencodeschool/opencode.school" target="_blank" rel="noopener noreferrer">open source</a> and <a href="https://github.com/opencodeschool/opencode.school" target="_blank" rel="noopener noreferrer">contributions are welcome</a>.',
		"about.builtWith": "Built with and powered by",

		// Tips page
		"tips.title": "Tips and Tricks",
		"tips.subtitle": "Practical ways to get better results with OpenCode.",

		// Troubleshooting page
		"troubleshooting.title": "Troubleshooting",
		"troubleshooting.subtitle":
			"Tips for solving problems with OpenCode and this course.",

		// Glossary page
		"glossary.title": "Glossary",
		"glossary.subtitle": "Definitions of common terms used in OpenCode School.",

		// Changelog page
		"changelog.title": "Changelog",
		"changelog.subtitle": "What's new on OpenCode School.",

		// Disenroll page
		"disenroll.title": "Disenroll",
		"disenroll.notEnrolled":
			'You are not currently enrolled. <a href="/" class="underline">Go to the homepage</a> to enroll.',
		"disenroll.resetTitle": "Reset progress",
		"disenroll.resetDescription":
			"Clear all your lesson and exercise completions so you can redo them. Your student ID and profile are kept.",
		"disenroll.resetButton": "Reset my progress",
		"disenroll.resetDone":
			'Progress has been reset. Your student ID is unchanged. <a href="/" class="underline">Go to the homepage</a> to start over.',
		"disenroll.resetError":
			"Something went wrong resetting your progress. Try again or disenroll instead.",
		"disenroll.resetResetting": "Resetting\u2026",
		"disenroll.fullTitle": "Disenroll completely",
		"disenroll.fullDescription":
			"Remove your student ID, progress, and theme color from this browser. Your data on the server is not affected. You will need to re-enroll to use OpenCode School again.",
		"disenroll.fullButton": "Disenroll from OpenCode School",
		"disenroll.fullDone":
			"You have been disenrolled. Redirecting to the home page\u2026",
		"disenroll.configNote":
			'If you added your OpenCode School instructions URL to your global OpenCode config, you should also remove the <code class="text-sm bg-gray-100 dark:bg-stone-800 px-1 py-0.5 rounded">instructions</code> entry from <code class="text-sm bg-gray-100 dark:bg-stone-800 px-1 py-0.5 rounded">~/.config/opencode/opencode.json</code>.',

		// 404 page
		"404.title": "404",
		"404.message": "Page not found.",
		"404.back": "Back to lessons",

		// Language switcher
		"lang.switch": "Language",
	},

	pt: {
		// Site
		"site.name": "OpenCode School",
		"site.description":
			"Aprenda a usar o OpenCode, o agente de programação com IA, gratuito e de código aberto.",

		// Navigation
		"nav.allLessons": "Todas as lições",
		"nav.home": "Início",
		"nav.exercises": "Exercícios",
		"nav.about": "Sobre",
		"nav.tips": "Dicas",
		"nav.changelog": "Alterações",
		"nav.glossary": "Glossário",
		"nav.troubleshooting": "Resolução de problemas",
		"nav.disenroll": "Cancelar inscrição",
		"nav.toggleNavigation": "Alternar navegação",

		// Sidebar tooltips
		"sidebar.cloudflare": "Criado e patrocinado pela Cloudflare",
		"sidebar.opencode": "Construído com OpenCode",
		"sidebar.github": "Código aberto no GitHub",
		"sidebar.discord": "Comunidade de apoio do OpenCode",

		// Homepage
		"home.studentId": "Cartão de estudante OpenCode",
		"home.intro":
			'A OpenCode School é um curso gratuito e ao seu ritmo para aprender a usar o <a href="https://opencode.ai" class="theme-link underline">OpenCode</a>, o agente de programação com IA de código aberto.',
		"home.lessons": "Lições",
		"home.exercises": "Exercícios",
		"home.exercisesDescription":
			"Projetos práticos onde aplica o que aprendeu para construir coisas reais.",
		"home.learnMore": "Saber mais",
		"home.comingSoon": "(em breve)",
		"home.enroll": "Inscrever-se na OpenCode School",
		"home.enrollFree":
			"Gratuito para sempre. Sem necessidade de conta. Sem recolha de dados pessoais.",
		"home.colorPicker":
			"Escolha uma cor para o seu cartão de estudante e tema do site.",
		"home.generating": "A gerar o seu ID de estudante...",
		"home.enrollError": "Algo correu mal. Por favor, tente novamente.",

		// Homepage orientation
		"home.whatIsOpenCode": "O que é o OpenCode?",
		"home.whatIsOpenCodeP1":
			'O <a href="https://opencode.ai">OpenCode</a> é um agente de programação com IA, gratuito e de código aberto, que instala no seu computador pessoal. A interface principal é uma janela de conversação, semelhante ao ChatGPT ou Claude, onde mantém um diálogo com um modelo de IA. Mas, em vez de apenas conversar, o OpenCode pode ler e escrever ficheiros no seu computador, escrever código, executar comandos e interagir com outras aplicações.',
		"home.whatIsOpenCodeP2":
			"Apesar do nome, o OpenCode não é apenas uma ferramenta para escrever software. Pode usá-lo para automatizar qualquer tarefa no seu computador, desde gerir ficheiros até controlar outras aplicações. É como ter um assistente que compreende as suas intenções, o ajuda a fazer brainstorming, pesquisa aprofundada e a construir coisas criativas.",
		"home.whatIsOpenCodeP3":
			'Ao contrário de ferramentas proprietárias como o Claude Code e o OpenAI Codex, o OpenCode funciona com <a href="https://opencode.ai/docs/providers/">mais de 75 fornecedores de modelos de IA</a>, incluindo a <a href="https://anthropic.com">Anthropic</a> (Claude), a <a href="https://openai.com">OpenAI</a> (GPT) e a <a href="https://deepmind.google/technologies/gemini/">Google</a> (Gemini). Também pode executar modelos de código aberto localmente na sua própria máquina usando ferramentas como o <a href="https://ollama.com">Ollama</a>, o <a href="https://lmstudio.ai">LM Studio</a> ou o <a href="https://github.com/ggml-org/llama.cpp">llama.cpp</a> — sem necessidade de conta na nuvem.',
		"home.whoIsThisFor": "Para quem é este curso?",
		"home.whoIsThisForP1":
			"Este curso é para qualquer pessoa que queira expandir o seu potencial criativo com IA. Seja estudante, entusiasta, programador profissional ou simplesmente curioso sobre IA, o OpenCode pode ajudá-lo a fazer mais com menos esforço.",
		"home.whoIsThisForP2":
			"Este curso é para <strong>principiantes</strong> que são novos em agentes de programação com IA. Não precisa de ser programador, nem de ter experiência com o terminal. Vamos usar a aplicação OpenCode Desktop, que oferece uma interface gráfica familiar.",
		"home.whoIsThisForP3":
			"Este curso é também para <strong>programadores experientes</strong>. Irá configurá-lo com uma boa base para usar o OpenCode de forma eficaz, e aprenderá algumas dicas e truques para tirar o máximo proveito.",
		"home.whatYoullLearn": "O que vai aprender",
		"home.whatYoullLearnIntro": "No final deste curso, saberá como:",
		"home.whatYoullLearnList": [
			"Instalar e configurar o OpenCode",
			"Usar modelos de IA para o ajudar a escrever e editar código",
			"Controlar o que o OpenCode pode e não pode fazer na sua máquina",
			"Ligar ferramentas e serviços externos",
			"Executar múltiplas sessões em paralelo",
			"Construir websites, jogos e outros projetos criativos!",
		],
		"home.howItWorks": "Como funciona",
		"home.howItWorksP1":
			"A primeira lição — Instalação — é feita aqui no navegador. Assim que tiver o OpenCode a funcionar, o resto do curso acontece interactivamente <em>dentro</em> do próprio OpenCode. Cada página de lição tem um prompt que copia e cola no OpenCode. O agente lê a lição, trabalha o material consigo e marca-a como concluída — o que sincroniza de volta com esta página em tempo real.",

		// Lesson page
		"lesson.label": "Lição",
		"lesson.completed": "Concluiu esta lição!",
		"lesson.completedOn": "Concluiu esta lição a {date} {via}.",
		"lesson.viaAgent": "via OpenCode",
		"lesson.viaBrowser": "no navegador",
		"lesson.enrollNudge": "para acompanhar o seu progresso ao longo do curso.",
		"lesson.enrollFree": "Inscreva-se gratuitamente",
		"lesson.nextLesson": "Próxima lição: {title}",
		"lesson.markComplete": "Marcar esta lição como concluída",
		"lesson.complete": "Lição concluída!",
		"lesson.saving": "A guardar...",
		"lesson.agentOnlyIncomplete":
			"Conclua esta lição no OpenCode para continuar.",
		"lesson.agentOnlyComplete": "Concluiu esta lição no OpenCode.",

		// Exercise page
		"exercise.label": "Exercício",
		"exercise.allExercises": "Todos os exercícios",
		"exercise.completed": "Concluiu este exercício!",
		"exercise.completedOn": "Concluiu este exercício a {date} {via}.",
		"exercise.nextExercise": "Próximo exercício: {title}",
		"exercise.markComplete": "Marcar este exercício como concluído",
		"exercise.complete": "Exercício concluído!",
		"exercise.saving": "A guardar...",
		"exercise.nudgeHeading": "Este exercício funciona melhor com o OpenCode",
		"exercise.nudgeBody":
			"Inscreva-se na OpenCode School para obter um ID de estudante. Depois cole o prompt do exercício no OpenCode, e ele guiá-lo-á passo a passo neste projeto.",
		"exercise.enrollFree": "Inscreva-se gratuitamente",

		// Exercises index
		"exercises.title": "Exercícios",
		"exercises.description":
			"Projetos práticos onde aplica o que aprendeu para construir coisas reais — websites, ferramentas multimédia, automação de navegador e muito mais.",
		"exercises.nudgeHeading": "Os exercícios funcionam melhor com o OpenCode",
		"exercises.nudgeBody":
			"Inscreva-se na OpenCode School para obter um ID de estudante. Depois cole o prompt do exercício no OpenCode, e ele guiá-lo-á em cada projeto passo a passo.",

		// Agent prompt
		"agentPrompt.label": "Prompt para o OpenCode",
		"agentPrompt.copy": "Copiar",
		"agentPrompt.copied": "Copiado! Agora cole no OpenCode...",

		// CTA buttons
		"cta.continue": "Continuar",
		"cta.start": "Começar",

		// About page
		"about.title": "Sobre a OpenCode School",
		"about.subtitle":
			"Um curso gratuito e de código aberto para aprender a usar o OpenCode.",
		"about.description":
			'A OpenCode School é um curso gratuito e ao seu ritmo para aprender a usar o agente de programação com IA <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer">OpenCode</a>. Apesar do nome, o OpenCode não é só para programadores: é para qualquer pessoa que queira construir coisas criativas no seu computador usando ferramentas de IA. Não é necessária conta — um ID de estudante aleatório é gerado localmente quando se inscreve. Este é um projeto comunitário, não um produto oficial da Anomaly. O curso é <a href="https://github.com/opencodeschool/opencode.school" target="_blank" rel="noopener noreferrer">código aberto</a> e <a href="https://github.com/opencodeschool/opencode.school" target="_blank" rel="noopener noreferrer">contribuições são bem-vindas</a>.',
		"about.builtWith": "Construído com e suportado por",

		// Tips page
		"tips.title": "Dicas e truques",
		"tips.subtitle":
			"Formas práticas de obter melhores resultados com o OpenCode.",

		// Troubleshooting page
		"troubleshooting.title": "Resolução de problemas",
		"troubleshooting.subtitle":
			"Dicas para resolver problemas com o OpenCode e este curso.",

		// Glossary page
		"glossary.title": "Glossário",
		"glossary.subtitle":
			"Definições de termos comuns usados na OpenCode School.",

		// Changelog page
		"changelog.title": "Alterações",
		"changelog.subtitle": "Novidades na OpenCode School.",

		// Disenroll page
		"disenroll.title": "Cancelar inscrição",
		"disenroll.notEnrolled":
			'Não está inscrito atualmente. <a href="/" class="underline">Vá para a página inicial</a> para se inscrever.',
		"disenroll.resetTitle": "Repor progresso",
		"disenroll.resetDescription":
			"Limpar todas as conclusões de lições e exercícios para poder refazê-los. O seu ID de estudante e perfil são mantidos.",
		"disenroll.resetButton": "Repor o meu progresso",
		"disenroll.resetDone":
			'O progresso foi reposto. O seu ID de estudante não foi alterado. <a href="/" class="underline">Vá para a página inicial</a> para recomeçar.',
		"disenroll.resetError":
			"Algo correu mal ao repor o seu progresso. Tente novamente ou cancele a inscrição.",
		"disenroll.resetResetting": "A repor\u2026",
		"disenroll.fullTitle": "Cancelar inscrição completamente",
		"disenroll.fullDescription":
			"Remover o seu ID de estudante, progresso e cor do tema deste navegador. Os seus dados no servidor não são afetados. Terá de se inscrever novamente para usar a OpenCode School.",
		"disenroll.fullButton": "Cancelar inscrição na OpenCode School",
		"disenroll.fullDone":
			"A sua inscrição foi cancelada. A redirecionar para a página inicial\u2026",
		"disenroll.configNote":
			'Se adicionou o URL de instruções da OpenCode School à sua configuração global do OpenCode, deve também remover a entrada <code class="text-sm bg-gray-100 dark:bg-stone-800 px-1 py-0.5 rounded">instructions</code> de <code class="text-sm bg-gray-100 dark:bg-stone-800 px-1 py-0.5 rounded">~/.config/opencode/opencode.json</code>.',

		// 404 page
		"404.title": "404",
		"404.message": "Página não encontrada.",
		"404.back": "Voltar às lições",

		// Language switcher
		"lang.switch": "Idioma",
	},
} as const;

type UIKey = keyof (typeof ui)["en"];

/**
 * Get a translated UI string. Returns the English fallback if the key
 * is missing in the target locale.
 */
export function t(key: UIKey, locale: Locale = "en"): string | string[] {
	const dict = ui[locale] || ui.en;
	const value = dict[key];
	if (value !== undefined) return value as string | string[];
	return (ui.en[key] as string | string[]) || key;
}
