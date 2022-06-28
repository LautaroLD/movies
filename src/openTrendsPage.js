import { createMovieItem } from "./CreateMovieItem.js"
import { loadMoreMovies } from "./LoadMoreMovies.js"


async function openTrendsPage() {

    const res = await fetch(`${URL_MOVIES}&page=${page}`)
    const data = await res.json()

    const pageTrends = document.createElement('section')
    pageTrends.className = 'pageTrends'

    const pageTrendsHead = document.createElement('div')
    pageTrendsHead.className = 'pageTrendsHead'
    const pageTrendsTitle = document.createElement('h3')
    pageTrendsTitle.className = 'pageTrendsTitle'
    pageTrendsTitle.textContent = 'Trends'

    const pageTrendsDiv = document.createElement('div')
    pageTrendsDiv.className = 'pageTrendsDiv'
    pageTrendsDiv.id = 'pageTrendsDiv'

    const movies = data.results
    createMovieItem(movies, pageTrendsDiv)
    const moreBtn = document.createElement('a')
    moreBtn.textContent = 'More'
    moreBtn.className = 'moreBtn'
    pageTrendsHead.append(pageTrendsTitle)
    pageTrends.append(pageTrendsHead, pageTrendsDiv)
    root.appendChild(pageTrends)

    ejectFunction = loadMoreMovies(pageTrendsDiv, `${URL_MOVIES}&page=`)
    window.addEventListener('scroll', ejectFunction, false)

}
export { openTrendsPage }