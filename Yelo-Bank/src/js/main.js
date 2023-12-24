const langSelectionHeader = document.querySelector(".ls-header");
const langSelectionContent = document.querySelector(".ls-content");
const language = document.querySelector(".language");
const languages = document.querySelectorAll(".lang");
const headerBottom = document.querySelector('.header-bottom')
const headerTop = document.querySelector('.header-top')
const loginBtn = document.querySelector('.login-button')
const hamburgerMenuBtn = document.querySelector(".hm-button");
const hamburgerMenuContent = document.querySelector(".hamburger-menu");
const contentContainer = document.querySelector(".hamburger-menu .container");
const bgColor = document.querySelector(".bg-color");
const headerBg = document.querySelector(".header-bottom");
const CloseBtn = document.querySelector(".close-img");
const promotion = document.querySelector(".mobile-app-promotion");
const header = document.querySelector("header");
const mobilePromotion = document.querySelector(".mobile-promotion");
const mobileCloseBtn = document.querySelector(".mp-close-btn");
const mainSlider = document.querySelector("#main-slider");
const search = document.querySelector(".search");
const searchInput = document.querySelector(".search-inner");
const searchOpenBtn = document.querySelector(".search-icon");
const searchBtn = document.querySelector(".search-btn");
const searchCloseBtn = document.querySelector(".search-close-btn");
const closeMessagePopup = document.querySelector(".close-popup");
const messageBtn = document.querySelector(".message-button");
const messageModal = document.querySelector(".message-modal");
const modal = document.querySelector(".modal-popup");
const formContent = document.querySelectorAll(".form-content .content-inner");
const storyClose = document.querySelector(".story-close");
const modalContainer = document.querySelector(".story-modal");
const storyModal = document.querySelector(".story-modal .modal");
const rangeInput = document.querySelectorAll('.range')
const numberInput = document.querySelectorAll('.number-range')
const rangeAmount = document.querySelector('.loan-amount input[type="range"]');
const rangeTerm = document.querySelector('.loan-term input[type="range"]');
const rangePercent = document.querySelector('.loan-percent input[type="range"]');
const numberAmount = document.querySelector('.loan-amount input[type="number"]');
const numberTerm = document.querySelector('.loan-term input[type="number"]');
const numberPercent = document.querySelector('.loan-percent input[type="number"]');
const loanInputs = document.querySelectorAll('.cr-input input')
const defaultRate = document.querySelector('.default-rate')
const selectRates = document.querySelectorAll('.select-item')
const currencyInput = document.querySelector('.currency-input')
const inputSelect = document.querySelector('.input-select')
const outputSelect = document.querySelector('.output-select')
const selectBoxRate = document.querySelector('.rate-select-box')
const news = document.querySelector('.news .row')
let windowScroll = window.scrollY
let scrollBar = hamburgerMenuContent.offsetWidth - hamburgerMenuContent.clientWidth;


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


hamburgerMenuBtn.addEventListener("click", () => {
  hamburgerMenuBtn.classList.toggle("close-active");
  if (!hamburgerMenuBtn.classList.contains("close-active")) {
    hamburgerMenuContent.style.maxHeight = "0";
    hamburgerMenuContent.classList.remove('active')
    bgColor.classList.remove('active')
    window.addEventListener('scroll',() => {
      if(window.scrollY < 20) {
        headerBg.style.backgroundColor = "transparent";
      } else {
        headerBg.style.backgroundColor = "#fff";
      }
    })
  } else {
    if (document.documentElement.scrollWidth <= 1096) {
      hamburgerMenuContent.style.maxHeight = "calc(100vh - 150px)";
    } else {
      hamburgerMenuContent.style.maxHeight = "calc(100vh - 140px)";
    }
    headerBg.style.backgroundColor = "#fff";
    hamburgerMenuContent.classList.add('active')
    bgColor.classList.remove('active')
  }
});

window.addEventListener('scroll',() => {
  let scrollH = window.scrollY
  if(scrollH > windowScroll && scrollH > 20) {
    headerTop.classList.add('scrolling')
    headerBottom.classList.add('main-header')
    loginBtn.classList.add('scroll-btn')
  } else {
    headerTop.classList.remove('scrolling')
    headerBottom.classList.remove('main-header')
    loginBtn.classList.remove('scroll-btn')
  }

  if(window.scrollY > 20) {
    headerBottom.classList.add('main-header')
  } else {
    headerBottom.classList.remove('main-header')
  }
  windowScroll = scrollH
  console.log(windowScroll)
})

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
    promotion.classList.add("show");
    mobilePromotion.classList.add("show");
    console.log("1");
  }
});

searchOpenBtn.addEventListener("click", () => {
  search.classList.add("show");
});

searchCloseBtn.addEventListener("click", () => {
  search.classList.remove("show");
});

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

