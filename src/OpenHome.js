import { createCategoryItem } from "./CreateCategoryItem.js"
import { createMovieItem } from "./CreateMovieItem.js"

async function OpenHome() {
    const sectionMovies = document.createElement('section')
    sectionMovies.className = 'moviesSection'
    const sectionMoviesHead = document.createElement('div')
    sectionMoviesHead.className = 'sectionMoviesHead'
    const sectionMoviesTitle = document.createElement('h3')
    sectionMoviesTitle.textContent = 'Movies'
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

    const sectionCategories = document.createElement('section')
    sectionCategories.className = 'categoriesSection'
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

    root.append(sectionMovies, sectionCategories)
}

export { OpenHome }