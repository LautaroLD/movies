function createCategoryItem(categories, container) {
    categories.map((category) => {
        const itemCategory = document.createElement('p')
        itemCategory.className = 'category'
        itemCategory.textContent = category.name
        itemCategory.addEventListener('click', () => {
            window.location.hash = `category=${category.name}-${category.id}`
        })
        container.appendChild(itemCategory)
    })
}
export { createCategoryItem }