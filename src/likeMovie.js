import { editFavoriteList } from "./CreateSectionFavorites.js"

function likedMoviesList() {
    const item = JSON.parse(localStorage.getItem('likedMovies'))
    let movies
    if (item) {
        movies = item
    } else {
        movies = {}
    }
    return movies
}
function changeStatusBtnMovie(movie) {
    const btn = document.querySelector(`#${movie.id} i`)
    const splitId = movie.id.split('-')

    const item = JSON.parse(localStorage.getItem('likedMovies'))
    if (btn != null) {
        if (item[splitId[1]]) {
        } else {
            btn.classList.replace('bxs-heart', 'bx-heart')
        }
    }
}
function likeMovie(movie) {
    const likedMovies = likedMoviesList()
    if (likedMovies[movie.id]) {
        likedMovies[movie.id] = undefined
    } else {
        likedMovies[movie.id] = movie
    }
    localStorage.setItem('likedMovies', JSON.stringify(likedMovies))
    editFavoriteList()
}
export { likeMovie, changeStatusBtnMovie }