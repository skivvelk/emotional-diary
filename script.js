//  ХРАНИЛИЩЕ ДАННЫХ 
let notes = [];

//  ЗАГРУЗКА ДАННЫХ ПРИ СТАРТЕ 
window.onload = function() {
    let saved = localStorage.getItem('notes');
    if(saved) {
        notes = JSON.parse(saved);
    }
    showAllNotes();
    showFavoriteNotes();
}

//  ПЕРЕКЛЮЧЕНИЕ ТАБОВ (вкладки) 
function showTab(tabName) {
    let tabs = document.querySelectorAll('.tab-content');
    for(let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
    }
    
    let buttons = document.querySelectorAll('.tab-button');
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    
    document.getElementById(tabName).style.display = 'block';
    event.target.classList.add('active');
    
    if(tabName == 'all') {
        showAllNotes();
    }
    if(tabName == 'favorites') {
        showFavoriteNotes();
    }
}

//  ДОБАВЛЕНИЕ НОВОЙ ЗАПИСИ 
function addNote() {
    let emotion = document.getElementById('emotion').value;
    let text = document.getElementById('note').value;
    
    if(text.trim() == '') {
        alert('Напиши что-нибудь!');
        return;
    }
    
    let date = new Date();
    let dateString = date.toLocaleDateString('ru-RU') + ' ' + date.toLocaleTimeString('ru-RU');
    
    let newNote = {
        id: Date.now(),
        emotion: emotion,
        text: text,
        date: dateString,
        favorite: false
    };
    
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    
    document.getElementById('note').value = '';
    alert('Запись сохранена!');
}

//  ПОКАЗАТЬ ВСЕ ЗАПИСИ 
function showAllNotes() {
    let container = document.getElementById('allNotes');
    container.innerHTML = '';
    
    if(notes.length == 0) {
        container.innerHTML = '<div class="empty-message">Записей пока нет</div>';
        return;
    }
    
    for(let i = notes.length - 1; i >= 0; i--) {
        let note = notes[i];
        let div = document.createElement('div');
        div.className = 'note-item';
        
        let favoriteClass = note.favorite ? 'favorited' : '';
        let favoriteText = note.favorite ? 'Убрать из избранного' : 'В избранное';
        
        div.innerHTML = `
            <div class="note-header">
                <div class="note-emotion">${note.emotion}</div>
                <div class="note-date">${note.date}</div>
            </div>
            <div class="note-text">${note.text}</div>
            <div class="note-buttons">
                <button class="favorite-btn ${favoriteClass}" onclick="toggleFavorite(${note.id})">${favoriteText}</button>
                <button class="delete-btn" onclick="deleteNote(${note.id})">Удалить</button>
            </div>
        `;
        
        container.appendChild(div);
    }
}

//  ПОКАЗАТЬ ИЗБРАННЫЕ ЗАПИСИ 
function showFavoriteNotes() {
    let container = document.getElementById('favoriteNotes');
    container.innerHTML = '';
    
    let favoriteNotes = [];
    for(let i = 0; i < notes.length; i++) {
        if(notes[i].favorite) {
            favoriteNotes.push(notes[i]);
        }
    }
    
    if(favoriteNotes.length == 0) {
        container.innerHTML = '<div class="empty-message">Избранных записей пока нет</div>';
        return;
    }
    
    for(let i = favoriteNotes.length - 1; i >= 0; i--) {
        let note = favoriteNotes[i];
        let div = document.createElement('div');
        div.className = 'note-item';
        
        div.innerHTML = `
            <div class="note-header">
                <div class="note-emotion">${note.emotion}</div>
                <div class="note-date">${note.date}</div>
            </div>
            <div class="note-text">${note.text}</div>
            <div class="note-buttons">
                <button class="favorite-btn favorited" onclick="toggleFavorite(${note.id})">Убрать из избранного</button>
                <button class="delete-btn" onclick="deleteNote(${note.id})">Удалить</button>
            </div>
        `;
        
        container.appendChild(div);
    }
}

//  ДОБАВИТЬ/УБРАТЬ ИЗ ИЗБРАННОГО 
function toggleFavorite(id) {
    for(let i = 0; i < notes.length; i++) {
        if(notes[i].id == id) {
            notes[i].favorite = !notes[i].favorite;
            break;
        }
    }

    localStorage.setItem('notes', JSON.stringify(notes));
    showAllNotes();
    showFavoriteNotes();
}

//  УДАЛЕНИЕ ЗАПИСИ 
function deleteNote(id) {
    if(confirm('Удалить эту запись?')) {
        for(let i = 0; i < notes.length; i++) {
            if(notes[i].id == id) {
                notes.splice(i, 1);
                break;
            }
        }

        localStorage.setItem('notes', JSON.stringify(notes));
        showAllNotes();
        showFavoriteNotes();
    }
}

