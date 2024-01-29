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

    }
}

getServices() 