
const personalMovieDB = {
  count: 0, 
  movies: {},
  actors: {},
  genres : [],
  privat: false ,
  start() {
    this.count = +prompt('Сколько фильмов вы посмотрели ?','');
    while(this.count== '' || this.count == null || isNaN(this.count)){
      this.count = +prompt('Сколько фильмов вы посмотрели ?','');
    }
  },
  askFilms(){
    for (let i = 0 ; i < 2 ; i++) {
      const a = prompt('Один из последних просмотренных фильмов ?' ,''),
            b = +prompt('на сколько его оцените ?','');
    
      if (a != null && b != null && a != '' && b != '' && a.length < 50 ) {
        this.movies[a] = b;
        console.log('done');
      } 
      else{
        console.log('error');
        i--;
      }   
    }
  },
  rateViewer(){
    if (this.count < 10){
      console.log('Просмотрено довольно мало фильмов');
    }
    else if(this.count >= 10 && this.count < 30){
      console.log('Вы классический зритель');
    }
    else if(this.count > 30){
      console.log('Вы киноман');
    }
    else{
      console.log('Произошла ошибка');
    }
  },
  writeYourGenres(){
    for (let i = 1; i <= 3 ; i++) {
      const askGenre = prompt(`Ваш любимый жанр под номером ${i}`, '')
      if(askGenre != null && askGenre != ''){
        this.genres.push(askGenre)
        console.log('Харооуш!');
      }

      else{
        console.log('Придется по новой брат')
        i--
      }
    }
    this.genres.forEach((el , index) => {
        console.log(`Любимый жанр под номером ${index + 1} это ${el}`)
    })
  },
  
  toggleVisibleMyDb() {
    if(this.privat){
      personalMovieDB.privat = false;
    }
    else{
      personalMovieDB.privat = true;
    }
  },
  showMyDb(){
    if(!personalMovieDB.privat){
      console.log(personalMovieDB)
    }
  }
};


personalMovieDB.start()
personalMovieDB.askFilms()
personalMovieDB.rateViewer()
personalMovieDB.writeYourGenres()
// rateViewer()
