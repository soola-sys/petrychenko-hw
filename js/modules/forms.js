import {openModal , closeModal} from './modal';
import {postData} from '../services/services';
function forms( formSelector , modalSelector , modalTimerId){
     
    const forms = document.querySelectorAll(formSelector);
    forms.forEach((item) => {
      bindPostData(item);
    });
  
   
  
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
      openModal(modalSelector , modalTimerId);
      const thankModal = document.createElement("div");
      thankModal.classList.add("modal__dialog");
  
      thankModal.innerHTML = `
          <div class="modal__content">
              <div data-close class="modal__close">&times;</div>
              <div class="modal__title">${message}</div>
          </div>
          `;
  
     document.querySelector(modalSelector).append(thankModal);
  
      setTimeout(() => {
          thankModal.remove();
          prevModal.classList.add('show');
          prevModal.classList.remove('hide');
          closeModal(modalSelector)
      }, 3000)
    }
}
export default forms;