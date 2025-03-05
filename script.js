// Configuração do Quiz
const quizData = {
  stages: [
    {
      series: "O Rei Leão",
      image: "images/leao.webp",
      question: {
        text: "Qual é o nome do pai de Simba?",
        options: [
          "Scar",
          "Timão",
          "Mufasa",
          "Zazu",
        ],
        correct: 2,
      },
      reward: 33,
    },
    {
      series: "A Bela e a Fera",
      image: "images/bela.jpg",
      question: {
        text: "Qual é o objeto mágico que conta o tempo para a maldição ser quebrada?",
        options: [
          "Um espelho",
          "Uma rosa encantada",
          "Um relógio de bolso",
          "Um livro",
        ],
        correct: 1,
      },
      reward: 31,
    },
    {
      series: "Aladdin",
      image: "images/aladdin.webp",
      question: {
        text: "Qual é o nome do vilão principal?",
        options: [
          "Jafar",
          "Abu",
          "Sultão",
          "Gênio",
        ],
        correct: 0,
      },
      reward: 47,
    },
    {
      series: "Frozen",
      image: "images/frozen.webp",
      question: {
        text: "Qual é a música icônica cantada por Elsa?",
        options: [
          "Sentir o Vento Soprar",
          "O Amor Está no Ar",
          "Minha Casa",
          "Let It Go",
        ],
        correct: 3,
      },
      reward: 43,
    },
    {
      series: "Procurando Nemo",
      image: "images/nemo.webp",
      question: {
        text: "Qual é o nome da peixinha esquecida que ajuda Marlin?",
        options: [
          "Coral",
          "Dory",
          "Bruce",
          "Crush",
        ],
        correct: 1,
      },
      reward: 52,
    },
    {
      series: "A Bela Adormecida",
      image: "images/bela2.webp",
      question: {
        text: "Qual é o nome da princesa que fura o dedo em uma roca de fiar?",
        options: [
          "Cinderela",
          "Aurora",
          "Branca de Neve",
          "Rapunzel",
        ],
        correct: 1,
      },
      reward: 32,
    },
    {
      series: "Toy Story",
      image: "images/toysndndn.jpg",
      question: {
        text: "Qual é o melhor amigo do Woody?",
        options: [
          "Buzz Lightyear",
          "Rex",
          "Sr. Cabeça de Batata",
          "Porquinho",
        ],
        correct: 0,
      },
      reward: 27,
    },
    {
      series: "Enrolados",
      image: "images/enrolados.webp",
      question: {
        text: "Qual é o nome do camaleão de Rapunzel?",
        options: [
          "Pascal",
          "Maximus",
          "Flit",
          "Sebastian",
        ],
        correct: 0,
      },
      reward: 38,
    },
    {
      series: "Moana",
      image: "images/moana.webp",
      question: {
        text: "Quem é o semideus que a acompanha na jornada?",
        options: [
          "Tamatoa",
          "Maui",
          "Heihei",
          "Te Fiti",
        ],
        correct: 1,
      },
      reward: 21,
    },
    {
      series: "Branca de Neve",
      image: "images/branca.jpg",
      question: {
        text: "Quantos anões acompanham Branca de Neve?",
        options: [
          "Cinco",
          "Seis",
          "Sete",
          "Oito",
        ],
        correct: 2,
      },
      reward: 30,
    },
  ],
};

// Estado do aplicativo
const state = {
  currentStage: 0,
  balance: 0,
  isPopupVisible: false,
  quizCompleted: false,
  selectedPixType: null,
};

// Função para salvar o estado no localStorage
function saveState() {
  const stateToSave = {
    currentStage: state.currentStage,
    balance: state.balance,
    quizCompleted: state.quizCompleted,
  };
  localStorage.setItem("quizState", JSON.stringify(stateToSave));
}

// Função para carregar o estado do localStorage
function loadState() {
  const savedState = localStorage.getItem("quizState");
  if (savedState) {
    const parsedState = JSON.parse(savedState);
    state.currentStage = parsedState.currentStage;
    state.balance = parsedState.balance;
    state.quizCompleted = parsedState.quizCompleted;

    // Atualiza a UI com base no estado carregado
    dom.updateBalance(state.balance);

    if (state.quizCompleted) {
      mostrarPagina("saque");
    } else {
      displayQuestion();
    }
  }
}

