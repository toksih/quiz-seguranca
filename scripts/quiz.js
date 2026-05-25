const nome = pegarNome() || "COLABORADOR";
if (!pegarNome()) {
  window.location.href = "index.html";
}

// O quiz sempre começa do zero ao abrir a página.
limparProgressoTreinamento();
salvarXP(0);

const REACTIONS = {
  correct: "./assets/images/reactions/smile.png",
  wrong: "./assets/images/reactions/bad.png",
};

const questionNumber = document.getElementById("questionNumber");
const xpValue = document.getElementById("xpValue");
const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");
const helloText = document.getElementById("helloText");
const guideText = document.getElementById("guideText");
const chapterTag = document.getElementById("chapterTag");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const feedback = document.getElementById("feedback");
const lunaMood = document.getElementById("lunaMood");
const guideAvatar = document.getElementById("guideAvatar");
const quizCard = document.getElementById("quizCard");
const bgMusic = document.getElementById("bgMusic");
const nextButton = document.getElementById("nextButton");

function startQuizMusic() {
  if (!bgMusic) return;
  if (sessionStorage.getItem("quizMusicEnabled") !== "1") return;

  sessionStorage.removeItem("quizMusicEnabled");
  bgMusic.volume = 0.2;
  const playPromise = bgMusic.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {});
  }
}

const questionThemes = [
  { title: "ACOMPANHAMENTO", accent: "#71e9ff", accentSoft: "rgba(113,233,255,.18)", bg1: "#1a2f54", bg2: "#0c1425", mood: "normal" },
  { title: "IDENTIFICAÇÃO", accent: "#ffd35a", accentSoft: "rgba(255,211,90,.18)", bg1: "#2f2553", bg2: "#0b1020", mood: "thinking" },
  { title: "ACESSO 18+", accent: "#78ffb8", accentSoft: "rgba(120,255,184,.16)", bg1: "#15364a", bg2: "#08101f", mood: "guide" },
  { title: "FOTOS E VÍDEOS", accent: "#ffbf64", accentSoft: "rgba(255,191,100,.18)", bg1: "#45254a", bg2: "#120b18", mood: "alert" },
  { title: "PAUSA PARA FUMAR", accent: "#ff7b88", accentSoft: "rgba(255,123,136,.2)", bg1: "#561b2b", bg2: "#12060d", mood: "guide" },
  { title: "ALIMENTAÇÃO", accent: "#8ef5ff", accentSoft: "rgba(142,245,255,.16)", bg1: "#214560", bg2: "#07121b", mood: "normal" },
  { title: "SINALIZAÇÃO", accent: "#c5ff6a", accentSoft: "rgba(197,255,106,.18)", bg1: "#35572a", bg2: "#07120b", mood: "thinking" },
  { title: "DESLOCAMENTO", accent: "#b78cff", accentSoft: "rgba(183,140,255,.18)", bg1: "#39265d", bg2: "#090812", mood: "guide" },
  { title: "ESCADAS", accent: "#ffa95f", accentSoft: "rgba(255,169,95,.18)", bg1: "#4c2c15", bg2: "#110b08", mood: "alert" },
  { title: "ARMAZÉM", accent: "#78ffb8", accentSoft: "rgba(120,255,184,.18)", bg1: "#123a37", bg2: "#060a10", mood: "celebrate" }
];

let currentQuestion = 0;
let xp = 0;
let locked = false;
let answered = false;

function applyTheme(index) {
  const theme = questionThemes[index] || questionThemes[questionThemes.length - 1];
  appHelpers.setCssVars({
    "--accent": theme.accent,
    "--accent-soft": theme.accentSoft,
    "--bg-1": theme.bg1,
    "--bg-2": theme.bg2
  });
  chapterTag.textContent = theme.title;
  lunaMood.dataset.mood = theme.mood;
  quizCard.style.setProperty("--accent-local", theme.accent);
}

function renderHud() {
  const total = perguntas.length;
  questionNumber.textContent = `PERGUNTA ${currentQuestion + 1}/${total}`;
  const percent = Math.round((currentQuestion / total) * 100);
  progressFill.style.width = `${percent}%`;
  progressPercent.textContent = `${percent}%`;
}

function updateXP(animate = false) {
  const previous = Number(xpValue.textContent || "0");
  if (animate) {
    appHelpers.animateValue(xpValue, previous, xp, 360, (value) => String(value));
  } else {
    xpValue.textContent = String(xp);
  }
  salvarXP(xp);
}

