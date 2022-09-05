document.addEventListener('DOMContentLoaded' , () => {
    const tabsContent = document.querySelectorAll('.tabcontent'),
          tabsItems = document.querySelectorAll('.tabheader__item'),
          tabsParent = document.querySelector('.tabheader__items');
    
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
})