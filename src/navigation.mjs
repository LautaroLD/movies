import { createMovieItem } from "./CreateMovieItem.js"
import { openCategoryPage } from "./openCategoryPage.js"
import { OpenHome } from "./OpenHome.js"
import { openMoviePage } from "./OpenMoviePage.js"
import { loadMoreMovies, openTrendsPage } from "./openTrendsPage.js"
import { searchMovie } from "./searchMovie.js"

window.onload = () => {
    window.location.hash = ''
    OpenHome()
}
window.addEventListener('hashchange', () => {
    root.innerHTML = ''
    document.documentElement.scrollTop = 0

    window.removeEventListener('scroll', loadMoreMovies)
    page = 1

    if (window.location.hash.startsWith('#movie=')) {
        const [page, id] = window.location.hash.split('=')
        openMoviePage(id)
    } else if (window.location.hash.startsWith('#category=')) {
        const [page, name_id] = window.location.hash.split('=')
        const [name, id] = name_id.split('-')
        openCategoryPage(id, name)
    } else if (window.location.hash === '#trends') {

        window.addEventListener('scroll', loadMoreMovies, false)
        openTrendsPage()
    }
    else {
        OpenHome()
    }


})

const inputSearch = document.getElementById('inputSearch')
inputSearch.addEventListener('input', (event) => {
    resultsContainer.innerHTML = ''
    const value = event.target.value
    value.length > 0 ? searchMovie(value) : resultsContainer.innerHTML = ''

})

