const langSelectionHeader = document.querySelector(".ls-header");
const langSelectionContent = document.querySelector(".ls-content");
const language = document.querySelector(".language");

const languages = document.querySelectorAll(".lang");

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

const header = document.querySelector("header");

const search = document.querySelector(".search");
const searchInput = document.querySelector(".search-inner");

const searchOpenBtn = document.querySelector(".search-icon");

const searchBtn = document.querySelector(".search-btn");
const searchCloseBtn = document.querySelector(".search-close-btn");

searchOpenBtn.addEventListener("click", () => {
  search.classList.add("show");
});

searchCloseBtn.addEventListener("click", () => {
  search.classList.remove("show");
});

const closeMessagePopup = document.querySelector(".close-popup");
const messageBtn = document.querySelector(".message-button");
const messageModal = document.querySelector(".message-modal");
const modal = document.querySelector(".modal-popup");

const formContent = document.querySelectorAll(".form-content .content-inner");

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

const news = document.querySelector('.news .row')

fetch('http://localhost:3000/NEWS')
.then(res => res.json())
.then(data => {
    data.forEach(item => {
        news.innerHTML += 
        `<div class="news-item col-3">
        <div class="news-inner">
            <div class="news-heading">
                <h3>${item.title}</h3>
            </div>
            <div class="news-footer">
                <a href="#" class="arrow-btn">Daha ətraflı</a>

                <span class="time">${formatDate(item.date)}</span>
            </div>
            <a href="javascript:void(0)" class="news-link"></a>
        </div>
        </div>`

        
        function formatDate(time) {
            const months = [
                "Yanvar",
                "Fevral",
                "Mart",
                "Aprel",
                "May",
                "İyun",
                "İyul",
                "Avqust",
                "Sentyabr",
                "Oktyabr",
                "Noyabr",
                "Dekabr"
            ];
        
            const date = new Date(time);
            const day = date.getDate();
            const month = months[date.getMonth()];
            const year = date.getFullYear();
        
            return `${day} ${month} ${year}`;
        }

    })
})

