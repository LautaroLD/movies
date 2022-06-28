function returnHome() {
    window.location.hash = ''
    root.innerHTML = ''

}
function returnBack() {
    window.history.back()
    root.innerHTML = ''

}

btnReturnBack.addEventListener('click', returnBack)
btnReturnHome.addEventListener('click', returnHome)
window.addEventListener('hashchange', () => {

    if (window.location.hash === '') {
        btnReturnBack.style.display = 'none'
        btnReturnHome.style.display = 'none'
    } else {
        btnReturnBack.style.display = 'initial'
        btnReturnHome.style.display = 'initial'
    }
})
