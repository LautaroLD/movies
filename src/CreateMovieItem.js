import { observer } from "./Observer.js"
function createMovieItem(movies, container, clean = true) {
    if (clean) {
        container.innerHTML = ''
    }
    movies.map((movie) => {
        const itemMovie = document.createElement('div')
        itemMovie.className = 'movie'
        const imgMovie = document.createElement('img')
        imgMovie.className = 'loadScreenMovies--item'
        imgMovie.setAttribute('data-img', URL_IMG(movie.poster_path))
        imgMovie.addEventListener('error', () => {
            imgMovie.alt = movie.title
        })
        observer.observe(imgMovie)
        imgMovie.addEventListener('load', () => {
            imgMovie.classList.remove('loadScreenMovies--item')
        })
        itemMovie.appendChild(imgMovie)
        container.appendChild(itemMovie)
        itemMovie.addEventListener('click', () => {
            window.location.hash = 'movie=' + movie.id

        })
    })
}

export { createMovieItem }