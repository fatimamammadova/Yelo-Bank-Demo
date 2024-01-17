const searchInputs = document.querySelector('.search-input')


async function getBrands() {
    try {
        const res = await fetch('http://localhost:3000/cashback')
        const data = await res.json()
        
        const brandContainer = document.querySelector('.brand-lists .row')
        const moreBtn = document.querySelector('.more-button button')

        let index = 30
        let k = 60
        let isClickedMoreBtn = false
        let filteredData = []

        function showBrands(first,two,data) {
            for(let i=first;i<two;i++) {
                if(data[i]) {
                    if(i<=two) {
                        brandContainer.innerHTML += `<div class="brand-item col-3">
                        <a href="javascript:void(0)">
                            <div class="brand-bg" style="background-image: url('${data[i].img}');"></div>
                            <div class="item-content">
                                <div class="content">
                                    <h3>${data[i].name.length > 20 ? data[i].name.slice(0,20) + `...` : data[i].name}</h3>
                                    <p>${data[i].category.length > 25 ? data[i].category.slice(0,25) + `...` : data[i].category}</p>
                                </div>
                                <div class="discount">
                                    ${data[i].discount}<span>%</span>
                                </div>
                            </div>
                        </a>
                        </div>`
                    } else {
                        i=two
                        brandContainer.innerHTML += ``
                    }
                } else {
                    break
                }
            }
        }

        showBrands(0, 30,data)

        moreBtn.addEventListener('click', () => {
            if(searchInputs.value==="") {
                showBrands(index, k,data)
                index=k
                k+=30
                isClickedMoreBtn = true
            }
        })


        searchInputs.addEventListener("input", () => {
            let inputValue = searchInputs.value
            brandContainer.innerHTML = ''

            if (inputValue === "") {
                showBrands(0, 30,data)
            } else {
                const filteredData = data.filter(item => item.name.toLowerCase().includes(inputValue))
                console.log(filteredData)   

                if(filteredData.length<=30) {
                    showBrands(0,filteredData.length,filteredData)
                } 
                // else {
                //     if(isClickedMoreBtn) {
                //         index=k
                //         k+=30
                //     }
                //     showBrands(index,k,filteredData)
                // }
            }
        })

    }
    catch(error) {

    }
}

getBrands()


async function getCategory() {
    try {
        const res = await fetch('http://localhost:3000/cashback-category')
        const data = await res.json()
        
        const categorySelect = document.querySelector('#filter')

        data.forEach(item => {
            categorySelect.innerHTML += `<option value="${item.value}">${item.category}</option>`
        });

    }
    catch(error) {

    }
}
getCategory()



