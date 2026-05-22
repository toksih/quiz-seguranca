
const welcomeTitle = document.getElementById("welcomeTitle");
const lunaSpeech = document.getElementById("lunaSpeech");
const nextButton = document.getElementById("nextButton");
const introTag = document.getElementById("introTag");

const nome = pegarNome() || "COLABORADOR";

if (!pegarNome()) {
  window.location.href = "index.html";
}

welcomeTitle.textContent = `BEM-VINDO(A), ${nome.toUpperCase()}`;
introTag.textContent = "MISSÃO DE SEGURANÇA";

const mensagem = [
  `Olá, ${nome.toUpperCase()}. Eu sou a Luna e vou guiar você nesta missão.`,
  "Aqui, cada tela funciona como uma etapa do jogo: leia, observe e toque com atenção.",
  "São 10 perguntas. Cada acerto vale +10 XP. Para aprovar, você precisa chegar a pelo menos 80 XP.",
  "Quando estiver pronto(a), toque no botão e responda o quiz para liberar seu acesso a unidade!"
];

function typeLines(lines, target, speed = 18) {
  target.innerHTML = "";
  const container = document.createElement("div");
  container.className = "typing-lines";
  target.appendChild(container);

  let lineIndex = 0;
  let charIndex = 0;
  let currentLine = null;

  function ensureLine() {
    if (!currentLine) {
      currentLine = document.createElement("p");
      currentLine.className = "typing-line";
      container.appendChild(currentLine);
    }
  }

  function step() {
    if (lineIndex >= lines.length) {
      const cursor = document.createElement("span");
      cursor.className = "typed-cursor";
      cursor.textContent = "▌";
      container.appendChild(cursor);
      nextButton.disabled = false;
      nextButton.textContent = "COMEÇAR";
      return;
    }

    ensureLine();
    currentLine.textContent = lines[lineIndex].slice(0, charIndex + 1);

    charIndex += 1;
    if (charIndex > lines[lineIndex].length) {
      lineIndex += 1;
      charIndex = 0;
      currentLine = null;
      if (lineIndex < lines.length) {
        const gap = document.createElement("div");
        gap.style.height = "8px";
        container.appendChild(gap);
      }
    }

    window.setTimeout(step, speed);
  }

  step();
}

nextButton.disabled = true;
nextButton.textContent = "CARREGANDO...";
typeLines(mensagem, lunaSpeech, 18);

nextButton.addEventListener("click", () => {
  sessionStorage.setItem("quizMusicEnabled", "1");
  appHelpers.vibrate(16);
  window.location.href = "quiz.html";
});
