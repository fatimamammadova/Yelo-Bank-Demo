const langSelectionHeader = document.querySelector(".ls-header");
const langSelectionContent = document.querySelector(".ls-content");
const language = document.querySelector(".language");
const languages = document.querySelectorAll(".lang");
const mainNavbar = document.querySelector('.main-navbar')
const headerBottom = document.querySelector('.header-bottom')
const headerTop = document.querySelector('.header-top')
const loginBtn = document.querySelector('.login-button')
const search = document.querySelector(".search");
const searchInput = document.querySelector(".search-inner");
const searchOpenBtn = document.querySelector(".search-icon");
const searchBtn = document.querySelector(".search-btn");
const searchCloseBtn = document.querySelector(".search-close-btn");
const closeMessagePopup = document.querySelector(".close-popup");
const messageBtn = document.querySelector(".message-button");
const messageModal = document.querySelector(".message-modal");
const modal = document.querySelector(".modal-popup");
const formContent = document.querySelectorAll(".form-content .content-inner");
let windowScroll = window.scrollY
const promotion = document.querySelector(".mobile-app-promotion");
const mobilePromotion = document.querySelector(".mobile-promotion");
const header = document.querySelector("header");
const CloseBtn = document.querySelector(".close-img");
const mobileCloseBtn = document.querySelector(".mp-close-btn");
const main = document.querySelector('main')
const hamburgerMenuBtn = document.querySelector(".hm-button");
const hamburgerMenuContent = document.querySelector(".hamburger-menu");
const contentContainer = document.querySelector(".hamburger-menu .container");

hamburgerMenuBtn.addEventListener("click", () => {
    hamburgerMenuBtn.classList.toggle("close-active");
    if (!hamburgerMenuBtn.classList.contains("close-active")) {
      hamburgerMenuContent.classList.remove('active')
      headerBottom.classList.remove('active')
      window.addEventListener('scroll',() => {
        if(window.scrollY <= 20) {
          mainNavbar.style.backgroundColor = "transparent";
        } else {
          mainNavbar.style.backgroundColor = "#fff";
        }
      })
      if(mainNavbar.classList.contains('main-header')) {
        mainNavbar.style.backgroundColor = "#fff";
      } else {
        mainNavbar.style.backgroundColor = "transparent";
      }
    } else {
      mainNavbar.style.backgroundColor = "#fff";
      hamburgerMenuContent.classList.add('active')
      headerBottom.classList.add('active')

      window.addEventListener('scroll',() => {
        if(window.scrollY <= 20) {
          mainNavbar.style.backgroundColor = "#fff";
        }
      })
    }
});


CloseBtn.addEventListener("click", () => {
  sessionStorage.setItem("status", "hide");
  header.style.top = "0";
  main.style.paddingTop = "0";
  mobilePromotion.classList.remove("show");
  promotion.classList.remove("show");
});

mobileCloseBtn.addEventListener("click", () => {
  sessionStorage.setItem("status", "hide");
  header.style.top = "0";
  main.style.paddingTop = "0";
  mobilePromotion.classList.remove("show");
  promotion.classList.remove("show");
});


window.addEventListener("resize", () => {
    if (
      document.documentElement.scrollWidth <= 576 ||
      sessionStorage.getItem("status") == "hide"
    ) {
      header.style.top = "0";
      main.style.paddingTop = "0";
    } else {
      header.style.top = "120px";
      main.style.paddingTop = "120px";
      promotion.classList.add("show");
      mobilePromotion.classList.add("show");
    }
});

  
if (sessionStorage.getItem("status") !== "hide") {
    promotion.classList.add("show");
    mobilePromotion.classList.add("show");
    if (!(document.documentElement.scrollWidth <= 576)) {
      console.log("1");
      header.style.top = "120px";
      main.style.paddingTop = "120px";
    }
}


languages.forEach((item) => {
  const langText = item.querySelector(".lang-text");

item.addEventListener("click", () => {
    language.innerText = langText.innerText;
    removeActiveLanguage();
    langText.classList.add("active-lang");
  });
});

function removeActiveLanguage() {
  languages.forEach((item) => {
    const lang = item.querySelector("span");
    lang.classList.remove("active-lang");
  });
}

langSelectionHeader.addEventListener("click", () => {
  langSelectionContent.classList.add("show");
});

window.addEventListener("click", (e) => {
  if (
    e.target != langSelectionHeader &&
    e.target != langSelectionHeader.firstElementChild &&
    e.target != langSelectionHeader.firstElementChild.firstElementChild
  ) {
    langSelectionContent.classList.remove("show");
  }
});


window.addEventListener('scroll',() => {
  let scrollH = window.scrollY
  if(scrollH > windowScroll && scrollH > 20) {
    headerTop.classList.add('scrolling')
    mainNavbar.classList.add('main-header')
    loginBtn.classList.add('scroll-btn')
  } else {
    headerTop.classList.remove('scrolling')
    mainNavbar.classList.remove('main-header')
    loginBtn.classList.remove('scroll-btn')
  }

  if(window.scrollY > 20) {
    mainNavbar.classList.add('main-header')
  } else {
    mainNavbar.classList.remove('main-header')
  }
  windowScroll = scrollH
})

searchOpenBtn.addEventListener("click", () => {
  search.classList.add("show");
});

searchCloseBtn.addEventListener("click", () => {
  search.classList.remove("show");
});

messageBtn.addEventListener("click", () => {
  messageModal.classList.add("show-popup");
  modal.classList.add("show-modal");
});

closeMessagePopup.addEventListener("click", () => {
  messageModal.classList.remove("show-popup");
  modal.classList.remove("show-modal");
});

formContent.forEach((item) => {
  item.addEventListener("click", () => {
    const itemBtn = item.querySelectorAll(".form-item");
    itemBtn.forEach((button) => {
      button.addEventListener("click", () => {
        if (!button.classList.contains("active-btn")) {
          for (let el of itemBtn) {
            el.classList.remove("active-btn");
          }
          button.classList.add("active-btn");
        }
      });
    });
  });
});

