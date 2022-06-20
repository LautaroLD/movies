import { createMovieItem } from "./CreateMovieItem.js"
import { observer } from "./Observer.js"

function createDetailsMovie(data, container) {
    const detailsMovie = document.createElement('div')
    detailsMovie.className = 'detailsMovie'

    const detailsMovieDate = document.createElement('p')
    detailsMovieDate.className = 'detailsMovieDate'
    detailsMovieDate.textContent = data.release_date

    const detailsMovieOverview = document.createElement('p')
    detailsMovieOverview.className = 'detailsMovieOverview'
    detailsMovieOverview.textContent = data.overview

    detailsMovieCategories = document.createElement('div')
    detailsMovieCategories.className = 'detailsMovieCategories'
    const detailsMovieCategoriesTitle = document.createElement('h3')
    detailsMovieCategoriesTitle.textContent = 'Categoies'
    detailsMovieCategories.appendChild(detailsMovieCategoriesTitle)
    data.genres.map((genre) => {
        const detailsMovieCategoriesItem = document.createElement('p')
        detailsMovieCategoriesItem.textContent = genre.name

        detailsMovieCategoriesItem.addEventListener('click', () => {
            window.location.hash = `category=${genre.name}-${genre.id}`
        })
        detailsMovieCategories.appendChild(detailsMovieCategoriesItem)
    })
    detailsMovie.append(detailsMovieDate, detailsMovieOverview, detailsMovieCategories)
    createSimilarContainer(data.id, detailsMovie)
    container.appendChild(detailsMovie)
}

async function createSimilarContainer(id, container) {
    const similarTitle = document.createElement('h3')
    similarTitle.textContent = 'Similares'
    const similarItems = document.createElement('div')
    similarItems.className = 'similarItems'
    const resSimilar = await fetch(URL_MOVIE_SIMILAR(id))
    const dataSimilar = await resSimilar.json()
    const movies = dataSimilar.results
    createMovieItem(movies, similarItems)
    container.append(similarTitle, similarItems)
}

async function openMoviePage(id) {
    const res = await fetch(URL_MOVIE_ID(id))
    const data = await res.json()
    const movieRoot = document.createElement('section')
    movieRoot.className = 'movieRoot'

    const movieLeft = document.createElement('article')
    movieLeft.className = 'movieLeft'
    const movieImg = document.createElement('img')
    movieImg.alt = data.title
    observer.observe(movieImg)
    movieImg.className = 'loadScreenMovies--item'
    movieImg.setAttribute('data-img', URL_IMG(data.poster_path, 500))

    movieImg.addEventListener('load', () => {
        movieImg.classList.remove('loadScreenMovies--item',)
    })
    movieLeft.append(movieImg)

    const movieRight = document.createElement('article')
    movieRight.className = 'movieRight'
    const movieTitle = document.createElement('h3')
    movieTitle.textContent = data.title
    movieTitle.className = 'movieTitle'
    const movieDate = document.createElement('p')
    movieDate.className = 'movieDate'
    movieDate.textContent = data.release_date
    const movieOverview = document.createElement('p')
    movieOverview.className = 'movieOverview'
    movieOverview.textContent = data.overview
    const movieVotes = document.createElement('i')
    movieVotes.className = 'bx bxs-star'
    movieVotes.textContent = data.vote_average
    const moviePeople = document.createElement('i')
    moviePeople.className = 'bx bx-user'
    moviePeople.textContent = data.vote_count

    const movieCategoryList = document.createElement('article')
    movieCategoryList.className = 'movieCategoryList'
    data.genres.map((genre) => {
        const movieCategory = document.createElement('p')
        movieCategory.className = 'movieCategory'
        movieCategory.textContent = genre.name

        movieCategory.addEventListener('click', () => {
            window.location.hash = `category=${genre.name}-${genre.id}`
        })
        movieCategoryList.appendChild(movieCategory)
    })
    movieRight.append(movieTitle, movieDate, movieOverview, movieVotes, moviePeople)

    const movieBottom = document.createElement('article')
    movieBottom.className = 'movieBottom'
    createSimilarContainer(data.id, movieBottom)

    movieRoot.append(movieLeft, movieRight, movieCategoryList, movieBottom)
    root.appendChild(movieRoot)
}
export { openMoviePage }