import { createCategoryItem } from "./CreateCategoryItem.js"
import { createMovieItem } from "./CreateMovieItem.js"
import { editFavoriteList } from "./CreateSectionFavorites.js"

async function OpenHome() {
    const sectionMovies = document.createElement('section')
    sectionMovies.className = 'moviesSection'
    const sectionMoviesHead = document.createElement('div')
    sectionMoviesHead.className = 'sectionMoviesHead'
    const sectionMoviesTitle = document.createElement('h3')
    sectionMoviesTitle.textContent = 'Trends'
    const sectionMoviesMore = document.createElement('a')
    sectionMoviesMore.innerHTML = 'More'
    sectionMoviesMore.className = 'moreBtn'
    sectionMoviesMore.addEventListener('click', () => {
        window.location.hash = 'trends'
    })
    sectionMoviesHead.append(sectionMoviesTitle, sectionMoviesMore)
    const sectionMoviesCarousel = document.createElement('div')
    sectionMoviesCarousel.className = 'movies'
    sectionMoviesCarousel.id = 'movies'
    const res = await fetch(URL_MOVIES)
    const data = await res.json()
    const movies = data.results
    createMovieItem(movies, sectionMoviesCarousel)
    sectionMovies.append(sectionMoviesHead, sectionMoviesCarousel)
    const sectionFavorites = document.createElement('section')
    sectionFavorites.className = 'sectionFavorites'
    sectionFavorites.id = 'sectionFavorites'
    const sectionFavoritesHead = document.createElement('div')
    sectionFavoritesHead.className = 'sectionFavoritesHead'
    const sectionFavoritesTitle = document.createElement('h3')
    sectionFavoritesTitle.textContent = 'Favorites'
    const sectionFavoritesDiv = document.createElement('div')
    sectionFavoritesDiv.className = 'sectionFavoritesDiv'
    sectionFavoritesDiv.id = 'sectionFavoritesDiv'
    sectionFavoritesHead.appendChild(sectionFavoritesTitle)
    sectionFavorites.append(sectionFavoritesHead, sectionFavoritesDiv)
    const sectionCategories = document.createElement('section')
    sectionCategories.className = 'categoriesSection'
    sectionCategories.id = 'categoriesSection'
    const sectionCategoriesTitle = document.createElement('h3')
    sectionCategoriesTitle.textContent = 'Categories'
    const sectionCategoriesDiv = document.createElement('div')
    sectionCategoriesDiv.className = 'categories'
    sectionCategoriesDiv.id = 'categories'
    const resCategories = await fetch(URL_GENRE_MOVIES)
    const dataCategories = await resCategories.json()
    const categories = dataCategories.genres
    createCategoryItem(categories, sectionCategoriesDiv)
    sectionCategories.append(sectionCategoriesTitle, sectionCategoriesDiv)
    root.append(sectionMovies, sectionFavorites, sectionCategories)
    let favorites
    if (localStorage.getItem('likedMovies')) {
        favorites = Object.entries(JSON.parse(localStorage.getItem('likedMovies'))) || {}
    } else {
        favorites = {}
    }
    if (!favorites.length) {
        sectionFavoritesDiv.classList.add('favoritesEmpty')
        sectionFavoritesDiv.innerHTML = "<i class='bx bx-heart'></i><p>You don't have favorites yet</p>"
    } else {
        editFavoriteList()
    }
}

export { OpenHome }