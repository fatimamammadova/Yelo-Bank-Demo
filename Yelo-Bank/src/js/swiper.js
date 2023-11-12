const slides = document.querySelectorAll("#stories .story-link");

function fillBars() {
  const item = document.querySelector(".modal-swiper .swiper-slide-active");
  if (item) {
    const bgBarOne = document.querySelector(".bar-1");
    const label = item.dataset.swiperSlideIndex;
    switch (+label) {
      case 0:
        bgBarOne.style.animation = `fillBar 10.1s linear infinite`;
        break;
      case 1:
        const bgBarTwo = document.querySelector(".bar-2");
        bgBarTwo.style.animation = `fillBar 10.1s linear infinite`;
        break;
      case 2:
        const bgBarThree = document.querySelector(".bar-3");
        bgBarThree.style.animation = `fillBar 10.1s linear infinite`;
        break;
    }
  }
}

var swiper1 = new Swiper(".mainSwiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
});

var swiper2 = new Swiper(".storySwiper", {
  spaceBetween: 30,
  slidesPerView: "auto",
});

var swiper3 = new Swiper(".modalSwiper", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-stories-button-next",
    prevEl: ".swiper-stories-button-prev",
  },
  pagination: {
    el: ".swiper-stories-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
  thumbs: {
    swiper: swiper2,
  },
  on: fillBars(),
});

swiper3.on("slideChange", () => {
  const fillingbar = document.querySelectorAll(".bar-color");
  const item = document.querySelector(".swiper-modal .swiper-slide-active");
  fillingbar.forEach((bar) => {
    bar.style.width = "0";
    bar.style.animation = ``;
  });
  fillBars();
});

const fillingBars = document.querySelectorAll(".bar-color");
const modalSlides = document.querySelectorAll(".modal-swipers .swiper-slide");

slides.forEach((slide) => {
  slide.addEventListener("click", () => {
    storyModal.classList.add("show-modal");
    modalContainer.classList.add("show");
  });
});
