const password = document.getElementById('password')
const backgound = document.getElementById('background')

password.addEventListener('input', (e) => {
    const input = e.target.value
    const length = input.length
    const blurValue = 20 - length * 2

    backgound.style.filter = `blur(${blurValue}px)`
})
