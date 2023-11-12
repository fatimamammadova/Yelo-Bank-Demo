const langSelectionHeader = document.querySelector(".ls-header");
const langSelectionContent = document.querySelector(".ls-content");
const language = document.querySelector(".language");

const languages = document.querySelectorAll(".lang");

languages.forEach((item) => {
  const langText = item.querySelector(".lang-text");

  item.addEventListener("click", () => {
    language.innerText = langText.innerText;
    removeActiveLanguage();
    langText.classList.add("active-lang");
  });
});

function removeActiveLanguage() {
  languages.forEach((item) => {
    const lang = item.querySelector("span");
    lang.classList.remove("active-lang");
  });
}

langSelectionHeader.addEventListener("click", () => {
  langSelectionContent.classList.add("show");
});

window.addEventListener("click", (e) => {
  if (
    e.target != langSelectionHeader &&
    e.target != langSelectionHeader.firstElementChild &&
    e.target != langSelectionHeader.firstElementChild.firstElementChild
  ) {
    langSelectionContent.classList.remove("show");
  }
});

const hamburgerMenuBtn = document.querySelector(".hm-button");
const hamburgerMenuContent = document.querySelector(".hamburger-menu");
const contentContainer = document.querySelector(".hamburger-menu .container");
let scrollBar =
  hamburgerMenuContent.offsetWidth - hamburgerMenuContent.clientWidth;
const bgColor = document.querySelector(".bg-color");
const headerTop = document.querySelector(".header-bottom");

hamburgerMenuBtn.addEventListener("click", () => {
  hamburgerMenuBtn.classList.toggle("close-active");
  if (hamburgerMenuBtn.classList.contains("close-active")) {
    headerTop.style.backgroundColor = "#fff";
    if (document.documentElement.scrollWidth <= 1096) {
      hamburgerMenuContent.style.maxHeight = "calc(100vh - 150px)";
    } else {
      hamburgerMenuContent.style.maxHeight = "calc(100vh - 140px)";
    }
    hamburgerMenuContent.style.height = "auto";
    hamburgerMenuContent.style.opacity = "1";
    bgColor.style.visibility = "visible";
    bgColor.style.opacity = ".5";
  } else {
    hamburgerMenuContent.style.maxHeight = "0";
    hamburgerMenuContent.style.opacity = "0";
    hamburgerMenuContent.style.height = "0";
    bgColor.style.visibility = "hidden";
    bgColor.style.opacity = "0";
    headerTop.style.backgroundColor = "transparent";
  }
});

const CloseBtn = document.querySelector(".close-img");
const promotion = document.querySelector(".mobile-app-promotion");

const header = document.querySelector("header");

const mobilePromotion = document.querySelector(".mobile-promotion");
const mobileCloseBtn = document.querySelector(".mp-close-btn");

const mainSlider = document.querySelector("#main-slider");

CloseBtn.addEventListener("click", () => {
  sessionStorage.setItem("status", "hide");
  header.style.top = "0";
  mainSlider.style.paddingTop = "0";
  mobilePromotion.classList.remove("show");
  promotion.classList.remove("show");
});

mobileCloseBtn.addEventListener("click", () => {
  sessionStorage.setItem("status", "hide");
  header.style.top = "0";
  mainSlider.style.paddingTop = "0";
  mobilePromotion.classList.remove("show");
  promotion.classList.remove("show");
});

if (sessionStorage.getItem("status") !== "hide") {
  promotion.classList.add("show");
  mobilePromotion.classList.add("show");
  if (!(document.documentElement.scrollWidth <= 576)) {
    console.log("1");
    header.style.top = "120px";
    mainSlider.style.paddingTop = "120px";
  }
}

window.addEventListener("resize", () => {
  if (
    document.documentElement.scrollWidth <= 576 ||
    sessionStorage.getItem("status") == "hide"
  ) {
    header.style.top = "0";
    mainSlider.style.paddingTop = "0";
    console.log("2");
  } else {
    header.style.top = "120px";
    mainSlider.style.paddingTop = "120px";
    console.log("1");
  }
});

