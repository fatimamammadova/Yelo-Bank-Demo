const partialContent = document.querySelector('.partial-content')
const originalContent = partialContent.innerHTML
const firstContent = originalContent.slice(0,740)
const secondContent = originalContent.slice(740)
const moreBtn = document.querySelector('.more-button')

partialContent.innerHTML = firstContent
moreBtn.addEventListener("click", () => {
    partialContent.innerHTML = originalContent;
    moreBtn.style.display = 'none';
})


async function getcards() {
    try {
      const res = await fetch("http://localhost:3000/laons");
      const data = await res.json();
      data.forEach(item => {
            const cardContainer = document.querySelector('.laons')

            if(item.isTheCard) {
                cardContainer.innerHTML += `
                <div class="card" style="background-image: url('./img/yelo_block.svg');">
            <div class="card-left">
                <h2 class="card-title">
                    ${item.name}
                </h2>
                <p>
                    ${item.description}
                </p>
                
                <div class="card-about">
                    <div class="about-col">
                        <span>${item.spec_title_1}</span>
                        <p>${item.spec_title_1_desc}</p>
                    </div>

                    <div class="about-col">
                    <span>${item.spec_title_2}</span>
                        <p>${item.spec_title_2_desc}</p>
                    </div>

                    <div class="about-col">
                    <span>${item.spec_title_3}</span>
                        <p>${item.spec_title_3_desc}</p>
                    </div>
                </div>

                <div class="buttons">
                    <button type="button" class="main-button order-button">
                        <span>
                            Sifariş et
                        </span>
                    </button>

                    <button type="button" class="link-button">
                        <span>
                            Daha ətraflı
                        </span>
                    </button>
                </div>
            </div>

            <div class="card-right">
            <div class="img">
                <div class="img-container taksit">
                    <div class="card-img" style="background-image: url('${item.img}');">
                    <div class="gradient-bg"></div>
                    </div>
                    
                    <div class="shadow-bg"></div>               
                    </div>
            </div>
            </div> 
                </div>`
            } else if(!item.isTheCard && item.isOrder && !item.hasAForm) {
                cardContainer.innerHTML += `<div class="card" style="background-image: url('./img/yelo_block.svg');">
            <div class="card-left">
                <h2 class="card-title">
                    ${item.name}
                </h2>
                <p>
                    ${item.description}
                </p>
                
                <div class="card-about">
                    <div class="about-col">
                        <span>${item.spec_title_1}</span>
                        <p>${item.spec_title_1_desc}</p>
                    </div>

                    <div class="about-col">
                    <span>${item.spec_title_2}</span>
                        <p>${item.spec_title_2_desc}</p>
                    </div>

                    <div class="about-col">
                    <span>${item.spec_title_3}</span>
                        <p>${item.spec_title_3_desc}</p>
                    </div>
                </div>

                <div class="buttons">
                    <button type="button" class="main-button order-button">
                        <span>
                            Sifariş et
                        </span>
                    </button>

                    <button type="button" class="link-button">
                        <span>
                            Daha ətraflı
                        </span>
                    </button>
                </div>
            </div>
            
            <div class="right-img" style="background-image: url('${item.img}');">
            
                </div>`
            } else if(!item.isOrder) {
                cardContainer.innerHTML += `<div class="card" style="background-image: url('./img/yelo_block.svg');">
            <div class="card-left">
                <h2 class="card-title">
                    ${item.name}
                </h2>
                <p>
                    ${item.description}
                </p>
                
                <div class="card-about">
                    <div class="about-col">
                        <span>${item.spec_title_1}</span>
                        <p>${item.spec_title_1_desc}</p>
                    </div>

                    <div class="about-col">
                    <span>${item.spec_title_2}</span>
                        <p>${item.spec_title_2_desc}</p>
                    </div>

                    <div class="about-col">
                    <span>${item.spec_title_3}</span>
                        <p>${item.spec_title_3_desc}</p>
                    </div>
                </div>

                <div class="buttons">
                    <button type="button" class="link-button" style="margin: 0px; padding: 0px;">
                        <span>
                            Daha ətraflı
                        </span>
                    </button>
                </div>
            </div>
            
            <div class="right-img" style="background-image: url('${item.img}');">
            
                </div>`
            } else if (item.hasAForm && item.form_class == "call_short_form") {
                cardContainer.innerHTML += `
                <div class="has-form">
            
                <div class="card" style="background-image: url('./img/yelo_block.svg');">
                <div class="card-left">
                    <h2 class="card-title">
                        ${item.name}
                    </h2>
                    <p>
                        ${item.description}
                    </p>
                    
                    <div class="card-about">
                        <div class="about-col">
                            <span>${item.spec_title_1}</span>
                            <p>${item.spec_title_1_desc}</p>
                        </div>
    
                        <div class="about-col">
                        <span>${item.spec_title_2}</span>
                            <p>${item.spec_title_2_desc}</p>
                        </div>
    
                        <div class="about-col">
                        <span>${item.spec_title_3}</span>
                            <p>${item.spec_title_3_desc}</p>
                        </div>
                    </div>
    
                    <div class="buttons">
                        <button type="button" class="main-button order-button credit-order">
                            <span>
                                Sifariş et
                            </span>
                        </button>

                        <button type="button" class="link-button">
                            <span>
                                Daha ətraflı
                            </span>
                        </button>
                    </div>
                </div>
                
                <div class="right-img" style="background-image: url('${item.img}');">
                
                </div>
                </div>
                
                
                <div class="short-form ${item.form_class} form">
                <form class="card-form">

                    <div class="form-inputs">
                        <div class="form-input monthly-amount  padding-input">
                            <div class="input-inner padding-input border-input">
                                <span>Aylıq əməkhaqqı</span>
                                <input type="number" name="credit" min="350" max="5000" value="2500" class="number-range">
                                <span class="title-exponent">AZN</span>
                               <input type="range" class="range" min="350" max="5000" step="50" value="2500" style="--min: 350; --max: 5000; --val: 2500;">
                            </div>
                        </div>
    
                        <div class="form-input credit-amount">
                            <div class="input-inner padding-input">
                                <span>Kredit məbləği</span>
                                <input type="number" name="credit" min="400" max="50100" value="15000" class="number-range">
                                <span class="title-exponent">AZN</span>
                               <input type="range" class="range" min="400" max="50100" step="100" value="15000" style="--min: 350; --max: 50100; --val: 15000;">
                            </div>
                        </div>
                    </div>


                    <div class="form-inputs">
                        <div class="form-input">
                            <div class="input-inner border-input">
                                <input type="text" placeholder="Ad" class="user-info">
                            </div>
                            <div class="input-error">
                                Doldurulması vacibdir
                            </div>
                        </div>
                        <div class="form-input">
                            <div class="input-inner">
                                <input type="text" placeholder="Soyad" class="user-info">
                            </div>
                            <div class="input-error">
                                Doldurulması vacibdir
                            </div>
                        </div>
                    </div>


                    <div class="form-inputs line-input">
                        <div class="form-input">
                            <div class="input-inner">
                                <input type="text" placeholder="İş yeri" class="line-info">
                            </div>
                            <div class="input-error">
                                Doldurulması vacibdir
                            </div>
                        </div>
                        <div class="form-input">
                            <div class="input-inner">
                                <input type="name" placeholder="Nomre" class="line-info">
                            </div>
                            <div class="input-error">
                                Doldurulması vacibdir
                            </div>
                        </div>
                    </div>


                    <div class="form-bottom">
                        <div class="fb-inner">
                            <div class="form-info">
                                <p>“Sifariş et” basmaqla Azərbaycan Kredit Bürosundan kredit tarixçəsi və Asan finansdan fərdi məlumatların alınmasına razılıq verirəm.</p>
                            </div>
                            <button type="submit" class="order-button">Sifariş et</button>
                        </div>
                    </div>
                </form>
            </div>

            </div>`
            } else if(item.hasAForm && item.form_class == "call_long_form") {
                cardContainer.innerHTML += `
                <div class="has-form">
            
                <div class="card" style="background-image: url('./img/yelo_block.svg');">
                <div class="card-left">
                    <h2 class="card-title">
                        ${item.name}
                    </h2>
                    <p>
                        ${item.description}
                    </p>
                    
                    <div class="card-about">
                        <div class="about-col">
                            <span>${item.spec_title_1}</span>
                            <p>${item.spec_title_1_desc}</p>
                        </div>
    
                        <div class="about-col">
                        <span>${item.spec_title_2}</span>
                            <p>${item.spec_title_2_desc}</p>
                        </div>
    
                        <div class="about-col">
                        <span>${item.spec_title_3}</span>
                            <p>${item.spec_title_3_desc}</p>
                        </div>
                    </div>
    
                    <div class="buttons">
                        <button type="button" class="main-button order-button long-credit-order">
                            <span>
                                Sifariş et
                            </span>
                        </button>

                        <button type="button" class="link-button">
                            <span>
                                Daha ətraflı
                            </span>
                        </button>
                    </div>
                </div>
                
                <div class="right-img" style="background-image: url('${item.img}');">
                
                </div>
                </div>


                <div class="long-form ${item.form_class} form">
                <div class="form-inner">
                    <h2>Kredit sifarişi</h2>
                    <form class="card-form">
    
                        <div class="form-inputs line-input">
                            <div class="form-input">
                                <div class="input-inner">
                                    <select name="" id="form-select" class="select-item line-info">
                                        <option value="adi">Adi</option>
                                        <option value="güzəştli">Güzəştli</option>
                                    </select>
                                </div>
                                <div class="input-error">
                                    Doldurulması vacibdir
                                </div>
                            </div>
                            <div class="form-input">
                                <div class="input-inner">
                                    <select name="" id="form-select" class="select-item line-info">
                                        <option value="zəmanətsiz">Zəmanətsiz</option>
                                        <option value="zəmanətli">Zəmanətli</option>
                                    </select>
                                </div>
                                <div class="input-error">
                                    Doldurulması vacibdir
                                </div>
                            </div>
                        </div>
    
                        <div class="form-inputs form-inputs-tripl form-input-line">
                            <div class="form-input mortgage-amount  padding-input">
                                <div class="input-inner padding-input border-input">
                                    <span>Mənzilin dəyəri</span>
                                    <input type="number" name="credit" min="10000" max="500000" value="250000" class="number-range">
                                    <span class="title-exponent">AZN</span>
                                   <input type="range" class="range" min="10000" max="500000" step="50" value="250000" style="--min: 10000; --max: 500000; --val: 250000;">
                                </div>
                            </div>
        
                            <div class="form-input mortgage-first-pay">
                                <div class="input-inner padding-input border-input">
                                    <span>lkin ödəniş</span>
                                    <input type="number" name="credit" min="400" max="50100" value="15000" class="number-range">
                                    <span class="title-exponent">AZN</span>
                                   <input type="range" class="range" min="10000" max="500000" step="50" value="37500" style="--min: 10000; --max: 500000; --val: 37500;">
                                </div>
                            </div>
    
                            <div class="form-input mortgage-term">
                                <div class="input-inner padding-input">
                                    <span>Müddət</span>
                                    <input type="number" name="credit" min="6" max="300" value="150" class="number-range">
                                    <span class="title-exponent">Ay</span>
                                   <input type="range" class="range" min="6" max="300" step="1" value="150" style="--min: 6; --max: 300; --val: 150;">
                                </div>
                            </div>
                        </div>
    
                        <div class="credit-result">
                            <div class="result-item">
                                <p>Yekun məbləğ</p>
                                <span class="year-pay"></span>
                            </div>

                            <div class="result-item">
                                <p>Aylıq ödəniş</p>
                                <span class="month-pay"></span>
                            </div>

                            <div class="result-item">
                                <p>Faiz</p>
                                <span class="percent"></span>
                            </div>
                        </div>

                        <div class="form-inputs form-input-line">
                            <div class="form-input">
                                <div class="input-inner border-input">
                                    <input type="text" placeholder="Ad" class="user-info">
                                </div>
                                <div class="input-error">
                                    Doldurulması vacibdir
                                </div>
                            </div>
                            <div class="form-input">
                                <div class="input-inner">
                                    <input type="text" placeholder="Soyad" class="user-info">
                                </div>
                                <div class="input-error">
                                    Doldurulması vacibdir
                                </div>
                            </div>
                        </div>
    
                        <div class="form-inputs line-input">
                            <div class="form-input">
                                <div class="input-inner">
                                    <input type="text" placeholder="İş yeri" class="line-info">
                                </div>
                                <div class="input-error">
                                    Doldurulması vacibdir
                                </div>
                            </div>
                            <div class="form-input">
                                <div class="input-inner">
                                    <input type="name" placeholder="Nomre" class="line-info">
                                </div>
                                <div class="input-error">
                                    Doldurulması vacibdir
                                </div>
                            </div>
                        </div>
    
                        <div class="form-bottom">
                            <div class="fb-inner">
                                <div class="form-info">
                                    <p>Мы гарантируем безопасность и сохранность ваших данных</p>
                                </div>
                                <button type="submit" class="order-button">Next step</button>
                            </div>
                        </div>
                    </form>
                </div>
           
                </div>
                `
            }
            
      })
        

    const orderBtns = document.querySelectorAll('.order-button')
    const forms = document.querySelectorAll('.form')

    function removeActives() {
        forms.forEach(form => {
            form.classList.remove('active')
        })
        orderBtns.forEach(btn => {
            btn.classList.remove('active')
        })
    }

    const shortorderBtns = document.querySelectorAll('.credit-order')

    shortorderBtns.forEach(orderBtn => {
        orderBtn.addEventListener("click", () => {
            const parentContainer = orderBtn.closest('.has-form')
            const shortForm = parentContainer.querySelector('.call_short_form')
            orderBtn.classList.toggle('active')
            shortForm.classList.toggle('active')
         
            if(orderBtn.classList.contains('active')) {
                removeActives()
                shortForm.classList.toggle('active')
                orderBtn.classList.toggle('active')
            }
        })
    })

    const longOrderBtn = document.querySelector('.long-credit-order')

    longOrderBtn.addEventListener("click", () => {
        const parentContainer = longOrderBtn.closest('.has-form')
        const longForm = parentContainer.querySelector('.call_long_form')
        longOrderBtn.classList.toggle('active')
        longForm.classList.toggle('active')
        if(longOrderBtn.classList.contains('active')) {
            removeActives()
            longForm.classList.toggle('active')
            longOrderBtn.classList.toggle('active')
        }
       
    })

    const taksit = document.querySelector(".taksit");

    function handleMouseMove(event) {
        const boundingRect = this.getBoundingClientRect();
        const mouseX = event.clientX - boundingRect.left - boundingRect.width / 2;
        const mouseY = event.clientY - boundingRect.top - boundingRect.height / 2;
    
        const maxTilt = 20;
        const tiltX = (maxTilt / boundingRect.width) * mouseX;
        const tiltY = (maxTilt / boundingRect.height) * mouseY;
    
        const gradientDegree = (mouseX / boundingRect.width) * 360;
        
        this.style.transform = `perspective(360px) rotateX(${tiltY}deg) rotateY(${-tiltX}deg`;
        this.querySelector('.gradient-bg').style.background = `linear-gradient(${gradientDegree}deg, rgba(255,255,255,.25) 0%,rgba(255,255,255,0) 60%)`;
        this.querySelector('.shadow-bg').style.boxShadow = `0 45px 100px rgba(14,21,47,0.4), 0 16px 40px rgba(14,21,47,0.4)`
        this.style.transform = `translate(0,0);`
    }
    
    function resetTilt() {
        this.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
        this.querySelector('.gradient-bg').style.background = "linear-gradient(135deg, rgba(255,255,255,.25) 0%,rgba(255,255,255,0) 60%)";
        this.querySelector('.shadow-bg').style.boxShadow = `0 8px 30px rgba(14,21,47,0.6)`
    }
    
    taksit.addEventListener("mousemove", handleMouseMove);
    taksit.addEventListener("mouseleave", resetTilt);


    const rangeInput = document.querySelectorAll('.range')
    const numberInput = document.querySelectorAll('.number-range')

    const rangeMortgageAmount = document.querySelector('.mortgage-amount input[type="range"]');
    const numberMortgageAmount = document.querySelector('.mortgage-amount input[type="number"]');

    const rangeMortgageTerm = document.querySelector('.mortgage-term input[type="range"]');
    const numberMortgageTerm = document.querySelector('.mortgage-term input[type="number"]');

    const rangeMortgageFirstPay = document.querySelector('.mortgage-first-pay input[type="range"]');
    const numberMortgageFirstPay = document.querySelector('.mortgage-first-pay input[type="number"]');

    const rangeCreditAmount = document.querySelector('.credit-amount input[type="range"]');
    const numberCreditAmount = document.querySelector('.credit-amount input[type="number"]');

    const rangeMonthlyAmount = document.querySelector('.monthly-amount input[type="range"]');
    const numberMonthlyAmount = document.querySelector('.monthly-amount input[type="number"]');

    function handleRangeInput(rangeInput) {
        rangeInput.style.setProperty('--val', rangeInput.value);
        rangeInput.previousElementSibling.previousElementSibling.value = rangeInput.value;
    }
    
    function handleNumberInput(numberInput) {
        numberInput.nextElementSibling.nextElementSibling.value = numberInput.value
        numberInput.nextElementSibling.nextElementSibling.style.setProperty('--val', numberInput.value);
    }
    
    rangeMortgageAmount.addEventListener('input', () => handleRangeInput(rangeMortgageAmount));
    rangeMortgageTerm.addEventListener('input', () => handleRangeInput(rangeMortgageTerm));
    rangeMortgageFirstPay.addEventListener('input', () => handleRangeInput(rangeMortgageFirstPay));
    
    numberMortgageAmount.addEventListener('input', () => handleNumberInput(numberMortgageAmount));
    numberMortgageTerm.addEventListener('input', () => handleNumberInput(numberMortgageTerm));
    numberMortgageFirstPay.addEventListener('input', () => handleNumberInput(numberMortgageFirstPay));

    rangeMonthlyAmount.addEventListener('input', () => handleRangeInput(rangeMonthlyAmount));
    numberMonthlyAmount.addEventListener('input', () => handleNumberInput(numberMonthlyAmount));

    rangeCreditAmount.addEventListener('input', () => handleRangeInput(rangeCreditAmount));
    numberCreditAmount.addEventListener('input', () => handleNumberInput(numberCreditAmount));

    } 
    catch (error) {
      console.error("Error fetching or processing news:", error);
    }
}
getcards();