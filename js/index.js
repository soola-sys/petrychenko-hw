class MenuCard {
  constructor(src, alt, title, price, desc, ...classes) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.price = price;
    this.desc = desc;
    this.classes = classes;
    this.transfer = 27;
    this.changetoUAH();
  }
  changetoUAH() {
    this.price = this.transfer * this.price;
  }
  renderCard() {
    let template = "";

    let card = document.createElement("div");
    if (this.classes.length === 0) {
      this.card = "menu__item";
      card.classList.add(this.card);
    } else {
      this.classes.forEach((className) => {
        card.classList.add(className);
      });
    }

    this.src && (template += `<img src="${this.src}" alt="${this.alt}">`);

    this.title &&
      (template += `<h3 class="menu__item-subtitle">${this.title}"</h3>`);

    this.desc &&
      (template += `<div class="menu__item-descr">${this.desc}</div>`);

    if (this.price) {
      template += `
                <div class="menu__item-price">
                `;
      template += `
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                `;
      template += `</div>`;
    }
    card.innerHTML = template;
    return card;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const tabsContent = document.querySelectorAll(".tabcontent"),
    tabsItems = document.querySelectorAll(".tabheader__item"),
    tabsParent = document.querySelector(".tabheader__items");
  // Tabs
  function hideTabs() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabsItems.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }
  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabsItems[i].classList.add("tabheader__item_active");
  }

  hideTabs();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabsItems.forEach((item, idx) => {
        if (target == item) {
          hideTabs();
          showTabContent(idx);
        }
      });
    }
  });

  // Timer
  let deadline = "2022-10-25";

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  // Modal

  const myModal = document.querySelector(".modal");
  const modalTrigger = document.querySelectorAll("[data-modal]");

  function openModal() {
    myModal.classList.add("show");
    myModal.classList.remove("hide");
    document.body.style.overflow = "hidden";
  }

  modalTrigger.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  const closeModal = () => {
    myModal.classList.add("hide");
    myModal.classList.remove("show");
    document.body.style.overflow = "";
  };


  myModal.addEventListener("click", (e) => {
    if (e.target === myModal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeModal();
    }
  });

//   const modalTimerId = setTimeout(openModal , 3000);

  function showModalByScroll() {
    if (
      window.scrollY + window.innerHeight + 200 >
      document.body.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);

  const container = document.querySelector(".menu__field .container");
  container.innerHTML = "";

  const getRecource = async (url) => {
    const res = await fetch(url)
      if(!res.ok){
        throw Error('Error happened!');
      }
      return await res.json();
  }
  getRecource('http://localhost:3000/menu')
  .then(data => {
    console.log(data);
    data.map((obj) => {
      container.append(new MenuCard(obj.img , obj.altImage , obj.title , obj.price , obj.descr).renderCard());
    });
  })
  .catch(() => console.error);

  const forms = document.querySelectorAll("form");
  forms.forEach((item) => {
    bindPostData(item);
  });

  const postData = async (url , data) => {
  
    const res = await fetch(url , {
        method : 'POST', 
        headers : {
          'Content-type':'application/json',
        },
        body : data,
    })
    return await res.json();
  }

  function bindPostData(form) {
    form.addEventListener("submit", (event) => {

      const message = {
        loading: 'icons/spinner.svg',
        success: "Спасибо мы с вами свяжемся!",
        error: "ошибка загрузки!",
      };

      event.preventDefault();
      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.classList.add('spin');
      form.append(statusMessage);

      const formdata = new FormData(form);
      
      const json = JSON.stringify(Object.fromEntries(formdata.entries()))

      postData('http://localhost:3000/requests', json)
      .then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.error);
      }).finally(() => {
        form.reset();
      })
    });
  }
  function showThanksModal(message) {
    const prevModal = document.querySelector(".modal__dialog");
    prevModal.classList.add("hide");
    openModal();
    const thankModal = document.createElement("div");
    thankModal.classList.add("modal__dialog");

    thankModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

   document.querySelector('.modal').append(thankModal);

    setTimeout(() => {
        thankModal.remove();
        prevModal.classList.add('show');
        prevModal.classList.remove('hide');
        closeModal()
    }, 3000)
  }

  //Slider
  
 // 1. Получить все элементы на странице
 // 2. Получить индекс слайдера
 // 3.Функция для показа определенного слайда и скрытие других
 // 4. 

 const slides = document.querySelectorAll('.offer__slide'),
       slider = document.querySelector('.offer__slider'),
       prev = document.querySelector('.offer__slider-prev'),
       next = document.querySelector('.offer__slider-next'),
       currentSlide = document.querySelector('#current'),
       totalSlide = document.querySelector('#total'),
       slidesField = document.querySelector('.offer__slider-inner'),
       slidesWrapper = document.querySelector('.offer__slider-wrapper'),
       width = window.getComputedStyle(slidesWrapper).width;

