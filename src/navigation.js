window.onload = () => {
    window.location.hash = ''
    openHome()
}
window.addEventListener('hashchange', () => {
    if (window.location.hash.startsWith('#movie=')) {
        const [page, id] = window.location.hash.split('=')
        root.innerHTML = ''
        document.documentElement.scrollTop = 0

        createMoviePage(id)
    } else if (window.location.hash.startsWith('#category=')) {
        const [page, name_id] = window.location.hash.split('=')
        const [name, id] = name_id.split('-')
        footer.style.display = 'flex'
        root.innerHTML = ''
        createCategoryPage(id, name)
        document.documentElement.scrollTop = 0

    } else {
        footer.style.display = 'flex'
        root.innerHTML = ''
        openHome()
        document.documentElement.scrollTop = 0

    }
})

function openHome() {
    const sectionMovies = document.createElement('section')
    sectionMovies.className = 'moviesSection'
    const sectionMoviesTitle = document.createElement('h3')
    sectionMoviesTitle.textContent = 'Movies'
    const sectionMoviesCarousel = document.createElement('div')
    sectionMoviesCarousel.className = 'movies'
    sectionMoviesCarousel.id = 'movies'
    for (let i = 0; i < 4; i++) {
        const loadeItem = document.createElement('div')
        loadeItem.className = 'loadScreenMovies--item'
        sectionMoviesCarousel.appendChild(loadeItem)
    }
    sectionMovies.append(sectionMoviesTitle, sectionMoviesCarousel)

    const sectionCategories = document.createElement('section')
    sectionCategories.className = 'categoriesSection'
    const sectionCategoriesTitle = document.createElement('h3')
    sectionCategoriesTitle.textContent = 'Categories'
    const sectionCategoriesDiv = document.createElement('div')
    sectionCategoriesDiv.className = 'categories'
    sectionCategoriesDiv.id = 'categories'
    sectionCategories.append(sectionCategoriesTitle, sectionCategoriesDiv)

    root.append(sectionMovies, sectionCategories)
    createMovieItem()
    createCategoryItem()
}

async function createMovieItem() {
    const res = await fetch(URL_MOVIES)
    const data = await res.json()
    movies.innerHTML = ''
    data.results.map((movie) => {
        const itemMovie = document.createElement('div')
        itemMovie.className = 'movie'
        const imgMovie = document.createElement('img')
        imgMovie.className = 'loadScreenMovies--item'
        imgMovie.setAttribute('data-img', URL_IMG(movie.poster_path))
        imgMovie.alt = movie.title
        observer.observe(imgMovie)
        imgMovie.addEventListener('load', () => {
            imgMovie.classList.remove('loadScreenMovies--item')
        })
        itemMovie.appendChild(imgMovie)
        movies.appendChild(itemMovie)
        itemMovie.addEventListener('click', () => {
            window.location.hash = 'movie=' + movie.id

        })
    })
}

async function createCategoryItem() {
    const res = await fetch(URL_GENRE_MOVIES)
    const data = await res.json()
    categories.innerHTML = ''
    data.genres.map((category) => {
        const itemCategory = document.createElement('p')
        itemCategory.className = 'category'
        itemCategory.textContent = category.name
        itemCategory.addEventListener('click', () => {
            window.location.hash = `category=${category.name}-${category.id}`
        })
        categories.appendChild(itemCategory)
    })
}