function setFeedback(message, state) {
  feedback.textContent = message;
  feedback.className = `feedback-box ${state || ""}`.trim();
}

function setAvatar(src, alt, mood, pillText) {
  if (guideAvatar && src) {
    guideAvatar.src = src;
    guideAvatar.alt = alt || "Guia do treinamento";
  }
  if (mood) {
    lunaMood.dataset.mood = mood;
  }
  const pill = lunaMood.querySelector(".mood-pill");
  if (pill && pillText) {
    pill.textContent = pillText;
  }
}

function buildOptionButton(optionText, optionIndex) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "option-card";
  button.setAttribute("aria-label", optionText);

  const mark = document.createElement("span");
  mark.className = "option-mark";
  mark.textContent = String(optionIndex + 1).padStart(2, "0");

  const copy = document.createElement("div");
  copy.className = "option-copy";

  const kicker = document.createElement("span");
  kicker.className = "option-kicker";
  kicker.textContent = `ESCOLHA ${String(optionIndex + 1).padStart(2, "0")}`;

  const title = document.createElement("p");
  title.className = "option-title";
  title.textContent = optionText;

  copy.append(kicker, title);

  const status = document.createElement("span");
  status.className = "option-status";
  status.textContent = "TOCAR";

  button.append(mark, copy, status);
  button.addEventListener("click", () => handleAnswer(optionIndex));
  return button;
}

function renderQuestion() {
  const pergunta = perguntas[currentQuestion];
  if (!pergunta) {
    concludeQuiz();
    return;
  }

  applyTheme(currentQuestion);
  locked = false;
  answered = false;
  nextButton.style.display = "none";

  const avatarPadrao = pergunta.avatar || "./assets/images/reactions/luna.png";
  setAvatar(
    avatarPadrao,
    `Luna na pergunta ${currentQuestion + 1}`,
    pergunta.mood || "normal",
    pergunta.capitulo || "GUIA"
  );

  const nomeFormatado = nome.toUpperCase();
  const enunciado = pergunta.pergunta.replace("[nome]", nomeFormatado);

  helloText.textContent = `Olá, ${nomeFormatado}!`;
  guideText.textContent = pergunta.guia || "Siga a missão e toque na opção certa.";
  questionText.textContent = enunciado;
  feedback.textContent = "";
  feedback.className = "feedback-box";
  optionsContainer.innerHTML = "";

  renderHud();
  updateXP(false);

  pergunta.alternativas.forEach((alternativa, index) => {
    const button = buildOptionButton(alternativa, index);
    optionsContainer.appendChild(button);
  });
}

function handleAnswer(selectedIndex) {
  if (locked) return;
  locked = true;
  answered = true;

  const pergunta = perguntas[currentQuestion];
  const buttons = [...optionsContainer.querySelectorAll(".option-card")];
  const correctIndex = pergunta.correta;
  const isCorrect = selectedIndex === correctIndex;

  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === correctIndex) {
      btn.classList.add("correct");
      btn.querySelector(".option-status").textContent = "CORRETO";
    } else if (index === selectedIndex && !isCorrect) {
      btn.classList.add("wrong");
      btn.querySelector(".option-status").textContent = "ERRADO";
    } else {
      btn.style.opacity = "0.82";
    }
  });

  if (isCorrect) {
    xp += 10;
    setAvatar(
      REACTIONS.correct,
      "Luna sorrindo após o acerto",
    );
    setFeedback(`✔ ${pergunta.feedbackCerto} +10 XP`, "success");
    guideText.textContent = pergunta.feedbackCerto;
    appHelpers.vibrate([12, 28, 12]);
  } else {
    setAvatar(
      REACTIONS.wrong,
      "Luna reagindo ao erro",
      "warn",
    );
    setFeedback(`✖ ${pergunta.feedbackErrado}`, "fail");
    guideText.textContent = pergunta.feedbackErrado;
    appHelpers.vibrate([28, 20, 28]);
  }

  updateXP(true);
  renderHud();
  appHelpers.flashElement(quizCard, "shimmer", 800);

  nextButton.style.display = "block";
}

function goToNextQuestion() {
  if (!answered) return;
  currentQuestion += 1;
  if (currentQuestion >= perguntas.length) {
    concludeQuiz();
    return;
  }
  renderQuestion();
}

nextButton.addEventListener("click", goToNextQuestion);

function concludeQuiz() {
  marcarConcluido(xp >= 50);
  salvarXP(xp);

  if (bgMusic) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
  }

  window.location.href = "resultado.html";
}
renderQuestion();
startQuizMusic();
