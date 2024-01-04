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
        if (e.target != editBtn && e.target != editBtn.firstElementChild && editDropDown.classList.contains('show')) {
            editDropDown.classList.remove("show")
        }
      })
    })

    

})
