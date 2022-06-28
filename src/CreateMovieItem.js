import { changeStatusBtnMovie, likeMovie } from "./likeMovie.js"
import { observer } from "./Observer.js"
function createMovieItem(movies, container, clean = true) {
    if (clean) {
        container.innerHTML = ''
    }
    movies.map((movie) => {
        const itemMovie = document.createElement('div')
        itemMovie.className = 'movie'
        itemMovie.setAttribute('data-id', movie.id)
        itemMovie.id = 'id-' + movie.id
        const btnLikeMovie = document.createElement('i')
        const hasMovie = JSON.parse(localStorage.getItem('likedMovies')) || {}
        if (hasMovie) {
            if (hasMovie[movie.id]) {
                btnLikeMovie.className = 'bx bxs-heart'
            } else {
                btnLikeMovie.className = 'bx bx-heart'
            }
        }
        btnLikeMovie.addEventListener('click', () => {
            btnLikeMovie.classList.toggle('bx-heart')
            btnLikeMovie.classList.toggle('bxs-heart')

            likeMovie(movie)
            changeStatusBtnMovie(itemMovie)
        })
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
        itemMovie.append(imgMovie, btnLikeMovie)
        container.appendChild(itemMovie)
        imgMovie.addEventListener('click', () => {
            window.location.hash = 'movie=' + movie.id
        })
    })
}

export { createMovieItem }