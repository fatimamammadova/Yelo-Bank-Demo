const partialContent = document.querySelector('.partial-content')
const originalContent = partialContent.innerHTML
const firstContent = originalContent.slice(0,780)
const secondContent = originalContent.slice(780)
const moreBtn = document.querySelector('.more-button')

const storyClose = document.querySelector(".story-close");
const modalContainer = document.querySelector(".story-modal");
const storyModal = document.querySelector(".story-modal .modal");


storyClose.addEventListener("click", () => {
    modalContainer.classList.remove("show");
    storyModal.classList.remove("show-modal");
});


partialContent.innerHTML = firstContent
moreBtn.addEventListener("click", () => {
    partialContent.innerHTML = originalContent;
    moreBtn.style.display = 'none';
})


async function getcards() {
    try {
        const res = await fetch("http://localhost:3000/deposits");
        const data = await res.json();
        data.forEach(item => {
            const cardContainer = document.querySelector('.deposits-cards')
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
                        Əmanət sifariş et
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

            
        })
    } 
    catch (error) {
      console.error("Error fetching or processing news:", error);
    }
}
getcards();