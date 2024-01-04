const promotionTwo = document.querySelector(".mobile-app-promotion");
const mobilePromotionTwo = document.querySelector(".mobile-promotion");
const headerTwo = document.querySelector("header");

const CloseBtn = document.querySelector(".close-img");
const mobileCloseBtn = document.querySelector(".mp-close-btn");
const mainTitle = document.querySelector('#main-title')

CloseBtn.addEventListener("click", () => {
  sessionStorage.setItem("status", "hide");
  headerTwo.style.top = "0";
  mainTitle.style.paddingTop = "120px";
  mobilePromotionTwo.classList.remove("show");
  promotionTwo.classList.remove("show");
});

mobileCloseBtn.addEventListener("click", () => {
  sessionStorage.setItem("status", "hide");
  headerTwo.style.top = "0";
  mainTitle.style.paddingTop = "120px";
  mobilePromotionTwo.classList.remove("show");
  promotionTwo.classList.remove("show");
});


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