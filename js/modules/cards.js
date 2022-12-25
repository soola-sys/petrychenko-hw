import {getResource} from '../services/services';
function cards(){
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
      
  const container = document.querySelector(".menu__field .container");
  container.innerHTML = "";


  getResource('http://localhost:3000/menu')
  .then(data => {
    console.log(data);
    data.map((obj) => {
      container.append(new MenuCard(obj.img , obj.altImage , obj.title , obj.price , obj.descr).renderCard());
    });
  })
  .catch(() => console.error);
}
export default cards;