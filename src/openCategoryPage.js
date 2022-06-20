import { createMovieItem } from "./CreateMovieItem.js"

async function openCategoryPage(id, name) {
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
    const movies = data.results
    createMovieItem(movies, sectionCategoryDiv, false)
    sectionCategoryHead.append(sectionCategoryTitle)
    sectionCategory.append(sectionCategoryHead, sectionCategoryDiv)
    root.appendChild(sectionCategory)
}


export { openCategoryPage }