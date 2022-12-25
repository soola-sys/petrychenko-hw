function calc() {
// Calculator
const result = document.querySelector('.calculating__result span');
let gender , height , weight , age , ratio;

if(localStorage.getItem('gender')){
  gender = localStorage.getItem('gender');
}
else {
  gender = 'female';
  localStorage.setItem('gender',gender);
}

if(localStorage.getItem('ratio')){
  ratio = localStorage.getItem('ratio');
}
else {
  ratio = 1.375;
  localStorage.setItem('ratio',ratio);
}

function initLocalSettings(selector , activeClass){
  const elements = document.querySelectorAll(selector);

  elements.forEach((elem) => {
    elem.classList.remove(activeClass);
    if(elem.getAttribute('id') === localStorage.getItem('gender')){
         elem.classList.add(activeClass);
    }
    if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
        elem.classList.add(activeClass)
    }
  })
}

initLocalSettings('#gender div' , 'calculating__choose-item_active')
initLocalSettings('.calculating__choose_big div' , 'calculating__choose-item_active')

function calcTotal () {
  if(!gender || !height || !weight || !age || !ratio){
    result.textContent = '___';
    return;
  }
  if(gender == "female"){
    result.textContent = Math.round((447 + (9.2 * weight) + (3.1 * height)  - (4.3 * age)) * ratio);
  } 
  else {
    result.textContent = Math.round((450 + (9.2 * weight) + (3.1 * height)  - (4.3 * age)) * ratio);
  }
}
 calcTotal()

  function getStaticInformation  (selector , activeClass)  {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.addEventListener('click' , (e) => {
        if(e.target.getAttribute('data-ratio')){
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio' , ratio);
        }else{
          gender = e.target.getAttribute('id');
          localStorage.setItem('gender' , gender);
        }
        elements.forEach((el) => {
          el.classList.remove(activeClass);
        })
        e.target.classList.add(activeClass);

        calcTotal()
      })
    })
  }
  function getDynamicInformation(selector){
      const input = document.querySelector(selector);
     input.addEventListener('input', (e) => {

          if(input.value.match(/\D/)){
            input.style.border = '1px solid red';
          } else{
            input.style.border = 'none';
          }

          switch(e.target.getAttribute('id')){
            case 'height':
              height = +input.value;
              break;
            case 'weight':
              weight = +input.value;
              break;
            case 'age':
              age = +input.value;
              break;
          }
          calcTotal() 
      });
  }

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');

  getStaticInformation('#gender div' , 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div' , 'calculating__choose-item_active');
}
export default calc;