// Funções de utilidade
const utils = {
  formatCurrency: (value) => value.toFixed(2),
  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  validatePixKey: (key, type) => {
    switch (type) {
      case "cpf":
        return /^\d{11}$/.test(key);
      case "phone":
        return /^\d{11}$/.test(key);
      case "email":
        return utils.validateEmail(key);
      case "random":
        return /^[a-zA-Z0-9-]{36}$/.test(key);
      default:
        return false;
    }
  },
};

// Manipulação do DOM
const dom = {
  get: (id) => document.getElementById(id),
  query: (selector) => document.querySelector(selector),
  queryAll: (selector) => document.querySelectorAll(selector),
  hide: (element) => (element.style.display = "none"),
  show: (element) => (element.style.display = "block"),
  toggleOverlay: (show) => {
    const overlay = dom.get("overlay");
    if (overlay) {
      overlay.style.display = show ? "block" : "none";
    }
  },
  updateBalance: (amount) => {
    state.balance = amount;
    dom.get("balance").textContent = utils.formatCurrency(amount);
    saveState(); // Salva o estado sempre que o saldo é atualizado
  },
};

// Gerenciamento de interação
const interaction = {
  disable: () => {
    const options = dom.queryAll(".option");
    const submitBtn = dom.get("submit-btn");
    options.forEach((opt) => (opt.style.pointerEvents = "none"));
    if (submitBtn) submitBtn.style.pointerEvents = "none";
  },
  enable: () => {
    const options = dom.queryAll(".option");
    const submitBtn = dom.get("submit-btn");
    options.forEach((opt) => (opt.style.pointerEvents = "auto"));
    if (submitBtn) submitBtn.style.pointerEvents = "auto";
  },
};

// Funções principais
function mostrarPagina(pagina) {
  ["inicio", "saque", "bonus"].forEach((p) => dom.hide(dom.get(p)));

  // Hide all popups
  const popup = dom.get("popupL");
  const securityPopup = dom.get("securityFeePopup");
  if (popup) dom.hide(popup);
  if (securityPopup) dom.hide(securityPopup);

  dom.toggleOverlay(false);
  dom.show(dom.get(pagina));

  if (pagina === "saque") {
    dom.get("saldo-saque").textContent = utils.formatCurrency(state.balance);

    // Define o valor do input de saque igual ao balance
    const withdrawInput = dom.get("withdraw-amount-input");
    withdrawInput.value = `R$ ${utils.formatCurrency(state.balance)}`;

    // Reset PIX input
    const pixInput = dom.get("pix-key-input");
    pixInput.value = "";
    pixInput.disabled = true;
    pixInput.placeholder = "Selecione seu tipo de chave PIX";

    // Reset PIX option selection
    state.selectedPixType = null;
    dom
      .queryAll(".pix-option")
      .forEach((opt) => opt.classList.remove("selected"));
  }

  if (pagina === "inicio" && state.quizCompleted) {
    showCompletionPopup();
    return;
  }

  // Atualizar ícones do menu
  const menuIcons = dom.queryAll(".menuemb span");
  menuIcons.forEach((icon) => (icon.style.color = "rgb(101, 101, 101)"));

  const currentIcon = dom.query(
    `.menuemb a[onclick="mostrarPagina('${pagina}')"] span`
  );
  if (currentIcon) currentIcon.style.color = "#00d7ff";
}

