const formSelect = document.querySelectorAll('.col-input select')
const deliveryInputs = document.querySelectorAll('.col1-input.delivery')
const branchInput = document.querySelector('.col1-input.branch')
const formInput = document.querySelectorAll('.col-input input:not([type="radio"])')
const currencySelect = document.querySelector('.col-input #currency-select')
const paymentSelect = document.querySelector('.col-input #pay-method')
const paymentMethod = document.querySelector('.payment-method')
const messageBox = document.querySelector('.message-box')
const accordionItem = document.querySelectorAll('.accordion-item')
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

        if(item.value=='Çatdırılma ilə - Pulsuz') {
            deliveryInputs.forEach(el => {
                el.classList.add('active')
            })
            branchInput.classList.remove('active')

        } else if (item.value==="Bankın filialından") {
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
        if(paymentSelect.value==='Kartın qiymətini ödəməklə') {
            paymentMethod.classList.add('active')
            messageBox.classList.remove('active')

        } else if(paymentSelect.value==="İlkin mədaxil ilə") {
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


async function getServices()  {
    try {
        const res = await fetch('http://localhost:3000/service')
        const data = await res.json()
    
        const carouselContainer = document.querySelector('.carousel-inner')
        const modalContent = document.querySelector('.sm-left')
        const slideNavbar = document.querySelector('.slide-navbar')
        const leftBtn =document.getElementById('left')
        const rightBtn =document.getElementById('right')
        let isDragging = false
        let prevScrollLeft,prevPageX

        data.forEach(item => {
            carouselContainer.innerHTML += `<div class="slide-item" data-id="${item.id}">
            <div class="si-wrapper">
                <div class="slide-content">
                    <div class="slide-left">
                        <h3>${item.title}</h3>
                        <p>
                            ${item.text}
                        </p>
                        <a href="#" class="more-btn">Daha ətraflı</a>
                    </div>
                    <div class="slide-right" style="background-image: url('${item.img}');">
                    </div>
                    </div>
                    <a href="javascript:void(0);" class="item-link" data-id="${item.id}">
                    </a>    
            </div>
            </div>`
        })

        data.forEach(item => {
            modalContent.innerHTML += `<div class="sm-item" data-id="${item.id}">
            <div class="sm_i-top">
                <div class="sm_i-text">${item.title}</div>
                <div class="sm_i-bg" style="background-image: url('${item.bg}');"></div>
            </div>
            <div class="sm_i-bottom">
                ${item.paragraph}
            </div>
            </div>`
        })

        data.forEach(item => {
            slideNavbar.innerHTML += `<li><a href="javascript:void(0)" data-id="${item.id}">${item.title}</a></li>`
        });
        
        const paginations = slideNavbar.querySelectorAll('a')
        const modalSlides = modalContent.querySelectorAll('.sm-item')
        const modalParent = document.getElementById('slide-modal')
        const modal = document.querySelector('.modal')
        const slideItems = document.querySelectorAll('.item-link')
        const closeBtn = document.querySelector('.close-btn')

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show')
            modalParent.classList.remove('show')
        })

        slideItems.forEach(item => {
            item.addEventListener("click", () => {
                modal.classList.add('show')
                modalParent.classList.add('show')
                paginations.forEach(pagination => {
                    if(item.dataset.id===pagination.dataset.id) {
                        pagination.click()
                    }
                })
            })
        })

        paginations.forEach(pagination => {
            pagination.addEventListener('click', () => {
                let paginationID;
                if(!pagination.classList.contains('active')) {
                    removeActivePagination()
                    pagination.classList.add('active')
                    paginationID=pagination.dataset.id
                    modalSlides.forEach(item => {
                        if(paginationID===item.dataset.id) {
                            removeSlides()
                            item.classList.add('active')
                        }
                    })
                }
            })
        })

        function removeActivePagination() {
            paginations.forEach(pagination => {
                pagination.classList.remove('active')
            })
        }

        function removeSlides() {
            modalSlides.forEach(item => {
                item.classList.remove('active')
            })
        }

        const dragLength = carouselContainer.querySelector('.slide-item')

        leftBtn.addEventListener("click", () => {
            carouselContainer.scrollLeft -= (dragLength.clientWidth + 15)
        })

        rightBtn.addEventListener("click", () => {
            carouselContainer.scrollLeft += (dragLength.clientWidth + 15)
        })

        const dragStart= (e) => {
            isDragging=true;
            prevPageX = e.pageX || e.touches[0].pageX
            prevScrollLeft = carouselContainer.scrollLeft
        }

        const dragging = (e) => {
            if(!isDragging) return;
            e.preventDefault()
            carouselContainer.classList.add('dragging')
            let diffBetweenPosition = (e.pageX || e.touches[0].pageX) - prevPageX
            carouselContainer.scrollLeft = prevScrollLeft - diffBetweenPosition
        }

        const dragStop = () => {
            isDragging = false;
            carouselContainer.classList.remove('dragging')
        }

        carouselContainer.addEventListener('mousemove', dragging)
        carouselContainer.addEventListener('touchmove', dragging)

        carouselContainer.addEventListener('mousedown', dragStart)
        carouselContainer.addEventListener('touchstart', dragStart)

        carouselContainer.addEventListener('mouseup', dragStop)
        carouselContainer.addEventListener('mouseleave', dragStop)
        carouselContainer.addEventListener('touchend', dragStop)

    } catch(err) {
        console.error("Error fetching or processing news:", err);
    }
}

