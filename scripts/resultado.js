
const nome = pegarNome() || "COLABORADOR";
const xp = pegarXP();
const aprovado = xp >= 80;

const resultBadge = document.getElementById("resultBadge");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const resultHint = document.getElementById("resultHint");
const xpFinal = document.getElementById("xpFinal");
const resultAvatarWrap = document.getElementById("resultAvatarWrap");
const resultAvatar = document.getElementById("resultAvatar");
const actionButton = document.getElementById("actionButton");
const statStatus = document.getElementById("statStatus");
const statStatusMirror = document.getElementById("statStatusMirror");
const statLevel = document.getElementById("statLevel");
const resultGlow = document.getElementById("resultGlow");

appHelpers.setBodyScene("result", aprovado ? "pass" : "fail");
document.body.dataset.outcome = aprovado ? "pass" : "fail";

const level = appHelpers.getLevelLabel(xp);
const statusText = aprovado ? "APROVADO" : "REPROVADO";

resultAvatarWrap.dataset.mood = aprovado ? "celebrate" : "alert";
if (resultAvatar) {
  resultAvatar.src = aprovado
    ? "./assets/images/reactions/aproved.png"
    : "./assets/images/reactions/reproved.png";
  resultAvatar.alt = aprovado ? "Luna aprovada" : "Luna reprovada";
}

statStatus.textContent = statusText;
statStatusMirror.textContent = statusText;
statLevel.textContent = level;
actionButton.textContent = aprovado ? "FINALIZAR" : "REFAZER TREINAMENTO";

if (aprovado) { 
  resultBadge.textContent = "MISSÃO CONCLUÍDA";
  resultTitle.textContent = `PARABÉNS, ${nome.toUpperCase()}!`;
  resultMessage.textContent = `Você fechou o treinamento com ${xp} XP e liberou a próxima etapa da jornada.`;
  resultHint.textContent = "A Luna aprovou sua passagem. Continue atento(a) às rotinas de segurança.";
  resultGlow.textContent = "✦";
} else {
  resultBadge.textContent = "MISSÃO PENDENTE";
  resultTitle.textContent = `QUASE LÁ, ${nome.toUpperCase()}!`;
  resultMessage.textContent = `Você terminou com ${xp} XP. Para aprovação, o mínimo é 50 XP.`;
  resultHint.textContent = "Reveja o briefing e tente novamente para subir sua classificação.";
  resultGlow.textContent = "⚠";
}

appHelpers.animateValue(xpFinal, 0, xp, 700, (value) => String(value));

actionButton.addEventListener("click", () => {
  limparProgressoTreinamento();
  appHelpers.vibrate(16);
  window.location.href = aprovado ? "index.html" : "introducao.html";
});
