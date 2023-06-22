const inputNode = document.querySelector('.input');
const addBtnNode = document.querySelector('.add-movie-btn');
const movieListNode = document.getElementById('movie-list-wrapper');

addBtnNode.addEventListener('click', getMovieItem);

function getMovieItem() {
    renderMovieList();
    clearInput();
    saveData()
}

movieListNode.addEventListener("click", function(e) {
  if (e.target.dataset.action === "watched"){
    e.target.classList.toggle("watched-movie");
    saveData()
  } else  if (e.target.tagName === "BUTTON") {
    const parentNode = e.target.closest('li');
    parentNode.remove();
    saveData()
  } 
})

function clearInput() {
    inputNode.value = '';
}

function renderMovieList() {

    const movieItemTitle = getMovieTitleFromUser();
    if (!movieItemTitle) {
        return;
    }

    const movieItem = `<li data-action="watched" class="movie-item">
    <label>
      <input type="checkbox" class="real-checkbox">
      <span class="circle-checkbox"></span>
      ${movieItemTitle}
      <button class="delete-movie-btn"></button>
    </label> 
  </li>`;

    movieListNode.insertAdjacentHTML('beforeend', movieItem);
}

function getMovieTitleFromUser() {
    const movieTitle = inputNode.value.trim();

    if (movieTitle == 0) {
        alert('Введите название фильма');
        return;
    }

    return movieTitle;
}

function saveData() {
    localStorage.setItem("data", movieListNode.innerHTML);
}

function showMovieList() {
    movieListNode.innerHTML = localStorage.getItem('data');
}
showMovieList()