getServices() 

const form = document.getElementById('form')
const radioBtns = document.querySelectorAll('.payMethod')
const customerName= document.getElementById('name')
const customerSurname= document.getElementById('surname') 
const customerPhoneNumber= document.getElementById('phone-number') 
const customerFin= document.getElementById('fin')
const customerCardType= document.getElementById('typeofcard')
const customerCurrency= document.getElementById('currency-select')
const customerPayMethod= document.getElementById('pay-method')
const customerPrivateMessage= document.getElementById('privateMessage') 
const customerDeliveryMethod= document.getElementById('deliveryMethod') 
const customerCity= document.getElementById('city') 
const customerDeliveryAddress=  document.getElementById('deliveryAddress') 
const customerBranch= document.getElementById('branch') 
const customerPaymentWay= document.getElementById('paymentWay')

let payment;
radioBtns.forEach(item => {
    item.addEventListener('click', () => {
        payment = item.nextElementSibling.innerText
    })
})

form.addEventListener('submit', (e) => {
    
    e.preventDefault()
    if(customerName.value && customerSurname.value && customerCardType && customerCurrency.value && customerFin && customerPhoneNumber.value && customerPayMethod.value && customerDeliveryMethod.value) {
        fetch('http://localhost:3000/order-card', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: customerName.value ? customerName.value : '-',
                surname: customerSurname.value ? customerSurname.value : '-',
                phoneNumber: customerPhoneNumber.value ? customerPhoneNumber.value : '-',
                fin: customerFin.value ? customerFin.value : '-',
                cardType: customerCardType.value ? customerCardType.value : '-',
                currency: customerCurrency.value ? customerCurrency.value : '-',
                paymentMethod: customerPayMethod.value ? 
                (customerPayMethod.value=="Kartın qiymətini ödəməklə" ? customerPayMethod.value + `(${payment ? payment: ''})`: customerPayMethod.value) : '-',
                privateMessage: customerPrivateMessage.value ? customerPrivateMessage.value : '-',
                deliveryMethod: customerDeliveryMethod.value ? customerDeliveryMethod.value : '-',
                city: customerCity.value ? customerCity.value : '-',
                deliveryAddress:  customerDeliveryAddress.value ? customerDeliveryAddress.value : '-',
                branch: customerBranch.value ? customerBranch.value : '-',
                paymentWay: customerPaymentWay.value ? customerPaymentWay.value : '-'
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        customerName.classList.remove('alert')
        customerSurname.classList.remove('alert')
        customerCardType.classList.remove('alert')
        customerCurrency.classList.remove('alert')
        customerFin.classList.remove('alert')
        customerPhoneNumber.classList.remove('alert')
        customerPayMethod.classList.remove('alert')
        customerDeliveryMethod.classList.remove('alert')
        customerPaymentWay.classList.remove('alert')
        customerBranch.classList.remove('alert')
        customerPrivateMessage.classList.remove('alert')
        customerCity.classList.remove('alert')
        customerDeliveryAddress.classList.remove('alert')

        window.location.href = "orderTable.html"

        customerName.value = ""
        customerSurname.value = ""
        customerCardType.value = ""
        customerCurrency.value = ""
        customerFin.value = ""
        customerPhoneNumber.value = ""
        customerPayMethod.value = ""
        customerDeliveryMethod.value = ""
        customerPaymentWay.value = ""
        customerBranch.value = ""
        customerPrivateMessage.value = ""
        customerCity.value = ""
        customerDeliveryAddress.value = ""

    } else {
        customerName.classList.add('alert')
        customerSurname.classList.add('alert')
        customerCardType.classList.add('alert')
        customerCurrency.classList.add('alert')
        customerFin.classList.add('alert')
        customerPhoneNumber.classList.add('alert')
        customerPayMethod.classList.add('alert')
        customerDeliveryMethod.classList.add('alert')
        customerPaymentWay.classList.add('alert')
        customerBranch.classList.add('alert')
        customerPrivateMessage.classList.add('alert')
        customerCity.classList.add('alert')
        customerDeliveryAddress.classList.add('alert')
    }
})

