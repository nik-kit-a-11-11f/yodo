// Функция для переключения темы
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const themeText = themeToggle.querySelector('.theme-text');
    
    // Переключаем класс dark-theme на body
    body.classList.toggle('dark-theme');
    
    // Меняем текст и иконку кнопки
    if (body.classList.contains('dark-theme')) {
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Светлая тема';
        // Сохраняем выбор пользователя
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Темная тема';
        // Сохраняем выбор пользователя
        localStorage.setItem('theme', 'light');
    }
}

// Загрузка сохраненной темы при загрузке страницы
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const themeText = themeToggle.querySelector('.theme-text');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Светлая тема';
    }
}

// Загружаем тему когда страница загрузилась
document.addEventListener('DOMContentLoaded', loadTheme);
