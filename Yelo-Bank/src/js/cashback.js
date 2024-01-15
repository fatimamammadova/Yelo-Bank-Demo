const searchInputs = document.querySelector('.search-input')


async function getBrands() {
    try {
        const res = await fetch('http://localhost:3000/cashback')
        const data = await res.json()
        
        const brandContainer = document.querySelector('.brand-lists .row')
        const moreBtn = document.querySelector('.more-button button')

        let index=30
        let k=60
        moreBtn.addEventListener('click',() => {
            showMoreBrands(data)
           
        })
        
        function showMoreBrands(dataName) {
            for(let i=index;i<k;i++) {
                if(dataName[i]) {
                    if(i<=k) {
                        brandContainer.innerHTML += `<div class="brand-item col-3">
                        <a href="javascript:void(0)">
                            <div class="brand-bg" style="background-image: url('${dataName[i].img}');"></div>
                            <div class="item-content">
                                <div class="content">
                                    <h3>${dataName[i].name.length > 20 ? dataName[i].name.slice(0,20) + `...` : dataName[i].name}</h3>
                                    <p>${dataName[i].category.length > 25 ? dataName[i].category.slice(0,25) + `...` : dataName[i].category}</p>
                                </div>
                                <div class="discount">
                                    ${dataName[i].discount}<span>%</span>
                                </div>
                            </div>
                        </a>
                        </div>`
                    } else {
                        i=k
                        brandContainer.innerHTML += ``
                    }
                } else {
                    brandContainer.innerHTML += ``
                }
            }
            index=k
            k+=30
        }
        
        function shownBrands(dataName) {
            for(let i=0;i<30;i++) {
                brandContainer.innerHTML += `<div class="brand-item col-3">
                <a href="javascript:void(0)">
                    <div class="brand-bg" style="background-image: url('${dataName[i].img}');"></div>
                    <div class="item-content">
                        <div class="content">
                            <h3>${dataName[i].name.length > 20 ? dataName[i].name.slice(0,20) + `...` : dataName[i].name}</h3>
                            <p>${dataName[i].category.length > 25 ? dataName[i].category.slice(0,25) + `...` : dataName[i].category}</p>
                        </div>
                        <div class="discount">
                            ${dataName[i].discount}<span>%</span>
                        </div>
                    </div>
                </a>
                </div>`  
            }
        }

        shownBrands(data)

        searchInputs.addEventListener("input", () => {
            let inputValue = searchInputs.value
            brandContainer.innerHTML=''
            if(inputValue=="") {
                shownBrands(data)
                showMoreBrands(data)
            }
            const arr=[]
            data.forEach(item => {
                if(item.name.toLowerCase().includes(inputValue) && inputValue!=="") {
                    if(brandContainer.children.length<=30) {
                        brandContainer.innerHTML += `<div class="brand-item col-3">
                            <a href="javascript:void(0)">
                                <div class="brand-bg" style="background-image: url('${item.img}');"></div>
                                <div class="item-content">
                                    <div class="content">
                                        <h3>${item.name.length > 20 ? item.name.slice(0,20) + `...` : item.name}</h3>
                                        <p>${item.category.length > 25 ? item.category.slice(0,25) + `...` : item.category}</p>
                                    </div>
                                    <div class="discount">
                                        ${item.discount}<span>%</span>
                                    </div>
                                </div>
                            </a>
                        </div>`
                    } else {
                        arr.push(item)
                    }
                }
            })

            if(arr.length>0) {
                console.log(arr.length)
                shownBrands(arr)
                showMoreBrands(arr)
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



