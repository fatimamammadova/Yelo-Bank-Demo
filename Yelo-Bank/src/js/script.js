const langSelectionHeader = document.querySelector(".ls-header");
const langSelectionContent = document.querySelector(".ls-content");
const language = document.querySelector(".language");
const languages = document.querySelectorAll(".lang");
const headerBottom = document.querySelector('.header-bottom')
const headerTop = document.querySelector('.header-top')
const loginBtn = document.querySelector('.login-button')
const hamburgerMenuBtn = document.querySelector(".hm-button");
const hamburgerMenuContent = document.querySelector(".hamburger-menu");
const contentContainer = document.querySelector(".hamburger-menu .container");
const headerBg = document.querySelector(".header-bottom");
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
const storyClose = document.querySelector(".story-close");
const modalContainer = document.querySelector(".story-modal");
const storyModal = document.querySelector(".story-modal .modal");
const bgColor = document.querySelector(".bg-color");


let windowScroll = window.scrollY
let scrollBar = hamburgerMenuContent.offsetWidth - hamburgerMenuContent.clientWidth;


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

///////////////////////~???~//////////////////////
hamburgerMenuBtn.addEventListener("click", () => {
  hamburgerMenuBtn.classList.toggle("close-active");
  if (!hamburgerMenuBtn.classList.contains("close-active")) {
    hamburgerMenuContent.style.maxHeight = "0";
    hamburgerMenuContent.classList.remove('active')
    bgColor.classList.remove('active')
    window.addEventListener('scroll',() => {
      if(window.scrollY < 20) {
        headerBg.style.backgroundColor = "transparent";
      } else {
        headerBg.style.backgroundColor = "#fff";
      }
    })
  } else {
    if (document.documentElement.scrollWidth <= 1096) {
      hamburgerMenuContent.style.maxHeight = "calc(100vh - 150px)";
    } else {
      hamburgerMenuContent.style.maxHeight = "calc(100vh - 140px)";
    }
    headerBg.style.backgroundColor = "#fff";
    hamburgerMenuContent.classList.add('active')
    bgColor.classList.remove('active')
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

storyClose.addEventListener("click", () => {
    modalContainer.classList.remove("show");
    storyModal.classList.remove("show-modal");
});