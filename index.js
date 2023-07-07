const formNode = document.getElementById('form');
const inputNode = document.getElementById('user-input');
const movieListNode = document.getElementById('movie-list-wrapper');

let movies = [];

if (localStorage.getItem('movies')) {
  movies = JSON.parse(localStorage.getItem('movies'));
}

movies.forEach( function (movie) {
  renderMovieItem(movie)
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
  saveToLcal()


  renderMovieItem(newMovieItem)
  
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
  if (event.target.dataset.action !== "viewed") {
    return;
  }
  const parentNode = event.target.closest('.movie-item');

  const id = Number(parentNode.id);

  const movie = movies.find(function (movie) {
    if (movie.id === id) {
      return true;
    }
  })

  movie.done = !movie.done
  saveToLcal()
  const movieTitle = parentNode.querySelector('.watched-movie-btn');

  parentNode.classList.toggle("watched-movie");
  movieTitle.classList.toggle("watched-movie-btn-checked");

  console.log(movies);

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

    parentNode.remove();
  }
  saveToLcal()
};

function clearInput() {
  inputNode.value = '';
  inputNode.focus()
};

function saveToLcal() {
  localStorage.setItem('movies', JSON.stringify(movies))
};

function renderMovieItem(movie) {
  const cssClassForLi = movie.done ? "movie-item watched-movie" : "movie-item";
  const cssClassForSpan = movie.done ? "watched-movie-btn watched-movie-btn-checked" : "watched-movie-btn";

  const movieItemHTML = `<li id="${movie.id}" class="${cssClassForLi}">
      <div data-action="viewed" class="checked-area">
      <span class="${cssClassForSpan}"></span>
      ${movie.text}
      </div>
      <button data-action="delete" class="delete-movie-btn">
      <img class="delete-movie-img" src="images/delete-movie-img.svg" alt="Крестик"/>
      </button>
</li>`;

  movieListNode.insertAdjacentHTML('beforeend', movieItemHTML);
}
