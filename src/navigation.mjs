import { createMovieItem } from "./CreateMovieItem.js"
import { openCategoryPage } from "./openCategoryPage.js"
import { OpenHome } from "./OpenHome.js"
import { openMoviePage } from "./OpenMoviePage.js"
import { openTrendsPage } from "./openTrendsPage.js"
import { searchMovie } from "./searchMovie.js"

window.onload = () => {
    window.location.hash = ''
    OpenHome()
}


window.addEventListener('hashchange', () => {
    document.documentElement.scrollTop = 0
    inputSearch.value = ''
    resultsContainer.innerHTML = ''
    page = 1
    if (window.location.hash.startsWith('#movie=')) {
        const [page, id] = window.location.hash.split('=')
        root.innerHTML = ''

        openMoviePage(id)
    } else if (window.location.hash.startsWith('#category=')) {
        const [page, name_id] = window.location.hash.split('=')
        const [name, id] = name_id.split('-')
        root.innerHTML = ''

        openCategoryPage(id, name)
        activeBtnToTop()
    } else if (window.location.hash === '#trends') {
        root.innerHTML = ''

        openTrendsPage()
        activeBtnToTop()
    }
    else if (window.location.hash === '') {
        if (!root.hasChildNodes()) {
            OpenHome()
        }
    }
})

function activeBtnToTop() {
    const btn = document.createElement('i')
    btn.className = 'bx bx-chevron-up'
    btn.addEventListener('click', () => {
        document.documentElement.scrollTop = 0
    })
    window.addEventListener('scroll', () => {
        if (window.scrollY >= document.documentElement.clientHeight) {
            btn.style.display = 'initial'
        } else {
            btn.style.display = 'none'
        }
    })
    root.appendChild(btn)
}

const inputSearch = document.getElementById('inputSearch')
inputSearch.addEventListener('input', (event) => {
    resultsContainer.innerHTML = ''
    const value = event.target.value
    value.length > 0 ? searchMovie(value) : resultsContainer.innerHTML = ''

})
