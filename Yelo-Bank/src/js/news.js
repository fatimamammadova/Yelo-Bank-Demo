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

const newsAddBtn = document.querySelector('.add-news')
const newsModalBg = document.querySelector('.news-modal')
const newsModal = document.querySelector('.news-modal .modal')
const closeNewsModal = document.querySelector('.close-news-modal')


newsAddBtn.addEventListener("click",() => {
  newsModalBg.classList.add('show')
  newsModal.classList.add('show-modal')
})

closeNewsModal.addEventListener('click',() => {
  newsModalBg.classList.remove('show')
  newsModal.classList.remove('show-modal')
})



const newsNameInput = document.querySelector('.nameinput')
const news = document.querySelector('.news .row')


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


function getNews() {
  fetch('http://localhost:3000/NEWS')
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
        // let newsItem = `<div class="news-item col-3">
        // <div class="news-inner">
        //     <div class="news-heading">
        //         <h3>${item.title}</h3>
        //         <div class="edit-news">
        //             <button type="button" class="edit-button">
        //                 <i class="fa-solid fa-ellipsis-vertical"></i>
        //             </button>
    
        //             <div class="edit-dropdown">
        //                 <div class="dropdown-item delete-item">
        //                     <i class="fa-solid fa-trash-can"></i>
        //                     <span>Sil</span>
        //                 </div>
        //                 <div class="dropdown-item edit-item">
        //                     <i class="fa-solid fa-pen"></i>
        //                     <span>Düzəliş et</span>
        //                 </div>
        //                 <div class="dropdown-item"></div>
        //             </div>
    
        //         </div>
        //     </div>
        //     <div class="news-footer">
        //         <a href="javascript:void(0)" class="arrow-btn">Daha ətraflı</a>
        //         <span class="time">${formatDate(item.date)}</span>
        //     </div>
        // </div>
        // </div>`
        // news.insertAdjacentHTML("afterbegin",newsItem)

        news.innerHTML +=`<div class="news-item col-3">
        <div class="news-inner">
            <div class="news-heading">
                <h3>${item.title}</h3>
                <div class="edit-news">
                    <button type="button" class="edit-button">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
    
                    <div class="edit-dropdown">
                        <div class="dropdown-item delete-item">
                            <i class="fa-solid fa-trash-can"></i>
                            <span>Sil</span>
                        </div>
                        <div class="dropdown-item edit-item">
                            <i class="fa-solid fa-pen"></i>
                            <span>Düzəliş et</span>
                        </div>
                        <div class="dropdown-item"></div>
                    </div>
    
                </div>
            </div>
            <div class="news-footer">
                <a href="javascript:void(0)" class="arrow-btn">Daha ətraflı</a>
                <span class="time">${formatDate(item.date)}</span>
            </div>
        </div>
        </div>`
    })
  })
}

const addBtn = document.querySelector('.add-button')
addBtn.addEventListener('click',() => {
  const date = new Date()
  postNewData(newsNameInput.value,date)
  closeNewsModal.click()
})



function postNewData(newData,currentDate) {
  fetch('http://localhost:3000/NEWS',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newData,
        date: currentDate
      })
  })
  .then(res => res.json())
  .then(data => {
      if(newData !== '') {
        data.title = newData
        currentDate = new Date()
        const newsDate = currentDate.toISOString()
        data.date = newsDate
        news.innerHTML +=`<div class="news-item col-3">
        <div class="news-inner">
            <div class="news-heading">
                <h3>${data.title}</h3>
                <div class="edit-news">
                    <button type="button" class="edit-button">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
    
                    <div class="edit-dropdown">
                        <div class="dropdown-item delete-item">
                            <i class="fa-solid fa-trash-can"></i>
                            <span>Sil</span>
                        </div>
                        <div class="dropdown-item edit-item">
                            <i class="fa-solid fa-pen"></i>
                            <span>Düzəliş et</span>
                        </div>
                        <div class="dropdown-item"></div>
                    </div>
    
                </div>
            </div>
            <div class="news-footer">
                <a href="javascript:void(0)" class="arrow-btn">Daha ətraflı</a>
                <span class="time">${formatDate(data.date)}</span>
            </div>
        </div>
        </div>`

      }
  })
}

function deleteData(dataId) {
  fetch(`http://localhost:3000/NEWS/${dataId}`,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
  .then(data => {
  })
}


function deleteNews() {
  const deleteBtn = document.querySelectorAll('.delete-item')
  for(let i=0;i<deleteBtn.length;i++) {
    deleteBtn[i].addEventListener("click",() => {
      deleteData(i+1)
      console.log(i+1)
    })
  }
}

function dataBtn() {
  fetch('http://localhost:3000/NEWS')
  .then(res => res.json())
  .then(data => {
      const newsItem = document.querySelectorAll('.news-item')
      newsItem.forEach(item => {
        const editItem = item.querySelector('.edit-item')
        const editBtn = item.querySelector('.edit-button')
        const editDropDown = item.querySelector('.edit-dropdown')
        editBtn.addEventListener("click",() => {
          editDropDown.classList.add('show')
        })
        window.addEventListener("click", (e) => {
          if (e.target != editBtn && e.target != editBtn.firstElementChild && editDropDown.classList.contains('show')) {
              editDropDown.classList.remove("show")
          }
        })

        const editModalBg = document.querySelector('.edit-modal')
        const editModal = document.querySelector('.edit-modal .modal')
        const closeEditModal = document.querySelector('.close-edit-modal')

        editItem.addEventListener("click",() => {
          editModalBg.classList.add('show')
          editModal.classList.add('show-modal')
        })
        
        closeEditModal.addEventListener("click", () => {
          editModalBg.classList.remove('show')
          editModal.classList.remove('show-modal')
        })
      })
      deleteNews()
    })
}
  
getNews()
dataBtn()