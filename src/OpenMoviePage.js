import { createMovieItem } from "./CreateMovieItem.js"
import { observer } from "./Observer.js"

function createDetailsMovie(data, container, before) {
   
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
    movieRight.append(movieTitle, movieDate, movieOverview, movieVotes, moviePeople)
    container.insertBefore(movieRight, before)
}

async function createSimilarContainer(id, container) {
    const similarTitle = document.createElement('h3')
    similarTitle.textContent = 'Similar'
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

    const movieBottom = document.createElement('article')
    movieBottom.className = 'movieBottom'
    createSimilarContainer(data.id, movieBottom)

    movieRoot.append(movieLeft, movieCategoryList, movieBottom)
    createDetailsMovie(data,movieRoot, movieCategoryList)
    root.appendChild(movieRoot)

}
export { openMoviePage }