const URL_BASE = 'https://api.themoviedb.org/3/'
const URL_KEY = '?api_key=6d731d8c7bf6e2a25b20395b6012169c'
const URL_MOVIES = `${URL_BASE}movie/popular${URL_KEY}`
const URL_GENRE_MOVIES = `${URL_BASE}genre/movie/list${URL_KEY}`
const URL_MOVIE_ID = (id) => `${URL_BASE}movie/${id}${URL_KEY}`
const URL_MOVIE_SIMILAR = (id) => `${URL_BASE}movie/${id}/similar${URL_KEY}&page=1`
const URL_GENRE_SEARCH = (genre) => `${URL_BASE}discover/movie${URL_KEY}&with_genres=${genre}`
const URL_IMG = (hash, width = 300) => `https://image.tmdb.org/t/p/w${width}${hash}`
const URL_SEARCH = (input) => `${URL_BASE}search/movie${URL_KEY}&query=${input}`
const root = document.getElementById('root')
const btnReturnBack = document.getElementById('btnReturnBack')
const btnReturnHome = document.getElementById('btnReturnHome')

let page = 1
let infiniteScroll
