const promotionTwo = document.querySelector(".mobile-app-promotion");
const mobilePromotionTwo = document.querySelector(".mobile-promotion");
const mainTitle = document.querySelector('#main-title')
const headerTwo = document.querySelector("header");

const partialContent = document.querySelector('.partial-content')
const originalContent = partialContent.innerHTML
const firstContent = originalContent.slice(0,740)
const secondContent = originalContent.slice(740)
const moreBtn = document.querySelector('.more-button')



window.addEventListener("resize", () => {
    if (
      document.documentElement.scrollWidth <= 576 ||
      sessionStorage.getItem("status") == "hide"
    ) {
      headerTwo.style.top = "0";
      mainTitle.style.paddingTop = "120px";
    } else {
      headerTwo.style.top = "120px";
      mainTitle.style.paddingTop = "240px";
      promotionTwo.classList.add("show");
      mobilePromotionTwo.classList.add("show");
    }
  });
  
if (sessionStorage.getItem("status") !== "hide") {
    promotionTwo.classList.add("show");
    mobilePromotionTwo.classList.add("show");
    if (!(document.documentElement.scrollWidth <= 576)) {
      console.log("1");
      headerTwo.style.top = "120px";
      mainTitle.style.paddingTop = "240px";
    }
}

partialContent.innerHTML = firstContent
moreBtn.addEventListener("click", () => {
    partialContent.innerHTML = originalContent;
    moreBtn.style.display = 'none';
})


async function getCards() {
    try {
      const res = await fetch("http://localhost:3000/laons");
      const data = await res.json();
      data.forEach(item => {

        const cardContainer = document.querySelector('.cards')

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


        <div class="card-right">
            <div class="img">
                <div class="img-container">
                    <div class="card-img" style="background-image: url('${item.img}');">
                    <div class="gradient-bg"></div>
                    </div>
                    
                    <div class="shadow-bg"></div>               
                    </div>
            </div>
            </div> 
        </div>`
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


    } catch (error) {
      console.error("Error fetching or processing news:", error);
    }
}
getCards();