const searchInputs = document.querySelector('.search-input')
const brandContainer = document.querySelector('.brand-lists .row')
const moreBtn = document.querySelector('.more-button button')
const categorySelect = document.querySelector('#filter')
const categoryBtns = document.querySelectorAll('.category-btns a')
let index = 30
let k = 60
let filteredArr = []

async function getBrands() {
    try {
        const res = await fetch('http://localhost:3000/cashback')
        const data = await res.json()
        


        for (let i = 0; i < data.length; i++) {
            let shouldAddOption = true
            for (let j = i + 1; j < data.length; j++) {
                if (data[j].value == data[i].value) {
                    shouldAddOption = false
                    break;
                }
            }

            if (shouldAddOption) {
                categorySelect.innerHTML += `<option value="${data[i].value}">${data[i].category}</option>`
            }
        }

        function showBrands(first, two, dataToShow) {
            for (let i = first; i < two && i < dataToShow.length; i++) {
                const item = dataToShow[i]
                brandContainer.innerHTML += `<div class="brand-item col-3">
                    <a href="javascript:void(0)">
                        <div class="brand-bg" style="background-image: url('${item.img}');"></div>
                        <div class="item-content">
                            <div class="content">
                                <h3>${item.name.length > 20 ? item.name.slice(0, 20) + `...` : item.name}</h3>
                                <p>${item.category.length > 25 ? item.category.slice(0, 25) + `...` : item.category}</p>
                            </div>
                            <div class="discount">
                                ${item.discount}<span>%</span>
                            </div>
                        </div>
                    </a>
                </div>`
            }
        }

        function filterArray(inputValue, selectValue) {
            let result = data
        
            if (inputValue && selectValue) {
                result = result.filter(item =>
                    item.name.toLowerCase().includes(inputValue) &&
                    item.value.toLowerCase().includes(selectValue)
                )
            } else {
                if (inputValue) {
                    result = result.filter(item => item.name.toLowerCase().includes(inputValue))
                }
        
                if (selectValue) {
                    result = result.filter(item => item.value.toLowerCase().includes(selectValue))
                }
            }
        
            return result
        }

        function showFilterArray() {
            brandContainer.innerHTML = ''
            if (searchInputs.value === "" && categorySelect.value === "") {
                showBrands(0, index, data)
            } else {
                filteredArr = filterArray(searchInputs.value, categorySelect.value)
                showBrands(0, index, filteredArr)
                if(filteredArr.length<=30) {
                    moreBtn.style.display = "none"
                } else {
                    moreBtn.style.display = "inline-block"
                }
            }
            console.log(filteredArr)
        }

        function removeActives() {
            categoryBtns.forEach(item => {
                item.classList.remove("active")
            }) 
        }

        showBrands(0, index, data)

        categorySelect.addEventListener("change", () => {
            brandContainer.innerHTML = ''
            showFilterArray()
            categoryBtns.forEach(item => {
                if(categorySelect.value!==item.dataset.value) {
                    removeActives() 
                }
            })
        })

        searchInputs.addEventListener("input", () => {
            showFilterArray()
        })

        categoryBtns.forEach(item => {
            item.addEventListener('click', () => {
                removeActives()
                item.classList.add("active")
                categorySelect.value=item.dataset.value
                showFilterArray()
            }) 
        })

        moreBtn.addEventListener('click', () => {
            if (searchInputs.value === "" && categorySelect.value === "") {
                showBrands(index, k, data)
            } else {
                showBrands(index, k, filteredArr)
            }
            index = k
            k += 30
        })

    }
    catch(error) {  
        console.error("Error fetching or processing news:", error)
    }
}

getBrands()
