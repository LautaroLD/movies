import { configChange, observerChange } from "./Observer.js"
import { createMovieItem } from "./CreateMovieItem.js"

function editFavoriteList() {
    const container = document.getElementById('sectionFavoritesDiv')
    if (container) {
        observerChange.observe(container, configChange)
        const favorites = Object.values(JSON.parse(localStorage.getItem('likedMovies')))
        createMovieItem(favorites, container)
    }

}
export { editFavoriteList }