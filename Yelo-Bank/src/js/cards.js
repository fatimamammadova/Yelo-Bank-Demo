const partialContent = document.querySelector('.partial-content')
const originalContent = partialContent.innerHTML
const firstContent = originalContent.slice(0,740)
const secondContent = originalContent.slice(740)
const moreBtn = document.querySelector('.more-button')
const storyClose = document.querySelector(".story-close");
const modalContainer = document.querySelector(".story-modal");
const storyModal = document.querySelector(".story-modal .modal");
let scrollBar = hamburgerMenuContent.offsetWidth - hamburgerMenuContent.clientWidth;

storyClose.addEventListener("click", () => {
  modalContainer.classList.remove("show");
  storyModal.classList.remove("show-modal");
});

async function getCards() {
    try {
      const res = await fetch("http://localhost:3000/cards");
      const data = await res.json();
      data.forEach(card => {

        const cardContainer = document.querySelector('.cards')

        cardContainer.innerHTML += `<div class="card" style="background-image: url('./img/yelo_block.svg');">
        <div class="card-left">
            <h2 class="card-title">
                ${card.name}
            </h2>
            <p>
                ${card.description}
            </p>
            
            <div class="card-about">
                <div class="about-col">
                    <span>Müddət</span>
                    <p> ${card.period}</p>
                </div>

                <div class="about-col">
                    <span>Valyuta</span>
                    <p> ${card.currency}</p>
                </div>

                <div class="about-col">
                    <span>${card.type}</span>
                    <p>${card.typeText}</p>
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
                <div class="img-container ${card.classname}">
                    <div class="card-img" style="background-image: url('${card.img}');">
                    <div class="gradient-bg"></div>
                    </div>
                    
                    <div class="shadow-bg"></div>               
                    </div>
            </div>
            </div> 
        </div>`
    })

    const light = document.querySelector(".light");
    const premium = document.querySelector(".premium");
    const taksit = document.querySelector(".taksit");
    const digital = document.querySelector(".digital");

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
    
      light.addEventListener("mousemove", handleMouseMove);
      light.addEventListener("mouseleave", resetTilt);
    
      premium.addEventListener("mousemove", handleMouseMove);
      premium.addEventListener("mouseleave", resetTilt);
    
      taksit.addEventListener("mousemove", handleMouseMove);
      taksit.addEventListener("mouseleave", resetTilt);

      digital.addEventListener("mousemove", handleMouseMove);
      digital.addEventListener("mouseleave", resetTilt);

    } catch (error) {
      console.error("Error fetching or processing news:", error);
    }
}
getCards();


partialContent.innerHTML = firstContent
moreBtn.addEventListener("click", () => {
    partialContent.innerHTML = originalContent;
    moreBtn.style.display = 'none';
})