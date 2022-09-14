class MenuCard {
    constructor(src , alt , title , price , desc){
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.price = price;
      this.desc = desc;
    }

    renderCard(){
         
        let template = '';

            let card = document.createElement('div');
            card.className = 'menu__item';

            this.src && (template += `<img src="${this.src}" alt="${this.alt}">`);

            this.title && (template += `<h3 class="menu__item-subtitle">${this.title}"</h3>`);

            this.desc && (template += `<div class="menu__item-descr">${this.desc}</div>`);

            if(this.price){

                template += `
                <div class="menu__item-price">
                `
                template += `
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                `
                template += `</div>`
            }
            card.innerHTML = template; 
            return card;   
    }
}

document.addEventListener('DOMContentLoaded' , () => {
    const tabsContent = document.querySelectorAll('.tabcontent'),
          tabsItems = document.querySelectorAll('.tabheader__item'),
          tabsParent = document.querySelector('.tabheader__items');
    // Tabs 
    function hideTabs(){
        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show' , 'fade');
        })

       tabsItems.forEach((item) => {
        item.classList.remove('tabheader__item_active');
       })
    }
    function showTabContent(i = 0){
     tabsContent[i].classList.add('show' ,'fade');
     tabsContent[i].classList.remove('hide');
     tabsItems[i].classList.add('tabheader__item_active');
    }

    hideTabs();
    showTabContent();

    tabsParent.addEventListener('click' , (event) => {
     const target = event.target;
    if(target && target.classList.contains('tabheader__item')){
        tabsItems.forEach((item , idx) => {
            if(target == item){
                hideTabs();
                showTabContent(idx);
            }
        })
    }
    })

    // Timer
    let deadline = '2022-09-11';

    function getTimeRemaining(endtime) {
        
        const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 * 24)) , 
        hours = Math.floor((t / (1000 * 60 * 60 ) % 24)),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days ,
            'hours': hours , 
            'minutes':minutes,
            'seconds': seconds,
          };
    }

    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        }
        else{
            return num;
        }
    }

    function setClock(selector , endtime){
        const timer = document.querySelector(selector), 
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock ,1000);
        
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
 
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            
            if(t.total <= 0){
               clearInterval(timeInterval);
            }
        }
    }

   setClock('.timer' , deadline);

   // Modal 

   const myModal = document.querySelector('.modal');
   const modalClose = document.querySelector('[data-close]');

   const modalTrigger = document.querySelectorAll('[data-modal]');

   function openModal() {
    myModal.classList.add('show');
    myModal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    // clearInterval(modalTimerId);
}

    modalTrigger.forEach((item) => {
        item.addEventListener('click', openModal);
    })
   
    const closeModal = () => {
        myModal.classList.add('hide');
        myModal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click' , closeModal)

    myModal.addEventListener('click', (e) => {
       if(e.target === myModal){
        closeModal();
       }
    })
    document.addEventListener('keydown' , (e) => {
      if(e.code === 'Escape' || myModal.classList.contains('show')){
        closeModal();
      }
    });

    // const modalTimerId = setTimeout(openModal , 3000);

    function showModalByScroll(){
        if(window.scrollY + window.innerHeight + 200 > document.body.scrollHeight){
            openModal()
            window.removeEventListener('scroll' , showModalByScroll)
        }
    }
    window.addEventListener('scroll' , showModalByScroll);

    const container = document.querySelector('.menu__field .container');
    container.innerHTML = '';
    let newCard = new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Products',
        225,
        'Custom Card');

    container.append(newCard.renderCard());
});
