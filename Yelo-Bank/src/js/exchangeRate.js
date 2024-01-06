const defaultRate = document.querySelector('.default-rate')
const selectRates = document.querySelectorAll('.select-item')
const currencyInput = document.querySelector('.er-input')
const currencyOutput = document.querySelector('.er-output')
const inputSelect = document.querySelector('.input-select')
const outputSelect = document.querySelector('.output-select')
const partialContent = document.querySelector('.partial-content')
const originalContent = partialContent.innerHTML
const firstContent = originalContent.slice(0,740)
const secondContent = originalContent.slice(740)
const moreBtn = document.querySelector('.more-button')
const cashBtns = document.querySelectorAll('.cash-button')
const changeSides = document.querySelector('.change-sides')
let activeRate = 1
partialContent.innerHTML = firstContent

moreBtn.addEventListener("click", () => {
    partialContent.innerHTML = originalContent
    moreBtn.style.display = 'none'
})

currencyInput.addEventListener('input',(e)=> {
  let inputValue = e.target.value
  inputValue = inputValue.replace(/[^0-9.]/g, '')
  const dotIndex = inputValue.indexOf('.')
    if (dotIndex !== -1) {
        const afterDot = inputValue.substring(dotIndex + 1)
        if (afterDot.includes('.')) {
          inputValue = inputValue.substring(0, dotIndex + afterDot.indexOf('.') + 1)
        }
        console.log(dotIndex,afterDot,afterDot.indexOf('.'),dotIndex + afterDot.indexOf('.') + 1)
      }
  e.target.value = inputValue

})

async function renderExchange() {
  try {
    const res = await fetch('http://localhost:3000/valute')
    const data = await res.json()
    switch(inputSelect.value) {
      case 'azn':
        switch(outputSelect.value) {
          case 'usd':
            calculate(1/(activeRate==1 ? +data.bank.USD.cash_sell : +data.bank.USD.sell))
            break;
          case 'eur':
            calculate(1/(activeRate==1 ? +data.bank.EUR.cash_sell : +data.bank.EUR.sell))
            break;
          case 'rub':
            calculate(1/(activeRate==1 ? +data.bank.RUB.cash_sell : +data.bank.RUB.sell))
            break;
          case 'gbp':
            calculate(1/(activeRate==1 ? +data.bank.GBP.cash_sell : +data.bank.GBP.sell))
            break;
        }
        break;
      case "usd":
        calculate(activeRate == 1 ? +data.bank.USD.cash_buy : +data.bank.USD.buy)
        break;
      case "eur":
          calculate(activeRate == 1 ? +data.bank.EUR.cash_buy : +data.bank.EUR.buy)
          break;
      case "rub":
        calculate(activeRate == 1 ? +data.bank.RUB.cash_buy : +data.bank.RUB.buy)
          break;
      case "gbp":
        calculate(activeRate == 1 ? +data.bank.GBP.cash_buy : +data.bank.GBP.buy)
        break;
    }

    function calculate(value) {
      const inputValue = parseFloat(currencyInput.value)
      const conversionRate = value * inputValue
      if(currencyInput.value=='') {
        currencyOutput.innerText = 'Alıram'
      } else {
        currencyOutput.innerText = `${conversionRate.toFixed(2)}`

      }
    }
  }
  catch(error){
    console.error("Error fetching or processing news:", error)
  }
}

currencyInput.addEventListener('input', () => {
  if(currencyInput.value=='') {
    currencyOutput.innerText = 'Alıram'
  } else {
    renderExchange()
  }
})

changeSides.addEventListener('click', () => {
  let value = inputSelect.value
  inputSelect.value=outputSelect.value
  changeRates()
  outputSelect.value=value
  renderExchange()
  
})

function changeRates() {
  const rates = outputSelect.querySelectorAll('option')

  if(inputSelect.value!='azn') {
    rates.forEach(rate => {
      if(rate.value!='azn') {
        rate.style.display = 'none'
      } else {
        rate.style.display = 'block'
      }
    })
    outputSelect.value = rates[0].value
  } else {
    rates.forEach(rate => {
      if(rate.value!='azn') {
        rate.style.display = 'block'
      } else {
        rate.style.display = 'none'
      }
    })
    outputSelect.value = rates[1].value
  }
}

inputSelect.addEventListener('input',(e) => {
  changeRates()
  renderExchange()
  
})

outputSelect.addEventListener('input',(e) => {
  renderExchange()
})

async function getValute(rate) {
  try {
    const res = await fetch('http://localhost:3000/valute')
    const data = await res.json()

    document.querySelector('table').innerHTML = `<thead>
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
    </thead>`

    let tableBody = `<tbody>`
    for (let bank in data) {
      for (let currency in data[bank]) {
        if(bank !== 'mb') {
          tableBody += "<tr>"
          tableBody += "<td>" + currency + "</td>"
          tableBody += "<td>" + `<span class="item-title">${rate == 1 ? +data[bank][currency].cash_buy : +data[bank][currency].buy}</span>` + "</td>"
          tableBody += "<td>" + `<span class="item-title">${rate == 1 ? +data[bank][currency].cash_sell : +data[bank][currency].sell}</span>` + "</td>"
          tableBody += "<td>" + `<span class="item-title">${data['mb'][currency].buy}</span>` + "</td>"
          tableBody += "</tr>"
        }
      }
    }
    tableBody += `</tbody>`

    document.querySelector('table').insertAdjacentHTML('beforeend', tableBody)
  }
  catch(error) {
    console.error("Error fetching or processing news:", error)
  }
}

function removeActiveCashBtns() {
  cashBtns.forEach(cashBtn => {
    cashBtn.classList.remove('active')
  })
}

function updateActiveRate(rate) {
  activeRate = rate
  getValute(activeRate)
  renderExchange()
}

async function initialize() {
  await getValute(activeRate)
}
initialize()

cashBtns.forEach(cashBtn => {
  cashBtn.addEventListener("click", () => {
    if (!cashBtn.classList.contains('active')) {
      removeActiveCashBtns()
      cashBtn.classList.add('active')
      updateActiveRate(cashBtn.dataset.cash)
    }
  })
})