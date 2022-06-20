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

export { observer }