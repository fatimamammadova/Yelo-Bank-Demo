const defaultRate = document.querySelector('.default-rate')
const selectRates = document.querySelectorAll('.select-item')
const currencyInput = document.querySelector('.er-input')
const inputSelect = document.querySelector('.input-select')
const outputSelect = document.querySelector('.output-select')

const partialContent = document.querySelector('.partial-content')
const originalContent = partialContent.innerHTML
const firstContent = originalContent.slice(0,740)
const secondContent = originalContent.slice(740)
const moreBtn = document.querySelector('.more-button')
const cashBtns = document.querySelectorAll('.cash-button')
const changeSides = document.querySelector('.change-sides')

changeSides.addEventListener('click', ()=> {
  changeSides.classList.toggle('change')
  if(changeSides.classList.contains('change')) {
    outputSelect.innerHTML=""
    outputSelect.innerHTML += `<option value="azn" selected class="output-option">AZN</option>`

    inputSelect.innerHTML=""
    inputSelect.innerHTML += ` <option value="usd" selected class="output-option">USD</option>
    <option value="eur" class="output-option">EUR</option>
    <option value="rub" class="output-option">RUB</option>
    <option value="gbp" class="output-option">GBP</option>`
  } else {
    outputSelect.innerHTML=""
    outputSelect.innerHTML += ` <option value="usd" selected class="output-option">USD</option>
    <option value="eur" class="output-option">EUR</option>
    <option value="rub" class="output-option">RUB</option>
    <option value="gbp" class="output-option">GBP</option>`

    inputSelect.innerHTML=""
    inputSelect.innerHTML += `<option value="azn" selected class="input-option">AZN</option>
    <option value="usd" class="input-option">USD</option>
    <option value="eur" class="input-option">EUR</option>
    <option value="rub" class="input-option">RUB</option>
    <option value="gbp" class="input-option">GBP</option>`
  }

})

let activeRate = 1
partialContent.innerHTML = firstContent

moreBtn.addEventListener("click", () => {
    partialContent.innerHTML = originalContent;
    moreBtn.style.display = 'none';
})

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
  
})

async function getValute(rate) {
  try {
    const res = await fetch('http://localhost:3000/valute')
    const data = await res.json()

    const tableBody = document.querySelector('tbody')

    tableBody.innerHTML = ''

    tableBody.innerHTML += `
      <tr>
          <td>
              <span class="item-title">USD</span>
          </td>

          <td>
              <span class="item-title">${rate == 1 ? +data.bank.USD.cash_buy : +data.bank.USD.buy}</span>
          </td>

          <td>
              <span class="item-title">${rate == 1 ? +data.bank.USD.cash_sell : +data.bank.USD.sell}</span>
          </td>

          <td>
              <span class="item-title">${data.mb.USD.buy}</span>
          </td>
      </tr>

      <tr>
          <td>
              <span class="item-title">EUR</span>
          </td>

          <td>
              <span class="item-title">${rate == 1 ? +data.bank.EUR.cash_buy : +data.bank.EUR.buy}</span>
          </td>

          <td>
              <span class="item-title">${rate == 1 ? +data.bank.EUR.cash_sell : +data.bank.EUR.sell}</span>
          </td>

          <td>
              <span class="item-title">${data.bank.EUR.buy}</span>
          </td>
      </tr>

      <tr>
          <td>
              <span class="item-title">RUB*</span>
          </td>

          <td>
              <span class="item-title">${rate == 1 ? +data.bank.RUB.cash_buy : +data.bank.RUB.buy}</span>
          </td>

          <td>
              <span class="item-title">${rate == 1 ? +data.bank.RUB.cash_sell : +data.bank.RUB.sell}</span>
          </td>

          <td>
              <span class="item-title">${data.bank.RUB.buy}</span>
          </td>
      </tr>

      <tr>
          <td>
              <span class="item-title">GBP</span>
          </td>

          <td>
              <span class="item-title">${rate == 1 ? +data.bank.GBP.cash_buy : +data.bank.GBP.buy}</span>
          </td>

          <td>
              <span class="item-title">${rate == 1 ? +data.bank.GBP.cash_sell : +data.bank.GBP.sell}</span>
          </td>

          <td>
              <span class="item-title">${data.mb.GBP.buy}</span>
          </td>
    </tr>`
  }
  catch(error) {
    console.error("Error fetching or processing news:", error)
  }
}

function removeActiveCashBtns() {
  cashBtns.forEach(cashBtn => {
    cashBtn.classList.remove('active');
  });
}

function updateActiveRate(rate) {
  activeRate = rate;
  getValute(activeRate);
}

async function initialize() {
  await getValute(activeRate);
}

initialize();

cashBtns.forEach(cashBtn => {
  cashBtn.addEventListener("click", () => {
    if (!cashBtn.classList.contains('active')) {
      removeActiveCashBtns();
      cashBtn.classList.add('active');
      updateActiveRate(cashBtn.dataset.cash);
    }
  });
});