async function createMoviePage(id) {
    const res = await fetch(URL_MOVIE_ID(id))
    const data = await res.json()
    const movieRootDesktop = document.createElement('section')
    movieRootDesktop.className = 'movieRootDesktop'

    const movieLeftDesktop = document.createElement('article')
    movieLeftDesktop.className = 'movieLeftDesktop'
    const movieImgDesktop = document.createElement('img')
    movieImgDesktop.alt = data.title
    movieImgDesktop.className = 'movieImgDesktop'
    movieImgDesktop.src = URL_IMG(data.poster_path)
    movieLeftDesktop.append(movieImgDesktop)

    const movieRightDesktop = document.createElement('article')
    movieRightDesktop.className = 'movieRightDesktop'
    const movieTitleDesktop = document.createElement('h3')
    movieTitleDesktop.textContent = data.title
    movieTitleDesktop.className = 'movieTitleDesktop'
    const movieDateDesktop = document.createElement('p')
    movieDateDesktop.className = 'movieDateDesktop'
    movieDateDesktop.textContent = data.release_date
    const movieOverviewDesktop = document.createElement('p')
    movieOverviewDesktop.className = 'movieOverviewDesktop'
    movieOverviewDesktop.textContent = data.overview
    const movieVotesDesktop = document.createElement('i')
    movieVotesDesktop.className = 'bx bxs-star'
    movieVotesDesktop.textContent = data.vote_average
    const moviePeopleDesktop = document.createElement('i')
    moviePeopleDesktop.className = 'bx bx-user'
    moviePeopleDesktop.textContent = data.vote_count

    const movieCategoryList = document.createElement('article')
    movieCategoryList.className = 'movieCategoryList'
    data.genres.map((genre) => {
        movieCategory = document.createElement('p')
        movieCategory.className = 'movieCategory'
        movieCategory.textContent = genre.name

        movieCategory.addEventListener('click', () => {
            window.location.hash = `category=${genre.name}-${genre.id}`
        })
        movieCategoryList.appendChild(movieCategory)
    })
    movieRightDesktop.append(movieTitleDesktop, movieDateDesktop, movieOverviewDesktop, movieVotesDesktop, moviePeopleDesktop)

    const movieBottomDesktop = document.createElement('article')
    movieBottomDesktop.className = 'movieBottomDesktop'
    createSimilarContainer(data.id, movieBottomDesktop)

    movieRootDesktop.append(movieLeftDesktop, movieRightDesktop, movieCategoryList, movieBottomDesktop)
    root.appendChild(movieRootDesktop)
}

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
        detailsMovieCategoriesItem = document.createElement('p')
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
    similarTitle = document.createElement('h3')
    similarTitle.textContent = 'Similares'
    similarItems = document.createElement('div')
    similarItems.className = 'similarItems'
    const resSimilar = await fetch(URL_MOVIE_SIMILAR(id))
    const dataSimilar = await resSimilar.json()
    dataSimilar.results.map((movie) => {
        const itemMovie = document.createElement('div')
        itemMovie.className = 'movieSimiliar'
        const imgMovie = document.createElement('img')
        imgMovie.className = 'loadScreenMovies--item'
        imgMovie.setAttribute('data-img', URL_IMG(movie.poster_path))
        imgMovie.alt = movie.title
        observer.observe(imgMovie)
        imgMovie.addEventListener('load', () => {
            imgMovie.classList.remove('loadScreenMovies--item',)
        })
        itemMovie.appendChild(imgMovie)
        similarItems.appendChild(itemMovie)
        itemMovie.addEventListener('click', () => {
            window.location.hash = 'movie=' + movie.id
        })
    })
    container.append(similarTitle, similarItems)
}

async function createCategoryPage(id, name) {
    const res = await fetch(URL_GENRE_SEARCH(id))
    const data = await res.json()
    const sectionCategory = document.createElement('section')
    sectionCategory.className = 'sectionCategory'

    const sectionCategoryHead = document.createElement('div')
    sectionCategoryHead.className = 'sectionCategoryHead'
    const sectionCategoryTitle = document.createElement('h3')
    sectionCategoryTitle.className = 'sectionCategoryTitle'
    sectionCategoryTitle.textContent = name.replace('%20', ' ')

    const sectionCategoryDiv = document.createElement('div')
    sectionCategoryDiv.className = 'sectionCategoryDiv'
    data.results.map((movie) => {
        const itemMovie = document.createElement('div')
        itemMovie.className = 'movie'
        const imgMovie = document.createElement('img')
        imgMovie.setAttribute('data-img', URL_IMG(movie.poster_path))
        observer.observe(imgMovie)
        itemMovie.appendChild(imgMovie)
        sectionCategoryDiv.appendChild(itemMovie)
        itemMovie.addEventListener('click', () => {
            window.location.hash = 'movie=' + movie.id
        })
    })
    sectionCategoryHead.append(sectionCategoryTitle)
    sectionCategory.append(sectionCategoryHead, sectionCategoryDiv)
    root.appendChild(sectionCategory)
}

const inputSearch = document.getElementById('inputSearch')
inputSearch.addEventListener('input', (event) => {
    const value = event.target.value
    resultsContainer.innerHTML = ''
    if (value.length > 0) {
        searchMovie(value)
    } else {
        resultsContainer.innerHTML = ''
    }
})
let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const src = entry.target.getAttribute('data-img')
            entry.target.setAttribute('src', src)
        }

    })

});
async function searchMovie(value) {
    const resultsContainer = document.getElementById('resultsContainer')
    const res = await fetch(URL_SEARCH(value))
    const data = await res.json()
    data.results.map((movie) => {
        const resultsItem = document.createElement('div')
        resultsItem.className = 'resultsItem'
        const resultImg = document.createElement('img')
        resultImg.alt = movie.title
        if (movie.backdrop_path) {
            resultImg.setAttribute('data-img', URL_IMG(movie.backdrop_path))
        } else if (movie.poster_path) {
            resultImg.setAttribute('data-img', URL_IMG(movie.poster_path))
        } else {
            resultImg.setAttribute('data-img', './src/error.png')
        }
        observer.observe(resultImg)
        const resultTitle = document.createElement('p')
        resultTitle.textContent = movie.name || movie.title
        resultsItem.append(resultImg, resultTitle)
        resultsContainer.appendChild(resultsItem)
        resultsItem.addEventListener('click', () => {
            window.location.hash = `movie=${movie.id}`
            resultsContainer.innerHTML = ''
            inputSearch.innerText = ''
        })
    })
    console.log(data);
}
function returnHome() {
    window.location.hash = ''
}
function returnBack() {
    window.history.back()
}