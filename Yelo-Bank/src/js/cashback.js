

async function getBrands() {
    try {
        const res = await fetch('http://localhost:3000/cashback')
        const data = await res.json()
        
        const brandContainer = document.querySelector('.brand-lists .row')

        data.forEach(item => {
            brandContainer.innerHTML += `<div class="brand-item col-3">
            <a href="javascript:void(0)">
                <div class="brand-bg" style="background-image: url('img/teayoume.webp');"></div>
                <div class="item-content">
                    <div class="content">
                        <h3>teayoume</h3>
                        <p>Restoranlar və kafelər</p>
                    </div>
                    <div class="discount">
                        5<span>%</span>
                    </div>
                </div>
            </a>
        </div>`
        });
    }
    catch(error) {

    }
}

getBrands()