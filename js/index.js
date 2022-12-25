import forms from './modules/forms';
import tabs from './modules/tabs';
import calc from './modules/сalc';
import cards from './modules/cards';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import {openModal} from './modules/modal';

document.addEventListener("DOMContentLoaded", () => {

  const modalTimerId = setTimeout(() => openModal(".modal" , modalTimerId), 30000);

  tabs(".tabheader__item" , ".tabcontent" , ".tabheader__items" , "tabheader__item_active");
  calc();
  cards();
  modal("[data-modal]" , ".modal" , modalTimerId);
  slider(
  { container : '.offer__slider' , 
    slide : '.offer__slide' , 
    prevArrow : '.offer__slider-prev' ,
    nextArrow : '.offer__slider-next' ,
    currentCounter : '#current' ,
    totalCounter : '#total',
    wrapper : '.offer__slider-wrapper',
     field : '.offer__slider-inner'
    });
  timer(".timer" ,"2022-10-25");
  forms("form",".modal" , modalTimerId);
  // Modal
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

