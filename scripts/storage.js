
const STORAGE_KEYS = {
  nome: "nomeUsuario",
  xp: "xpFinal",
  concluido: "treinamentoConcluido"
};

function salvarNome(nome) {
  localStorage.setItem(STORAGE_KEYS.nome, String(nome).trim());
}

function pegarNome() {
  const nome = localStorage.getItem(STORAGE_KEYS.nome);
  return nome ? nome.trim() : "";
}

function salvarXP(xp) {
  const valor = Number.isFinite(Number(xp)) ? Number(xp) : 0;
  localStorage.setItem(STORAGE_KEYS.xp, String(Math.max(0, valor)));
}

function pegarXP() {
  const valor = Number(localStorage.getItem(STORAGE_KEYS.xp));
  return Number.isFinite(valor) ? valor : 0;
}

function marcarConcluido(valor = true) {
  localStorage.setItem(STORAGE_KEYS.concluido, valor ? "1" : "0");
}

function foiConcluido() {
  return localStorage.getItem(STORAGE_KEYS.concluido) === "1";
}

function limparProgressoTreinamento() {
  localStorage.removeItem(STORAGE_KEYS.xp);
  localStorage.removeItem(STORAGE_KEYS.concluido);
}
