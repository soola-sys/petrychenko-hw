/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};
const promoGenre = document.querySelector('.promo__genre');
const promoBlocks = document.querySelector('.promo__adv');
const promoItems = document.querySelector('.promo__interactive-list');
promoGenre.textContent = 'Драма'

document.querySelector('.promo__bg').style.backgroundImage = "url('../img/bg.jpg')";


const sortedFilms = movieDB.movies.sort();

promoBlocks.innerHTML = "";
 
promoItems.innerHTML = '';

sortedFilms.forEach((el , index) => {
    promoItems.innerHTML += addFilms(el , index)
});
function addFilms(el , index){
    return `
    <li class="promo__interactive-item">${index+1} ${el}
    <div class="delete"></div>
    </li>
    `
}