function displayQuestion() {
  try {
    const stage = quizData.stages[state.currentStage];
    if (!stage) throw new Error("Estágio não encontrado");

    dom.get("series-title").textContent = stage.series;

    const seriesImage = dom.get("series-image");
    seriesImage.src = stage.image;
    seriesImage.onerror = () => {
      seriesImage.src = "img/fallback-image.jpg";
      console.error("Erro ao carregar imagem:", stage.image);
    };

    const questionsContainer = dom.get("questions");
    questionsContainer.innerHTML = "";

    const questionDiv = document.createElement("div");
    questionDiv.className = "question";

    const questionTitle = document.createElement("h4");
    questionTitle.textContent = stage.question.text;
    questionDiv.appendChild(questionTitle);

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";

    stage.question.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.className = "option";
      button.textContent = option;
      button.onclick = () => !state.isPopupVisible && selectOption(index);
      optionsDiv.appendChild(button);
    });

    questionDiv.appendChild(optionsDiv);
    questionsContainer.appendChild(questionDiv);
    interaction.enable();
  } catch (error) {
    console.error("Erro ao exibir questão:", error);
    alert("Ocorreu um erro ao carregar a questão. Por favor, tente novamente.");
  }
}

function selectOption(optionIndex) {
  if (state.isPopupVisible) return;

  const options = dom.queryAll(".option");
  options.forEach((opt) => opt.classList.remove("selected"));
  options[optionIndex].classList.add("selected");
}

function showRewardPopup(reward) {
  try {
    state.isPopupVisible = true;
    const popup = dom.get("popupB2");
    const rewardText = popup.querySelector(
      '.popup-text[style*="font-size: 40px"]'
    );

    if (!rewardText) throw new Error("Elemento de recompensa não encontrado");

    rewardText.style.color = "#00d7ff";
    rewardText.textContent = `R$ ${utils.formatCurrency(reward)}`;

    dom.show(popup);
    dom.toggleOverlay(true);
    interaction.disable();
    dom.query(".menuemb").style.pointerEvents = "none";

    setTimeout(() => {
      dom.hide(popup);
      dom.toggleOverlay(false);
      state.isPopupVisible = false;
      dom.query(".menuemb").style.pointerEvents = "auto";

      // Atualiza o saldo e avança para próxima pergunta apenas após o popup fechar
      dom.updateBalance(state.balance + reward);
      state.currentStage++;
      saveState(); // Salva o estado com o novo saldo e estágio

      if (state.currentStage < quizData.stages.length) {
        displayQuestion();
      } else {
        state.quizCompleted = true;
        saveState(); // Salva o estado quando o quiz é completado
        showCompletionPopup();
      }
    }, 2000);
  } catch (error) {
    console.error("Erro ao mostrar popup de recompensa:", error);
    alert(
      "Ocorreu um erro ao mostrar sua recompensa. Por favor, tente novamente."
    );
  }
}

function submitAnswer() {
  if (state.isPopupVisible) return;

  const selectedOption = dom.query(".option.selected");

  if (!selectedOption) {
    alert("Por favor, selecione uma resposta antes de enviar!");
    return;
  }

  const currentReward = quizData.stages[state.currentStage].reward;
  showRewardPopup(currentReward);
}

function showCompletionPopup() {
  try {
    const mainElement = dom.query("main");
    if (!mainElement) throw new Error("Elemento main não encontrado");

    mainElement.innerHTML = `
      <div class="popup-containerL" id="popupL" style="display: block;">
        <div id="container-progresso" style="display: flex; margin: 0 auto; width: 300px; height: 300px;">
          <svg id="barra-progresso-svg" viewBox="0 0 36 36">
            <circle cx="18" cy="18" fill="none" r="16" stroke="#ccc" stroke-width="3"></circle>
            <circle cx="18" cy="18" fill="none" id="minha-barra-progresso" r="16" stroke="#00d7ff" stroke-dasharray="0 1000" stroke-width="3"></circle>
          </svg>
          <div id="texto-progresso">
            <span id="valor-saque" style="font-family: 'Montserrat', sans-serif; font-size: 23px;">R$ ${utils.formatCurrency(state.balance)}</span>
            <span style="font-family: 'Montserrat', sans-serif; color: #e5e5e5; font-size: 14px;">Seu saldo subiu!</span>
          </div>
        </div>
        <p style="font-family: 'Montserrat', sans-serif; font-size: 32px; color: #00d7ff; text-align: center; margin-top: 15px; margin-bottom: 10px;">
          Parabéns!
        </p>
        <p class="popup-textL" style="margin-bottom: 20px; font-size: 18px; color: #e5e5e5; text-align: center; line-height: 1.4;">
          Você atingiu seu<br>limite diário!
        </p>
        <button class="desbloquear-button" onclick="goToSaque()" style="font-weight: bold; font-size: 18px; border-radius: 12px; margin-top: 15px;">
          SAQUE AGORA
        </button>
      </div>
    `;
    dom.toggleOverlay(true);
  } catch (error) {
    console.error("Erro ao mostrar popup de conclusão:", error);
    alert("Ocorreu um erro ao finalizar o quiz. Por favor, tente novamente.");
  }
}

