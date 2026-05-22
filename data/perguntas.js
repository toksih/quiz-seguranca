const perguntas = [
  {
    capitulo: "ACOMPANHAMENTO NA UNIDADE",
    guia: "Comece pelo básico: ninguém circula sozinho sem necessidade.",
    pergunta: "Ao circular como visitante ou apoio externo, o correto é:",
    alternativas: [
      "Andar sozinho para ganhar tempo",
      "Permanecer acompanhado de um colaborador da unidade",
      "Entrar em qualquer área sem avisar",
      "Seguir apenas pela memória"
    ],
    correta: 1,
    feedbackCerto: "Isso mesmo! O acompanhamento ajuda a manter a segurança e a orientação no caminho certo.",
    feedbackErrado: "Quase! O visitante deve permanecer acompanhado de um colaborador da unidade.",
    avatar: "./assets/images/reactions/luna2.png",
    correctAvatar: "./assets/images/reactions/smile.png",
    wrongAvatar: "./assets/images/reactions/bad.png"
  },
  {
    capitulo: "IDENTIFICAÇÃO",
    guia: "Uma dica ele abre portas e também evita confusão na entrada.",
    pergunta: "Qual item deve ser usado para identificação dentro da unidade?",
    alternativas: [
      "Crachá",
      "Boné",
      "Relógio",
      "Fone de ouvido"
    ],
    correta: 0,
    feedbackCerto: "Perfeito! O crachá é obrigatório para identificação.",
    feedbackErrado: "Não é isso. O item certo é o crachá.",
    avatar: "./assets/images/reactions/luna3.png",
    correctAvatar: "./assets/images/reactions/smile.png",
    wrongAvatar: "./assets/images/reactions/bad.png"
  },
  {
    capitulo: "ACESSO A UNIDADE",
    guia: "Aqui a regra é simples: idade também faz parte da liberação.",
    pergunta: "Para acessar a área, a liberação é permitida somente para pessoas:",
    alternativas: [
      "Com menos de 18 anos",
      "Que estejam de férias",
      "Com 18 anos ou mais",
      "Que cheguem mais cedo"
    ],
    correta: 2,
    feedbackCerto: "Correto! O acesso é permitido apenas para 18+.",
    feedbackErrado: "Atenção: o acesso é permitido somente para maiores de 18 anos.",
    avatar: "./assets/images/reactions/luna4.png",
    correctAvatar: "./assets/images/reactions/smile.png",
    wrongAvatar: "./assets/images/reactions/bad.png"
  },
  {
    capitulo: "FOTOS E VÍDEOS",
    guia: "Registrar imagens sem permissão pode gerar problema para todo mundo.",
    pergunta: "Sobre filmar ou tirar fotos na unidade, a conduta correta é:",
    alternativas: [
      "Filmar livremente em qualquer área",
      "Pedir autorização antes de gravar",
      "Gravar escondido para não chamar atenção",
      "Filmar apenas corredores vazios"
    ],
    correta: 1,
    feedbackCerto: "Isso aí! Não é permitido filmar sem autorização.",
    feedbackErrado: "Não. O correto é pedir autorização antes de filmar ou fotografar.",
    avatar: "./assets/images/reactions/luna8.png",
    correctAvatar: "./assets/images/reactions/smile.png",
    wrongAvatar: "./assets/images/reactions/bad.png"
  },
  {
    capitulo: "PAUSA PARA FUMAR",
    guia: "A educação é importante!",
    pergunta: "Quando for fumar, o certo é:",
    alternativas: [
      "Fumar em qualquer lugar",
      "Fumar somente em local apropriado e descartar o resíduo no recipiente correto",
      "Jogar a bituca no chão depois",
      "Fumar perto da entrada da unidade"
    ],
    correta: 1,
    feedbackCerto: "Muito bom! Fumar apenas no local certo e descartar corretamente evita risco e sujeira.",
    feedbackErrado: "Não é isso. O correto é fumar apenas em local apropriado e descartar no recipiente indicado.",
    avatar: "./assets/images/reactions/luna6.png",
    correctAvatar: "./assets/images/reactions/smile.png",
    wrongAvatar: "./assets/images/reactions/bad.png"
  },
  {
    capitulo: "ALIMENTAÇÃO",
    guia: "Lugar de comer também faz parte da regra de segurança e organização.",
    pergunta: "Na unidade, você deve:",
    alternativas: [
      "Comer em qualquer setor",
      "Comer somente no local permitido",
      "Comer enquanto caminha",
      "Levar alimento para áreas restritas"
    ],
    correta: 1,
    feedbackCerto: "Perfeito! Alimentação só no local permitido.",
    feedbackErrado: "Quase! O correto é comer somente no local permitido.",
    avatar: "./assets/images/reactions/luna7.png",
    correctAvatar: "./assets/images/reactions/smile.png",
    wrongAvatar: "./assets/images/reactions/bad.png"
  },
  {
    capitulo: "SINALIZAÇÃO E RESTRIÇÃO",
    guia: "Preste atenção nas placas: elas orientam o caminho seguro.",
    pergunta: "Ao ver uma placa de aviso ou uma área restrita, você deve:",
    alternativas: [
      "Ignorar a sinalização",
      "Entrar mesmo sem permissão",
      "Observar e seguir a orientação indicada",
      "Passar por baixo da fita de isolamento"
    ],
    correta: 2,
    feedbackCerto: "Isso! Atenção à sinalização e respeito às áreas restritas fazem diferença.",
    feedbackErrado: "Não é isso. O correto é observar e seguir a orientação da sinalização.",
    avatar: "./assets/images/reactions/luna5.png",
    correctAvatar: "./assets/images/reactions/smile.png",
    wrongAvatar: "./assets/images/reactions/bad.png"
  },
  {
    capitulo: "DESLOCAMENTO SEGURO",
    guia: "Sem pressa e sem distração: caminhar certo evita acidente.",
    pergunta: "Ao se deslocar pela unidade, qual atitude é a mais segura?",
    alternativas: [
      "Correr para chegar rápido",
      "Usar o celular enquanto caminha",
      "Andar com atenção, sem correr e sem distrações",
      "Mudar de direção sem olhar"
    ],
    correta: 2,
    feedbackCerto: "Boa! Andar com atenção e sem correr reduz muito o risco de acidente.",
    feedbackErrado: "A opção correta é andar com atenção, sem correr e sem distrações.",
    avatar: "./assets/images/reactions/luna11.png",
    correctAvatar: "./assets/images/reactions/smile.png",
    wrongAvatar: "./assets/images/reactions/bad.png"
  },
  {
    capitulo: "ESCADAS E VELOCIDADE",
    guia: "Corrimão e limite de velocidade são parte da rotina segura.",
    pergunta: "Em escadas e áreas internas, qual prática está correta?",
    alternativas: [
      "Subir sem usar o corrimão e correr",
      "Segurar o corrimão e respeitar a velocidade de até 20 km/h",
      "Acelerar para terminar antes",
      "Descer olhando o celular"
    ],
    correta: 1,
    feedbackCerto: "Excelente! Usar o corrimão e respeitar até 20 km/h ajuda a evitar quedas e colisões.",
    feedbackErrado: "Não. O correto é usar o corrimão e respeitar a velocidade de até 20 km/h.",
    avatar: "./assets/images/reactions/luna4.png",
    correctAvatar: "./assets/images/reactions/smile.png",
    wrongAvatar: "./assets/images/reactions/bad.png"
  },
  {
    capitulo: "ACESSO AO ARMAZÉM",
    guia: "No armazenamento, cada detalhe conta: roupa, EPI e emergência.",
    pergunta: "Ao acessar o armazém, qual opção reúne as condutas corretas?",
    alternativas: [
      "Entrar com qualquer calçado e sem EPI",
      "Usar calçado adequado, EPIs obrigatórios, procurar o EHS para altura, deixar os pertences em emergência e chamar EHS ou brigadista em acidente",
      "Fazer trabalho em altura sem avisar ninguém",
      "Em emergência, levar os pertences e continuar no celular"
    ],
    correta: 1,
    feedbackCerto: "Perfeito! No armazém, o correto é usar calçado adequado, EPIs obrigatórios, seguir o EHS na altura, deixar os pertences em emergência e procurar EHS ou brigadista em acidente.",
    feedbackErrado: "Quase! No armazém, use calçado adequado, EPIs obrigatórios, siga o EHS para altura, deixe os pertences em emergência e procure EHS ou brigadista em caso de acidente.",
    avatar: "./assets/images/reactions/luna3.png",
    correctAvatar: "./assets/images/reactions/smile.png",
    wrongAvatar: "./assets/images/reactions/bad.png"
  }
];
