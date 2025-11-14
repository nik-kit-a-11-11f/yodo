// База данных книг
const books = [
    { id: 1, title: "Властелин Колец", author: "Дж. Р. Р. Толкин", genre: "fantasy" },
    { id: 2, title: "Гарри Поттер и философский камень", author: "Дж. К. Роулинг", genre: "fantasy" },
    { id: 3, title: "Игра Эндера", author: "Орсон Скотт Кард", genre: "sci-fi" },
    { id: 4, title: "Дюна", author: "Фрэнк Герберт", genre: "sci-fi" },
    { id: 5, title: "Убийство в Восточном экспрессе", author: "Агата Кристи", genre: "detective" },
    { id: 6, title: "Шерлок Холмс", author: "Артур Конан Дойл", genre: "detective" },
    { id: 7, title: "Гордость и предубеждение", author: "Джейн Остин", genre: "romance" },
    { id: 8, title: "Виноваты звезды", author: "Джон Грин", genre: "romance" },
    { id: 9, title: "Хоббит", author: "Дж. Р. Р. Толкин", genre: "fantasy" },
    { id: 10, title: "Основание", author: "Айзек Азимов", genre: "sci-fi" }
];

// Элементы DOM
let currentBooks = [...books];
const booksList = document.querySelector('.books-list');
const booksCounter = document.querySelector('#books-counter');
const filterButtons = document.querySelectorAll('.filter-btn');

// Функция отрисовки книг - НУЖНО ИСПРАВИТЬ!
function renderBooks() {
    console.log(`Отрисовываем ${currentBooks.length} книг`);
    
    // TODO: Добавить очистку списка перед отрисовкой новых книг
    // booksList.innerHTML = '';
    
    currentBooks.forEach(book => {
        const bookElement = document.createElement('li');
        bookElement.className = 'book-item';
        bookElement.innerHTML = `
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">${book.author}</p>
            <span class="book-genre">${getGenreName(book.genre)}</span>
        `;
        
        // ПРОБЛЕМА: этот метод добавляет книги, но не удаляет старые
        booksList.append(bookElement);
    });
    
    updateBooksCounter();
}

// Функция фильтрации книг
function filterBooks(genre) {
    if (genre === 'all') {
        currentBooks = [...books];
    } else {
        currentBooks = books.filter(book => book.genre === genre);
    }
    
    console.log(`Отфильтровано по жанру "${genre}": ${currentBooks.length} книг`);
    renderBooks();
}

// Вспомогательные функции
function getGenreName(genreKey) {
    const genres = {
        'fantasy': 'Фэнтези',
        'sci-fi': 'Научная фантастика', 
        'detective': 'Детектив',
        'romance': 'Романтика'
    };
    return genres[genreKey] || genreKey;
}

function updateBooksCounter() {
    booksCounter.textContent = `Найдено книг: ${currentBooks.length}`;
}

function setActiveFilter(genre) {
    filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.genre === genre);
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('Магазин "Книжный мир" загружен!');
    
    // Обработчики для кнопок фильтра
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const genre = button.dataset.genre;
            setActiveFilter(genre);
            filterBooks(genre);
        });
    });
    
    // Первоначальная отрисовка
    renderBooks();
});
