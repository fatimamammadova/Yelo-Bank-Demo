const newsAddBtn = document.querySelector('.add-news')
const newsModalBg = document.querySelector('.news-modal')
const newsModal = document.querySelector('.news-modal .modal')
const closeNewsModal = document.querySelector('.close-news-modal')
const newsNameInput = document.querySelector('.nameinput')
const news = document.querySelector('.news .row')
const closeEditModal = document.querySelector('.close-edit-modal')
const editInput = document.querySelector('.editinput')
const addButton = document.querySelector('.add-button')
const moreNewsBtn = document.querySelector('.more-news-button')
const saveBtn = document.querySelector('.edit-news-button')

newsAddBtn.addEventListener("click",() => {
  newsModalBg.classList.add('show')
  newsModal.classList.add('show-modal')
})

closeNewsModal.addEventListener('click',() => {
  newsModalBg.classList.remove('show')
  newsModal.classList.remove('show-modal')
})

function convertToISOFormat(dateString) {
  const monthMap = {
      'Yanvar': 0, 'Fevral': 1, 'Mart': 2, 'Aprel': 3,
      'May': 4, 'İyun': 5, 'İyul': 6, 'Avqust': 7,
      'Sentyabr': 8, 'Oktyabr': 9, 'Noyabr': 10, 'Dekabr': 11
  };
  const parts = dateString.split(' ');
  const day = parseInt(parts[0], 10);
  const month = monthMap[parts[1]];

  if (isNaN(month) || month < 0 || month > 11) {
      throw new Error('Invalid month value in the API response');
  }

  const year = parseInt(parts[2], 10);
  const dateObject = new Date(year, month, day);

  if (isNaN(dateObject.getTime())) {
      throw new Error('Invalid date');
  }

  const isoFormat = dateObject.toISOString();

  return isoFormat;
}

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

async function getData() {
  try {
    const res = await  fetch("http://localhost:3000/NEWS");
    const data = await res.json();
    dataLength = data.length
    for(let i=dataLength - initalNumber-1;i>=dataLength - number; i--) {
      const newsItem = `<div class="news-item col-3">
      <div class="news-inner">
        <div class="news-heading">
          <h3 data-title="${data[i].id}" class="heading-title">${data[i].title}</h3>
            <div class="edit-news">
                <button type="button" class="edit-button">
                  <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
        
                <div class="edit-dropdown">
                  <div class="dropdown-item delete-item" data-id="${data[i].id}">
                    <i class="fa-solid fa-trash-can"></i>
                       <span>Sil</span>
                </div>
                <div class="dropdown-item edit-item" data-id="${data[i].id}">
                    <i class="fa-solid fa-pen"></i>
                        <span>Düzəliş et</span>
                      </div>
                      <div class="dropdown-item"></div>
                 </div>
        
                </div>
              </div>
              <div class="news-footer">
                <a href="javascript:void(0)" class="arrow-btn">Daha ətraflı</a>
                <span class="time">${formatDate(data[i].date)}</span>
              </div>
          </div>
      </div>`

      news.insertAdjacentHTML('beforeend',newsItem)
    }

    const editModalBg = document.querySelector('.edit-modal')
    const editModal = document.querySelector('.edit-modal .modal')
    const newsItem = document.querySelectorAll('.news-item')
    const deleteButtons = document.querySelectorAll('.delete-item')


    deleteButtons.forEach(deleteButton => {
      deleteButton.addEventListener("click", async (e) => {
        e.preventDefault()
        try {
          const response = await fetch(`http://localhost:3000/NEWS/${deleteButton.dataset.id}`, {
            method: 'DELETE'
          })
          setInterval(()=> getData(),1000)
        }
        catch(err) {
          console.log('DELETE request error: ', err)
        }
      })
    })

    newsItem.forEach(item => {
      const editBtn = item.querySelector('.edit-button')
      const editItem = item.querySelector('.edit-item')
      const editDropDown = item.querySelector('.edit-dropdown')

      editBtn.addEventListener("click",() => {
        editDropDown.classList.add('show')
      })

      window.addEventListener("click", (e) => {
        if (e.target != editBtn && e.target != editBtn.firstElementChild && editDropDown.classList.contains('show')) {
          editDropDown.classList.remove("show")
        }
      })
    
      editItem.addEventListener("click",() => {
        editModalBg.classList.add('show')
        editModal.classList.add('show-modal')
        editInput.value = data[editItem.dataset.id-1].title
      })
      
      closeEditModal.addEventListener("click", () => {
        editModalBg.classList.remove('show')
        editModal.classList.remove('show-modal')
      })
    })
  }
  catch(err) {
    console.log('GET request error: ', err)
  }
}
getData()


addButton.addEventListener('click',() => {
  const date = new Date()
  postData(newsNameInput.value,date)
  closeNewsModal.click()
  newsNameInput.value = ''
})

function postData(newData,currentDate) {
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
        const newsItem = `<div class="news-item col-3">
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
        news.insertAdjacentHTML("afterbegin",newsItem)
      }
      
  })
}

moreNewsBtn.addEventListener("click", () => {
  initalNumber = number
  number += 15
  console.log(number)
  if(number < dataLength) {
    getData()
  }
  else if(number - dataLength>=0 && initalNumber < dataLength) {
    number = number + (dataLength % 15)
    getData()
  }

})