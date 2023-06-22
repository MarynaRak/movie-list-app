const inputNode = document.querySelector('.input');
const addBtnNode = document.querySelector('.add-movie-btn');
const movieListHTML = document.getElementById('movie-list-wrapper');

addBtnNode.addEventListener('click', getMovieItemFromUser);

function getMovieItemFromUser() {
    const movieTitleText = getMovieTitleFromUser();
    clearInput();

    let li = document.createElement("li");
    li.innerHTML = movieTitleText;

    li.classList.add("movie-item");
    movieListHTML.appendChild(li);

    let lable = document.createElement("label");
    lable.classList.add("flex");
    li.append(lable);

    let input = document.createElement("input");
    input.setAttribute('type', 'checkbox');
    input.classList.add("real-checkbox");
    lable.append(input);

    let span = document.createElement("span");
    span.classList.add("circle-checkbox");
    lable.append(span);



    let secondSpan = document.createElement("span");
    span.classList.add("delete-movie-btn");
    lable.append(secondSpan);

}

function getMovieTitleFromUser() {
    const movieTitle = inputNode.value.trim();

    if (movieTitle == 0) {
        alert('Введите название фильма');
        return;
    }
    
    return movieTitle;
}

function clearInput() {
    inputNode.value = '';
}
