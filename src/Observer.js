let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const src = entry.target.getAttribute('data-img')
            entry.target.setAttribute('src', src)
            entry.target.addEventListener('error', () => {
                entry.target.src = './src/error.png'
            })
        }
    })
});
let configChange = { childList: true };
let observerChange = new MutationObserver(function (mutations) {
    mutations.forEach(function (object) {
        if (object.addedNodes.length) {
            object.addedNodes.forEach((movieAdded) => {
                const moviesList = document.querySelectorAll('.movie')
                moviesList.forEach((movie) => {
                    if (movieAdded.id === movie.id) {
                        movie.setAttribute('data-favorite', true)
                    }
                })
            })
            if (object.addedNodes[object.addedNodes.length - 1].nodeName === 'DIV') {
                object.target.classList.remove('favoritesEmpty')
            }
        }
        if (object.removedNodes.length) {
            object.removedNodes.forEach((movieRemoved) => {
                const moviesList = document.querySelectorAll('.movie')
                moviesList.forEach((movie) => {
                    if (movieRemoved.id === movie.id) {
                        movie.setAttribute('data-favorite', false)
                    }
                })
            })
            if (!object.target.children.length) {
                object.target.classList.add('favoritesEmpty')
                object.target.innerHTML = "<i class='bx bx-heart'></i><p>You don't have favorites yet</p>"
            }
        }
    });
});

export { observer, observerChange, configChange }