function goToSaque() {
  state.isPopupVisible = false;
  dom.toggleOverlay(false);
  const popup = dom.get("popupL");
  if (popup) dom.hide(popup);
  mostrarPagina("saque");
}

function formatPixInput(input, type) {
  let value = input.value.replace(/\D/g, "");

  switch (type) {
    case "cpf":
      if (value.length <= 11) {
        // CPF
        if (value.length > 9)
          value = value.replace(
            /(\d{3})(\d{3})(\d{3})(\d{0,2})/,
            "$1.$2.$3-$4"
          );
        else if (value.length > 6)
          value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
        else if (value.length > 3)
          value = value.replace(/(\d{3})(\d{0,3})/, "$1.$2");
        else value = value.replace(/^(\d{0,3})/, "$1");
      } else {
        // CNPJ
        if (value.length > 12)
          value = value.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/,
            "$1.$2.$3/$4-$5"
          );
        else if (value.length > 8)
          value = value.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{0,4})/,
            "$1.$2.$3/$4"
          );
        else if (value.length > 5)
          value = value.replace(/^(\d{2})(\d{3})(\d{0,3})/, "$1.$2.$3");
        else if (value.length > 2)
          value = value.replace(/^(\d{2})(\d{0,3})/, "$1.$2");
        else value = value.replace(/^(\d{0,2})/, "$1");
      }
      break;
    case "phone":
      if (value.length > 6)
        value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
      else if (value.length > 2)
        value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
      else value = value.replace(/^(\d{0,2})/, "($1");
      break;
    case "email":
      // Email não precisa de formatação
      value = input.value.toLowerCase();
      break;
    case "random":
      // Chave aleatória não precisa de formatação
      value = input.value;
      break;
  }

  input.value = value;
}

function validateWithdrawal() {
  // Remove any existing error messages
  const existingErrors = document.querySelectorAll(".saque-error");
  existingErrors.forEach((error) => error.remove());

  // Get the necessary elements
  const pixKeyInput = document.querySelector(".pix-input");
  const withdrawInput = document.querySelector("#withdraw-amount-input");
  const saqueBtn = document.querySelector(".saque-btn");
  const selectedOption = document.querySelector(".pix-option.selected");

  // Create error message element with auto-hide
  const createError = (message) => {
    const error = document.createElement("div");
    error.className = "saque-error show";
    error.innerHTML = `
      <span class="error-icon material-symbols-outlined">error</span>
      <span class="saque-error-text">${message}</span>
    `;

    // Auto-hide after 5 seconds
    setTimeout(() => {
      error.style.opacity = "0";
      setTimeout(() => {
        error.remove();
      }, 300); // Wait for fade out animation
    }, 5000);

    return error;
  };

  // Validation checks
  if (state.balance <= 0) {
    const error = createError("Seu saldo está zerado");
    withdrawInput.parentNode.insertBefore(error, saqueBtn);
    return false;
  }

  if (!selectedOption) {
    const error = createError("Selecione primeiro seu tipo de chave PIX");
    withdrawInput.parentNode.insertBefore(error, saqueBtn);
    return false;
  }

  if (!pixKeyInput.value.trim()) {
    const error = createError("Digite primeiro sua chave PIX");
    withdrawInput.parentNode.insertBefore(error, saqueBtn);
    return false;
  }

  // Validate PIX key format based on type
  const pixType = state.selectedPixType;
  const pixValue = pixKeyInput.value.trim();
  let isValid = true;
  let errorMessage = "";

  switch (pixType) {
    case "phone":
      if (!/^\(\d{2}\)\s\d{5}-\d{4}$/.test(pixValue)) {
        errorMessage = "Digite um número de telefone válido";
        isValid = false;
      }
      break;
    case "email":
      if (!utils.validateEmail(pixValue)) {
        errorMessage = "Digite um e-mail válido";
        isValid = false;
      }
      break;
    case "cpf":
      // Remove formatting to check length
      const numbers = pixValue.replace(/\D/g, "");
      if (numbers.length !== 11 && numbers.length !== 14) {
        errorMessage = "Digite um CPF/CNPJ válido!";
        isValid = false;
      }
      break;
  }

  if (!isValid) {
    const error = createError(errorMessage);
    withdrawInput.parentNode.insertBefore(error, saqueBtn);
    return false;
  }

  return true;
}

