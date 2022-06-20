import { createMovieItem } from "./CreateMovieItem.js"

async function loadMoreMovies() {

    const { scrollHeight, scrollTop, clientHeight } = document.documentElement
    infiniteScroll = (scrollTop + clientHeight) >= (scrollHeight - 180)
    if (infiniteScroll) {
        page++
        const res = await fetch(`${URL_MOVIES}&page=${page}`)
        const data = await res.json()
        const container = document.getElementById('pageTrendsDiv')
        const movies = data.results
        createMovieItem(movies, container, false)
    }
}
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

    pageTrendsHead.append(pageTrendsTitle)
    pageTrends.append(pageTrendsHead, pageTrendsDiv, btn)
    root.appendChild(pageTrends)

}
export { openTrendsPage, loadMoreMovies }