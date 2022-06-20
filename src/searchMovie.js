import { observer } from "./Observer.js"

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
            resultImg.setAttribute('data-img', URL_IMG(movie.backdrop_path, 200))
        } else if (movie.poster_path) {
            resultImg.setAttribute('data-img', URL_IMG(movie.poster_path, 200))
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
export { searchMovie }