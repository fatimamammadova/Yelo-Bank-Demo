const langSelectionHeader = document.querySelector(".ls-header");
const langSelectionContent = document.querySelector(".ls-content");
const language = document.querySelector(".language");
const languages = document.querySelectorAll(".lang");
const closeMessagePopup = document.querySelector(".close-popup");
const messageBtn = document.querySelector(".message-button");
const messageModal = document.querySelector(".message-modal");
const modal = document.querySelector(".modal-popup");
const search = document.querySelector(".search");
const searchInput = document.querySelector(".search-inner");
const searchOpenBtn = document.querySelector(".search-icon");
const searchBtn = document.querySelector(".search-btn");
const searchCloseBtn = document.querySelector(".search-close-btn");
const headerTop = document.querySelector('.header-top')
const headerBottom = document.querySelector('.header-bottom')
const loginBtn = document.querySelector('.login-button')
const formContent = document.querySelectorAll(".form-content .content-inner");


const partialContent = document.querySelector('.partial-content')
const originalContent = partialContent.innerHTML
const firstContent = originalContent.slice(0,740)
const secondContent = originalContent.slice(740)
const moreBtn = document.querySelector('.more-button')

const cashBtns = document.querySelectorAll('.cash-button')

function removeActiveCashBtns() {
    cashBtns.forEach(cashBtn => {
        cashBtn.classList.remove('active')
    })
}

cashBtns.forEach(cashBtn => {
    cashBtn.addEventListener("click", () => {
        if(!cashBtn.classList.contains('active')) {
            removeActiveCashBtns()
            cashBtn.classList.add('active')
        } 
    })
})

let windowScroll = window.scrollY
let number = 15
let initalNumber = 0
let dataLength,updateId,updateTitle,updateDate;
let isPost = false


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
})

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

partialContent.innerHTML = firstContent
moreBtn.addEventListener("click", () => {
    partialContent.innerHTML = originalContent;
    moreBtn.style.display = 'none';
})


const defaultRate = document.querySelector('.default-rate')
const selectRates = document.querySelectorAll('.select-item')
const currencyInput = document.querySelector('.er-input')
const inputSelect = document.querySelector('.input-select')
const outputSelect = document.querySelector('.output-select')




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
  
        
        document.querySelector('.er-output').innerText = conversion.toFixed(2)
      })
    } else {
      
      document.querySelector('.er-output').innerText = "Alıram" 
    }

}

inputSelect.addEventListener('input',(e) => {
  const selectedOption = e.target.value
  if(selectedOption !== 'azn') {
    outputSelect.innerHTML=""
    outputSelect.innerHTML += `<option value="azn" selected class="output-option">AZN</option>`
  } else {
    outputSelect.innerHTML=""
    outputSelect.innerHTML += ` <option value="usd" selected class="output-option">USD</option>
    <option value="eur" class="output-option">EUR</option>
    <option value="rub" class="output-option">RUB</option>
    <option value="gbp" class="output-option">GBP</option>`
  }

  let inputValue = inputSelect.value
  // renderExchange()
  
})

//////////????????//////////////////////
async function getValute() {
  try {
    const res = await fetch('http://localhost:3000/valute')
    const data = await res.json()

    const tableContainer = document.querySelector('.table-inner')

    tableContainer.innerHTML += `<table>
    <thead>
        <tr>
            <th>
                <span class="table-title">Valyuta</span>
            </th>

            <th>
                <span class="table-title">Alış</span>
            </th>

            <th>
                <span class="table-title">Satış</span>
            </th>

            <th>
                <span class="table-title">MB</span>
            </th>

        </tr>
    </thead>

    <tbody>
        <tr>
            <td>
                <span class="item-title">USD</span>
            </td>

            <td>
                <span class="item-title">${data.bank.USD.buy}</span>
            </td>

            <td>
                <span class="item-title">${data.bank.USD.sell}</span>
            </td>

            <td>
                <span class="item-title">${data.bank.USD.buy}</span>
            </td>
        </tr>

        <tr>
            <td>
                <span class="item-title">EUR</span>
            </td>

            <td>
                <span class="item-title">1.8300</span>
            </td>

            <td>
                <span class="item-title">1.9200</span>
            </td>

            <td>
                <span class="item-title">1.8766</span>
            </td>
        </tr>

        <tr>
            <td>
                <span class="item-title">RUB*</span>
            </td>

            <td>
                <span class="item-title">0.0170</span>
            </td>

            <td>
                <span class="item-title">0.0210</span>
            </td>

            <td>
                <span class="item-title">0.0188</span>
            </td>
        </tr>

        <tr>
            <td>
                <span class="item-title">GBP</span>
            </td>

            <td>
                <span class="item-title">2.0700</span>
            </td>

            <td>
                <span class="item-title">2.2600</span>
            </td>

            <td>
                <span class="item-title">2.1643</span>
            </td>
        </tr>


    </tbody>
</table>

<span class="message-txt">
    *Rubl valyutası üzrə məzənnə təcili pul köçürmələri üçün nəzərdə tutulub.
</span>`

    console.log(data.bank.USD.buy)
  }
  catch(error) {
    console.error("Error fetching or processing news:", error)
  }
}
getValute()