const formSelect = document.querySelectorAll('.col-input select')
const deliveryInputs = document.querySelectorAll('.col1-input.delivery')
const branchInput = document.querySelector('.col1-input.branch')
const formInput = document.querySelectorAll('.col-input input:not([type="radio"])')
const currencySelect = document.querySelector('.col-input #currency-select')
const paymentSelect = document.querySelector('.col-input #pay-method')
const paymentMethod = document.querySelector('.payment-method')
const messageBox = document.querySelector('.message-box')
const accordionItem = document.querySelectorAll('.accordion-item')
// const accordionIcons = document.querySelectorAll('.title-inner span')
const accordionItemBtn = document.querySelectorAll('.ai-title')



formSelect.forEach(item => {
    item.addEventListener("change", () => {
        let parentContainer = item.closest('.col-input')
        let selectTxt = parentContainer.querySelector('span')
        if(item.value) {
            item.style.padding = `10px 16px 0 16px`
            selectTxt.classList.add('active')
        } else {
            item.style.padding = `0 16px 0 16px`
            selectTxt.classList.remove('active')
        }

        if(item.value=='delivery') {
            deliveryInputs.forEach(el => {
                el.classList.add('active')
            })
            branchInput.classList.remove('active')

        } else if (item.value==="branch") {
            deliveryInputs.forEach(el => {
                el.classList.remove('active')
            })
            branchInput.classList.add('active')
        }
    })

})

formInput.forEach(item => {
    item.addEventListener("input", () => {
        let parentContainer = item.closest('.col-input')
        let selectTxt = parentContainer.querySelector('span')
        if(item.value) {
            item.style.padding = `10px 16px 0 16px`
            selectTxt.classList.add('active')
        } else {
            item.style.padding = `0 16px 0 16px`
            selectTxt.classList.remove('active')
        }
    })
})

paymentSelect.addEventListener('change', () => {
    if(currencySelect.value) {
        if(paymentSelect.value==='prepayment') {
            paymentMethod.classList.add('active')
            messageBox.classList.remove('active')

        } else if(paymentSelect.value==="postpayment") {
            paymentMethod.classList.remove('active')
            messageBox.classList.add('active')
        }
    }
})

accordionItemBtn.forEach(item => {
    item.addEventListener('click', () => {
        let parentContainer = item.closest('.accordion-item')
        let accordionContent = parentContainer.querySelector('.ai-content')
        let icon = item.querySelector('span')
        let maxHeight = accordionContent.scrollHeight
        if(accordionContent.clientHeight>0 ) {
            icon.classList.remove('active')
            accordionContent.style.maxHeight = `0px`
        } else {
            removeActives()
            icon.classList.add('active')

            accordionContent.style.maxHeight = `${maxHeight}px`
        }
    })
})

function removeActives() {
    accordionItem.forEach(item => {
        let content = item.querySelector('.ai-content')
        let icon = item.querySelector('span')
        icon.classList.remove('active')
        content.style.maxHeight = `0px`
    })
}