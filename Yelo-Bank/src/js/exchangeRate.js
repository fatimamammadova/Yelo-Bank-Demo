const langSelectionHeader = document.querySelector(".ls-header");
const langSelectionContent = document.querySelector(".ls-content");
const language = document.querySelector(".language");
const languages = document.querySelectorAll(".lang");
const closeMessagePopup = document.querySelector(".close-popup");
const messageBtn = document.querySelector(".message-button");
const messageModal = document.querySelector(".message-modal");
const modal = document.querySelector(".modal-popup");
const header = document.querySelector("header");
const search = document.querySelector(".search");
const searchInput = document.querySelector(".search-inner");
const searchOpenBtn = document.querySelector(".search-icon");
const searchBtn = document.querySelector(".search-btn");
const searchCloseBtn = document.querySelector(".search-close-btn");
const headerTop = document.querySelector('.header-top')
const headerBottom = document.querySelector('.header-bottom')
const loginBtn = document.querySelector('.login-button')
const formContent = document.querySelectorAll(".form-content .content-inner");
const promotion = document.querySelector(".mobile-app-promotion");
const mobilePromotion = document.querySelector(".mobile-promotion");
const mainTitle = document.querySelector('#main-title')
const CloseBtn = document.querySelector(".close-img");


const partialContent = document.querySelector('.partial-content')
const originalContent = partialContent.innerHTML
const firstContent = originalContent.slice(0,740)
const secondContent = originalContent.slice(740)
const moreBtn = document.querySelector('.more-button')

const cashBtns = document.querySelectorAll('.cash-button')

function removeActiveCashBtns() {
    cashBtns.forEach(cashBtn => {
        cashBtn.classList.remove('active')
    })
}

cashBtns.forEach(cashBtn => {
    cashBtn.addEventListener("click", () => {
        if(!cashBtn.classList.contains('active')) {
            removeActiveCashBtns()
            cashBtn.classList.add('active')
        } 
    })
})

let windowScroll = window.scrollY
let number = 15
let initalNumber = 0
let dataLength,updateId,updateTitle,updateDate;
let isPost = false


CloseBtn.addEventListener("click", () => {
  sessionStorage.setItem("status", "hide");
  header.style.top = "0";
  mainTitle.style.paddingTop = "120px";
  mobilePromotion.classList.remove("show");
  promotion.classList.remove("show");
});

window.addEventListener("resize", () => {
  if (
    document.documentElement.scrollWidth <= 576 ||
    sessionStorage.getItem("status") == "hide"
  ) {
    header.style.top = "0";
    mainTitle.style.paddingTop = "120px";
  } else {
    header.style.top = "120px";
    mainTitle.style.paddingTop = "240px";
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
    mainTitle.style.paddingTop = "240px";
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
    headerBottom.classList.add('main-header')
    loginBtn.classList.add('scroll-btn')
  } else {
    headerTop.classList.remove('scrolling')
    headerBottom.classList.remove('main-header')
    loginBtn.classList.remove('scroll-btn')
  }

  if(window.scrollY > 20) {
    headerBottom.classList.add('main-header')
  } else {
    headerBottom.classList.remove('main-header')

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




partialContent.innerHTML = firstContent
moreBtn.addEventListener("click", () => {
    partialContent.innerHTML = originalContent;
    moreBtn.style.display = 'none';
})