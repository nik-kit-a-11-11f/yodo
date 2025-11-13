// Функция для обновления даты последнего изменения
function updateLastModified() {
    const lastUpdateElement = document.getElementById('last-update');
    const now = new Date();
    const formattedDate = now.toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    lastUpdateElement.textContent = formattedDate;
}

// Плавная прокрутка для навигации
document.addEventListener('DOMContentLoaded', function() {
    // Обновляем дату при загрузке
    updateLastModified();
    
    // Добавляем плавную прокрутку для всех ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Обработчик для кнопки CTA
    document.querySelector('.cta-button').addEventListener('click', function() {
        alert('Спасибо за интерес к нашей студии! Мы свяжемся с вами в ближайшее время.');
    });

    // Добавляем класс для sticky навигации при скролле
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(44, 62, 80, 0.95)';
        } else {
            navbar.style.background = '#2c3e50';
        }
    });
});

// Функция для имитации ежедневных обновлений
function simulateDailyUpdates() {
    const updates = [
        "Добавлены новые проекты в портфолио",
        "Обновлена информация об услугах",
        "Добавлены новые отзывы клиентов",
        "Обновлена команда специалистов",
        "Добавлены новые кейсы"
    ];
    
    const randomUpdate = updates[Math.floor(Math.random() * updates.length)];
    console.log(`Сегодняшнее обновление: ${randomUpdate}`);
}

// Вызываем при загрузке
document.addEventListener('DOMContentLoaded', simulateDailyUpdates);