storyClose.addEventListener("click", () => {
    modalContainer.classList.remove("show");
    storyModal.classList.remove("show-modal");
});

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

  let month = (percent / 12) / 100;
  
  if(amount > 50000) {
    amount = 50000
    document.querySelector('input[name=credit]').value = amount
  } else if(amount < 400) {
    amount = 400
  }

  if(period > 59) {
    period = 59
    document.querySelector('input[name=month]').value = period
  } else if(period < 6) {
    period = 6
  }

  if(percent > 20) {
    percent = 20
    document.querySelector('input[name=percent]').value=percent
  } else if(percent < 9.9) {
    percent = 9.9
  }

  const monthlyPayment = amount * (month * Math.pow(1 + month, period)) / (Math.pow(1 + month, period) - 1);
  result.innerHTML = `${Math.floor(parseInt(monthlyPayment))} <span> AZN</span>`

}

creditCalc()
loanInputs.forEach(input => {
  input.addEventListener('input',() => {
    creditCalc()
  })
})

defaultRate.addEventListener("click",(e) => {
  selectBoxRate.classList.add('show')
})

function removeActiveRate() {
  selectRates.forEach((item) => {
    item.classList.remove("active");
  });
}

selectRates.forEach((rate) => {
  rate.addEventListener("click", () => {
    defaultRate.innerText = rate.innerText;
    removeActiveRate();
    rate.classList.add("active");
  });
});

window.addEventListener("click", (e) => {
  if (e.target != defaultRate) {
    selectBoxRate.classList.remove("show");
  }
});

currencyInput.addEventListener('input',(e)=> {
  let inputValue = e.target.value;
  inputValue = inputValue.replace(/[^0-9.]/g, '');
  const dotIndex = inputValue.indexOf('.');
    if (dotIndex !== -1) {
        const afterDot = inputValue.substring(dotIndex + 1);
        if (afterDot.includes('.')) {
          inputValue = inputValue.substring(0, dotIndex + afterDot.indexOf('.') + 1);
        }
        console.log(dotIndex,afterDot,afterDot.indexOf('.'),dotIndex + afterDot.indexOf('.') + 1)
      }
  e.target.value = inputValue;

  // renderExchange()
})

function renderExchange() {
    const sellValue = currencyInput.value
    const fromRate = inputSelect.value
    const toRate = outputSelect.value
    
    if(sellValue.length != 0) {
      fetch('https://v6.exchangerate-api.com/v6/4eef589dd05e5fdf436bcda4/latest/USD')
      .then(res=> res.json())
      .then(data=> {
        let fromRateValue = data.conversion_rates[fromRate.toUpperCase()]
        let toRateValue = data.conversion_rates[toRate.toUpperCase()]
  
        let conversion = (sellValue / fromRateValue) * toRateValue
  
        
        document.querySelector('.currency-output').innerText = conversion.toFixed(2)
      })
    } else {
      
      document.querySelector('.currency-output').innerText = "Alıram" 
    }

}

inputSelect.addEventListener('input',(e) => {
  const selectedOption = e.target.value
  if(selectedOption !== 'azn') {
    outputSelect.innerHTML=""
    outputSelect.innerHTML += `<option value="azn" selected class="output-option">AZN</option>`
  } else {
    outputSelect.innerHTML=""
    outputSelect.innerHTML += `<option value="usd" selected class="output-option">USD</option>
    <option value="eur" class="output-option">EUR</option>`
  }

  let inputValue = inputSelect.value
  // renderExchange()
  
})

function formatDate(time) {
  const months = [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "İyun",
      "İyul",
      "Avqust",
      "Sentyabr",
      "Oktyabr",
      "Noyabr",
      "Dekabr"
  ];

  const date = new Date(time);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

fetch('http://localhost:3000/NEWS')
.then(res => res.json())
.then(data => {
    for(let i=0;i < 3;i++) {
      news.innerHTML += 
      `<div class="news-item col-3">
      <div class="news-inner">
          <div class="news-heading">
              <h3>${data[i].title}</h3>
              <div class="edit-news">
                  <button type="button" class="edit-button">
                      <i class="fa-solid fa-ellipsis-vertical"></i>
                  </button>
  
                  <div class="edit-dropdown">
                      <div class="dropdown-item">
                          <i class="fa-solid fa-trash-can"></i>
                          <span>Sil</span>
                      </div>
                      <div class="dropdown-item">
                          <i class="fa-solid fa-pen"></i>
                          <span>Düzəliş et</span>
                      </div>
                      <div class="dropdown-item"></div>
                  </div>
  
              </div>
          </div>
          <div class="news-footer">
              <a href="javascript:void(0)" class="arrow-btn">Daha ətraflı</a>
              <span class="time">${formatDate(data[i].date)}</span>
          </div>
      </div>
      </div>`
    }


    const newsItem = document.querySelectorAll('.news-item')

    newsItem.forEach(item => {
      const editBtn = item.querySelector('.edit-button')
      const editDropDown = item.querySelector('.edit-dropdown')
      editBtn.addEventListener("click",() => {
        editDropDown.classList.add('show')
      })
      
      window.addEventListener("click", (e) => {
        console.log(e.target)
        if (e.target != editBtn && e.target != editBtn.firstElementChild && editDropDown.classList.contains('show')) {
            editDropDown.classList.remove("show")
        }
      })
    })

    

})
