function returnHome() {
    window.location.hash = ''
}
function returnBack() {
    window.history.back()
}

btnReturnBack.addEventListener('click', returnBack)
btnReturnHome.addEventListener('click', returnHome)
