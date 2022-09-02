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
        "Скотт Пилигрим против...",
    ]
};
const promoGenre = document.querySelector('.promo__genre');
const promoBlocks = document.querySelectorAll('.promo__adv img');
const promoItems = document.querySelector('.promo__interactive-list');

const btnConfirm = document.querySelector('.btn__confirm');
const input = document.querySelector('.adding__input');
const form = document.querySelector('form.add')
const checkbox = document.querySelector('[type="checkbox"]');


form.addEventListener('submit' , (event) => {
    event.preventDefault();

    let filmName = input.value;

    if(filmName){
        if(filmName.length > 21){
            filmName = filmName.substr(0 , 21) + '...';
        }
        if(checkbox.checked){
            console.log('Добавляем новый фильм!');
        }
        movieDB.movies.push(filmName);
        sortArr(movieDB.movies)
    
        createMovieList(movieDB.movies , promoItems)
    }
    event.target.reset()
})

promoGenre.textContent = 'Драма'

document.querySelector('.promo__bg').style.backgroundImage = "url('./img/bg.jpg')";

const deleteAdverb = (arr) => {
   arr.forEach((el) => {
        el.remove()
    })
}
const sortArr = (arr) => {
    arr.sort();
}


deleteAdverb(promoBlocks)


function createMovieList(films , parent){
     
    parent.innerHTML = '';

    sortArr(movieDB.movies);
    films.forEach((el , index) => {
        parent.innerHTML += `
        <li class="promo__interactive-item">${index+1} ${el}
        <div class="delete"></div>
        </li>
        `
    });

    document.querySelectorAll('.delete').forEach((btn , index) => {
        btn.addEventListener('click' , () => {
    
            btn.parentElement.remove();
            
            movieDB.movies.splice(index , 1);
    
            createMovieList(films , parent);
        })
    })
}
createMovieList(movieDB.movies , promoItems)
