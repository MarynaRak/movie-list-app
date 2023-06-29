const formNode = document.getElementById('form');
const inputNode = document.getElementById('user-input');
const movieListNode = document.getElementById('movie-list-wrapper');

let movies = [];

if (localStorage.getItem('movies')) {
  movies = JSON.parse(localStorage.getItem('movies'));
}

movies.forEach( function (movie) {
  const cssClass = movie.done ? "movie-item watched-movie" : "movie-item";

  const movieItemHTML = `<li id="${movie.id}" class="${cssClass}">
    <label data-action="watched" class="flex-input">
        <input type="checkbox" class="real-checkbox">
        <span data-action="viewed" class="circle-checkbox"></span>
        ${movie.text}
        <button data-action="delete" class="delete-movie-btn"><img class="delete-movie-img" src="images/delete-movie-img.svg" alt="Крестик"/></button>
    </label> 
  </li>`;

  movieListNode.insertAdjacentHTML('beforeend', movieItemHTML);
});

formNode.addEventListener('submit', addMovieItem);

movieListNode.addEventListener("click", deleteMovieItem);

movieListNode.addEventListener("click", watchedMovieItem);

function addMovieItem(event) {

  event.preventDefault();

  const movieTitle = getMovieTitleFromUser();
  if (!movieTitle) {
    return;
  }

  const newMovieItem = {
    id: Date.now(),
    text: movieTitle,
    done: false,
  };

  movies.push(newMovieItem);

  saveToLocal();

  const cssClass = newMovieItem.done ? "movie-item watched-movie" : "movie-item";

  const movieItemHTML = `<li id="${newMovieItem.id}" class="${cssClass}">
    <label data-action="watched" class="flex-input">
        <input type="checkbox" class="real-checkbox">
        <span data-action="viewed" class="circle-checkbox"></span>
        ${newMovieItem.text}
        <button data-action="delete" class="delete-movie-btn"><img class="delete-movie-img" src="images/delete-movie-img.svg" alt="Крестик"/></button>
    </label> 
  </li>`;

  movieListNode.insertAdjacentHTML('beforeend', movieItemHTML);

  clearInput();


};

function getMovieTitleFromUser() {
  const movieTitleFromUser = inputNode.value.trim();

  if (movieTitleFromUser == 0) {
    alert('Введите название фильма');
    return;
  }

  return movieTitleFromUser;
};

function watchedMovieItem(event) {


  const parentNode = event.target.closest('li');

  const id = Number(parentNode.id);

  const movie = movies.find(function (movie) {
    if (movie.id === id)
      return true;
  })

  movie.done = !movie.done;
  saveToLocal();

  if ((event.target.dataset.action === "watched") || (event.target.dataset.action === "viewed")) {
    event.target.closest('li').classList.toggle("watched-movie");
  }


};

function deleteMovieItem(event) {
  if (event.target.dataset.action === "delete") {
    const parentNode = event.target.closest('li');

    const id = Number(parentNode.id);

    movies = movies.filter(function (movie) {
      if (movie.id !== id) {
        return true;
      }
    })

    saveToLocal();

    parentNode.remove();
  }
};

function clearInput() {
  inputNode.value = '';
  inputNode.focus()
};

function saveToLocal() {
  localStorage.setItem('movies', JSON.stringify(movies))
};

console.log(movies)
