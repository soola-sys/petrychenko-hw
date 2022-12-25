function slider({container, slide , prevArrow , nextArrow  , currentCounter , totalCounter , wrapper , field}){
  //Slider
  
 // 1. Получить все элементы на странице
 // 2. Получить индекс слайдера
 // 3.Функция для показа определенного слайда и скрытие других
 // 4. 

 const slides = document.querySelectorAll(slide),
       slider = document.querySelector(container),
       prev = document.querySelector(prevArrow),
       next = document.querySelector(nextArrow),
       currentSlide = document.querySelector(currentCounter),
       totalSlide = document.querySelector(totalCounter),
       slidesField = document.querySelector(field),
       slidesWrapper = document.querySelector(wrapper),
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
}
export default slider;