const search = document.querySelector(".search");
const searchInput = document.querySelector(".search-inner");

const searchOpenBtn = document.querySelector(".search-icon");

const searchBtn = document.querySelector(".search-btn");
const searchCloseBtn = document.querySelector(".search-close-btn");

searchOpenBtn.addEventListener("click", () => {
  search.classList.add("show");
});

searchCloseBtn.addEventListener("click", () => {
  search.classList.remove("show");
});

const closeMessagePopup = document.querySelector(".close-popup");
const messageBtn = document.querySelector(".message-button");
const messageModal = document.querySelector(".message-modal");
const modal = document.querySelector(".modal-popup");

const formContent = document.querySelectorAll(".form-content .content-inner");

messageBtn.addEventListener("click", () => {
  messageModal.classList.add("show-popup");
  modal.classList.add("show-modal");
});
closeMessagePopup.addEventListener("click", () => {
  messageModal.classList.remove("show-popup");
  modal.classList.remove("show-modal");
});

formContent.forEach((item) => {
  item.addEventListener("click", () => {
    const itemBtn = item.querySelectorAll(".form-item");
    itemBtn.forEach((button) => {
      button.addEventListener("click", () => {
        if (!button.classList.contains("active-btn")) {
          for (let el of itemBtn) {
            el.classList.remove("active-btn");
          }
          button.classList.add("active-btn");
        }
      });
    });
  });
});

const storyClose = document.querySelector(".story-close");
const modalContainer = document.querySelector(".story-modal");
const storyModal = document.querySelector(".story-modal .modal");

storyClose.addEventListener("click", () => {
    modalContainer.classList.remove("show");
    storyModal.classList.remove("show-modal");
});


const rangeInput = document.querySelectorAll('.range')
const numberInput = document.querySelectorAll('.number-range')


const rangeAmount = document.querySelector('.loan-amount input[type="range"]');
const rangeTerm = document.querySelector('.loan-term input[type="range"]');
const rangePercent = document.querySelector('.loan-percent input[type="range"]');

const numberAmount = document.querySelector('.loan-amount input[type="number"]');
const numberTerm = document.querySelector('.loan-term input[type="number"]');
const numberPercent = document.querySelector('.loan-percent input[type="number"]');
const loanInputs = document.querySelectorAll('.cr-input input')
function handleRangeInput(rangeInput) {
  rangeInput.style.setProperty('--val', rangeInput.value);
  rangeInput.previousElementSibling.previousElementSibling.value = rangeInput.value;
}

function handleNumberInput(numberInput) {
  numberInput.nextElementSibling.nextElementSibling.value = numberInput.value
  numberInput.nextElementSibling.nextElementSibling.style.setProperty('--val', numberInput.value);
}

rangeAmount.addEventListener('input', () => handleRangeInput(rangeAmount));
rangeTerm.addEventListener('input', () => handleRangeInput(rangeTerm));
rangePercent.addEventListener('input', () => handleRangeInput(rangePercent));

numberAmount.addEventListener('input', () => handleNumberInput(numberAmount));
numberTerm.addEventListener('input', () => handleNumberInput(numberTerm));
numberPercent.addEventListener('input', () => handleNumberInput(numberPercent));


function creditCalc() {

  let percent = parseFloat(document.querySelector('input[name=percent]').value);
  let period = parseFloat(document.querySelector('input[name=month]').value);
  let amount = parseFloat(document.querySelector('input[name=credit]').value);

  const result = document.querySelector('.result')
  const monthly = (percent / 12) / 100;
  const monthlyPayment = amount * (monthly * Math.pow(1 + monthly, period)) / (Math.pow(1 + monthly, period) - 1);
  result.innerText = Math.floor(parseInt(monthlyPayment))
}


rangeInput.forEach(input => {
  input.addEventListener('input',() => {
    creditCalc()
  })
})

numberInput.forEach(input => {
  input.addEventListener('input',() => {
    creditCalc()
  })
})