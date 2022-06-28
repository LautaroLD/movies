import { createMovieItem } from "./CreateMovieItem.js"

function loadMoreMovies(container, url) {
    console.log(`${url}${page}`);
    return async function () {
        const { scrollHeight, scrollTop, clientHeight } = document.documentElement
        infiniteScroll = (scrollTop + clientHeight) >= (scrollHeight - 180)
        if (infiniteScroll) {
            page++
            const res = await fetch(`${url}${page}`)
            // const res = await fetch(`${url}&page=${page}`)
            const data = await res.json()
            const movies = data.results
            createMovieItem(movies, container, false)
        }
    }
}
export { loadMoreMovies }