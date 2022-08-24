let numberOfFilms;


function start(){
  numberOfFilms = +prompt('Сколько фильмов вы посмотрели ?','');
  while(numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)){
    numberOfFilms = +prompt('Сколько фильмов вы посмотрели ?','');
  }
}
// start()
const personalMovieDB = {
  count: numberOfFilms , 
  movies: {},
  actors: {},
  genres : [],
  privat: false
};

function askFilms(){
  for (let i = 0 ; i < 2 ; i++) {
    const a = prompt('Один из последних просмотренных фильмов ?' ,''),
          b = +prompt('на сколько его оцените ?','');
  
    if (a != null && b != null && a != '' && b != '' && a.length < 50 ) {
      personalMovieDB.movies[a] = b;
      console.log('done');
    } 
    else{
      console.log('error');
      i--;
    }   
  }
}
// askFilms()

function rateViewer(){
  if ( personalMovieDB.count < 10){
    console.log('Просмотрено довольно мало фильмов');
  }
  else if(personalMovieDB.count >= 10 && personalMovieDB.count < 30){
    console.log('Вы классический зритель');
  }
  else if(personalMovieDB.count > 30){
    console.log('Вы киноман');
  }
  else{
    console.log('Произошла ошибка');
  }
}

function writeYourGenres(){
  for (let i = 1; i <= 3 ; i++) {
   personalMovieDB.genres.push(prompt(`Ваш любимый жанр под номером ${i}`, ''))
  }
}
writeYourGenres()
function showMyDb(){
  if(!personalMovieDB.privat){
    console.log(personalMovieDB)
  }
}
showMyDb()
// rateViewer()


