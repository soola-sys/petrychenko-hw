function closeModal (modalSelector)  {
  const myModal = document.querySelector(modalSelector);
  myModal.classList.add("hide");
  myModal.classList.remove("show");
  document.body.style.overflow = "";
};

function openModal(modalSelector , modalTimerId) {
  const myModal = document.querySelector(modalSelector);
  myModal.classList.add("show");
  myModal.classList.remove("hide");
  document.body.style.overflow = "hidden";
  
  console.log(modalTimerId)
  if(modalTimerId){
    clearInterval(modalTimerId);
  }
}

function modal(triggerSelector , modalSelector , modalTimerId){

    const myModal = document.querySelector(modalSelector);
    const modalTrigger = document.querySelectorAll(triggerSelector);

    modalTrigger.forEach((item) => {
      item.addEventListener("click",() => openModal(modalSelector , modalTimerId));
    });
  
    myModal.addEventListener("click", (e) => {
      if (e.target === myModal || e.target.getAttribute('data-close') == '') {
        closeModal(modalSelector);
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        closeModal(modalSelector);
      }
    });
  
  
  
    function showModalByScroll() {
      if (
        window.scrollY + window.innerHeight + 200 >
        document.body.scrollHeight
      ) {
        openModal(modalSelector , modalTimerId);
        window.removeEventListener("scroll", showModalByScroll);
      }
    }
    window.addEventListener("scroll", showModalByScroll);
  
}
export default modal;
export {openModal}
export {closeModal}