function showSecurityFeePopup() {
  // Validate before showing popup
  if (!validateWithdrawal()) {
    return;
  }

  const popup = dom.get("securityFeePopup");
  const overlay = dom.get("overlay");

  // Show popup and overlay
  dom.show(popup);
  dom.show(overlay);

  // Auto scroll to bottom after 2 seconds
  setTimeout(() => {
    window.scroll({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }, 2000);

  // Close popup when clicking outside
  overlay.onclick = () => {
    dom.hide(popup);
    dom.hide(overlay);
  };
}

function selectPixOption(button, type) {
  state.selectedPixType = type;
  const options = dom.queryAll(".pix-option");
  options.forEach((opt) => opt.classList.remove("selected"));
  button.classList.add("selected");

  const pixInput = dom.query(".pix-input");
  const withdrawInput = dom.query(".pix-input:last-child");

  // Habilita e configura o input PIX
  pixInput.disabled = false;
  pixInput.value = "";

  // Configura o placeholder e maxlength de acordo com o tipo
  switch (type) {
    case "cpf":
      pixInput.placeholder = "Digite seu CPF ou CNPJ";
      pixInput.maxLength = 18;
      break;
    case "phone":
      pixInput.placeholder = "Digite seu telefone (com DDD)";
      pixInput.maxLength = 15;
      break;
    case "email":
      pixInput.placeholder = "Digite seu email";
      pixInput.maxLength = 100;
      break;
    case "random":
      pixInput.placeholder = "Digite sua chave aleatória";
      pixInput.maxLength = 36;
      break;
  }

  // Adiciona os event listeners para formatação
  pixInput.oninput = () => formatPixInput(pixInput, type);
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  dom.hide(dom.get("main-content"));

  const emailInput = dom.get("email");
  emailInput.addEventListener("input", () => {
    dom.query(".input-group").classList.remove("error");
  });

  emailInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  });

  // Add click handler to saque button
  const saqueBtn = dom.query(".saque-btn");
  if (saqueBtn) {
    saqueBtn.onclick = showSecurityFeePopup;
  }

  // Verifica se existe estado salvo e usuário logado
  const savedState = localStorage.getItem("quizState");
  const savedEmail = localStorage.getItem("userEmail");

  if (savedState && savedEmail) {
    loadState();
    dom.hide(dom.get("login-screen"));
    dom.show(dom.get("main-content"));
  }
});

function toggleAnswer(element) {
  const faqItem = element.parentElement;
  faqItem.classList.toggle("active");
}

function handleLogin() {
  const email = dom.get("email").value;
  const inputGroup = dom.query(".input-group");

  if (!email || !utils.validateEmail(email)) {
    inputGroup.classList.add("error");
    return;
  }

  inputGroup.classList.remove("error");
  dom.hide(dom.get("login-screen"));
  dom.show(dom.get("main-content"));

  // Carrega estado salvo ou inicia novo
  const savedState = localStorage.getItem("quizState");
  if (savedState) {
    loadState();
  } else {
    // Salva o estado inicial quando faz login pela primeira vez
    saveState();
    displayQuestion();
  }

  // Salva o email do usuário para manter o login
  localStorage.setItem("userEmail", email);
}
