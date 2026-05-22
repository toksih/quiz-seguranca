
const form = document.getElementById("startForm");
const nameInput = document.getElementById("nameInput");
const homeHint = document.getElementById("homeHint");

const previousName = pegarNome();
if (previousName && nameInput) {
  nameInput.value = previousName;
}

function setHint(message, tone = "info") {
  if (!homeHint) return;
  homeHint.textContent = message;
  homeHint.dataset.tone = tone;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = appHelpers.sanitizeName(nameInput.value);

  if (!nome) {
    setHint("Digite seu nome para iniciar a missão.", "error");
    nameInput.focus();
    appHelpers.flashElement(form, "shimmer", 700);
    appHelpers.vibrate(30);
    return;
  }

  salvarNome(nome);
  limparProgressoTreinamento();
  marcarConcluido(false);
  setHint("Nome salvo. Abrindo o briefing...", "success");
  appHelpers.vibrate(18);
  window.location.href = "introducao.html";
});

nameInput.addEventListener("input", () => {
  if (homeHint && homeHint.dataset.tone === "error") {
    homeHint.textContent = "";
    delete homeHint.dataset.tone;
  }
});
