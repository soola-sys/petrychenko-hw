
  // Tabs
function tabs(tabsSelector, tabsContentSelector , tabsParentSelector , activeClass) {
    const tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsItems = document.querySelectorAll(tabsSelector),
    tabsParent = document.querySelector(tabsParentSelector);

    function hideTabs() {
        tabsContent.forEach((item) => {
          item.classList.add("hide");
          item.classList.remove("show", "fade");
        });
    
        tabsItems.forEach((item) => {
          item.classList.remove(activeClass);
        });
      }
      function showTabContent(i = 0) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabsItems[i].classList.add(activeClass);
      }
    
      hideTabs();
      showTabContent();
    
      tabsParent.addEventListener("click", (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
          tabsItems.forEach((item, idx) => {
            if (target == item) {
              hideTabs();
              showTabContent(idx);
            }
          });
        }
      });
}
export default tabs;