const containers = document.querySelectorAll(".faq")

containers.forEach(container => {
    container.addEventListener('click', () => {
        container.classList.toggle('active')
    })
})