console.log(slider);
let sliderIndex = 1;
let offset = 0;
slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';
slidesWrapper.style.overflow = 'hidden';

slider.style.position = 'relative';
const sliderDots = document.createElement('div');
sliderDots.classList.add('carousel-indicators');
slider.append(sliderDots);

for(let i = 0 ; i < slides.length;i++){
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.dataset.id = `${i+1}`;
  if(i == 0){
    dot.style.opacity = 1;
  }
  sliderDots.append(dot);
}

const getDots = document.querySelectorAll('.dot');

if(slides.length < 10){
  totalSlide.textContent = `0${slides.length}`;
  currentSlide.textContent = `0${sliderIndex}`;
}else{
  totalSlide.textContent = slides.length;
  currentSlide.textContent = sliderIndex;
}

slides.forEach((item) => {
  item.style.width = width;
})

function replaceString(str){
  return parseInt(str.replace(/\D/g , ''));
}

next.addEventListener('click' ,() => {

  if(offset == replaceString(width) * (slides.length - 1)){
    offset = 0;
  } else {
    offset += replaceString(width);
  }

  slidesField.style.transform = `translateX(-${offset}px)`;

  if (sliderIndex == slides.length){
    sliderIndex = 1;
  }else{
    sliderIndex++;
  }

  if(slides.length < 10){
    currentSlide.textContent = `0${sliderIndex}`;
  }
  else{
    currentSlide.textContent = sliderIndex;
  }
  getDots.forEach((dot) => {
    dot.style.opacity = '.5';
  })
  getDots[sliderIndex - 1].style.opacity =  1;
});

prev.addEventListener('click', () => {
  if(offset == 0){
    offset = replaceString(width) * (slides.length - 1);
  } else {
    offset -= replaceString(width);
  }

  slidesField.style.transform = `translateX(-${offset}px)`;
  
  if (sliderIndex == 1){
    sliderIndex = slides.length;
  }else{
    sliderIndex--;
  }

  if(slides.length < 10){
    totalSlide.textContent = `0${sliderIndex}`;
  }
  else{
    totalSlide.textContent = sliderIndex;
  }

  getDots.forEach((dot) => {
    dot.style.opacity = '.5';
  })
  getDots[sliderIndex - 1].style.opacity =  1;
})

 getDots.forEach((el) => {
  el.addEventListener('click' , (event) => {
    if(event.target.classList.contains('dot')){
      const slideTo = event.target.getAttribute('data-id');
      sliderIndex = slideTo;
      offset = replaceString(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      if(slides.length < 10){
        currentSlide.textContent = `0${sliderIndex}`;
      }
      else{
        currentSlide.textContent = sliderIndex;
      }
      getDots.forEach((dot) => {
        dot.style.opacity = '.5';
      })
      getDots[sliderIndex - 1].style.opacity =  1;
    }
  })
 })

});
// if(slides.length  < 10){
//   totalSlide.textContent = `0${slides.length}`;
// }
// else{
//   totalSlide.textContent = slides.length;
// }
// showSlides(sliderIndex);

// function showSlides(n){
//   if(n > slides.length){
//     sliderIndex = 1;
//   }
//   if(n < 1){
//     sliderIndex = slides.length;
//   }
//   slides.forEach(item => item.style.display = 'none');
//   slides[sliderIndex - 1].style.display = 'block';

//   if(slides.length  < 10){
//     currentSlide.textContent = `0${sliderIndex}`;
//   }
//   else{
//     currentSlide.textContent = sliderIndex;
//   }

// }

// function plusSlider(n){
//   showSlides(sliderIndex += n);
// }

// prev.addEventListener('click' , () => {
//   plusSlider(-1);
// })
// next.addEventListener('click' , ()=> {
//   plusSlider(1);
// })

