const addBtn = document.getElementById('add')

const notes = JSON.parse(localStorage.getItem('notes'))
console.log(notes)

if(notes) {
    notes.forEach(note => addNewNote(note, true))
}

addBtn.addEventListener('click', () => addNewNote())

function addNewNote(text = '', fromStorage = false) {
    const note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML = `        
    <div class="tools">
        ${fromStorage ? "<button class='edit'><i class='fas fa-edit'></i></button>" : "<button class='edit'><i class='fas fa-check'></i></button>"}
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked(text)

    deleteBtn.addEventListener('click', () => {
        note.remove()

        updateLocalStorage()
    })

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')

        if(textArea.classList.contains('hidden')) {
            editBtn.firstChild.classList.add('fa-edit') 
            editBtn.firstChild.classList.remove('fa-check')
        }else {
            editBtn.firstChild.classList.add('fa-check')
            editBtn.firstChild.classList.remove('fa-edit')
        }
    })

    textArea.addEventListener('input', e => {
        const { value } = e.target
        
        main.innerHTML = marked(value)

        updateLocalStorage()
    })

    document.body.appendChild(note)
}

function updateLocalStorage() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}