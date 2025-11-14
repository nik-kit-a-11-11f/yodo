// Базовый код приложения - нужно доработать!
document.addEventListener('DOMContentLoaded', () => {
    const tasksList = document.querySelector('.tasks__list');
    const tasksCounter = document.querySelector('#tasks-counter');
    const addTaskForm = document.querySelector('.add-task-form');
    const taskInput = document.querySelector('.task-input');

    // Проверяем, что все элементы найдены
    if (!tasksList || !tasksCounter || !addTaskForm || !taskInput) {
        console.warn('Не все необходимые элементы найдены на странице!');
        return;
    }

    console.log('Все элементы найдены. Можно начинать работу!');

    // Функция для добавления новой задачи
    function addNewTask(taskText) {
        if (!taskText.trim()) return;

        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        
        const taskContent = document.createElement('span');
        taskContent.className = 'task-text';
        taskContent.textContent = taskText;
        
        taskItem.appendChild(taskContent);
        tasksList.appendChild(taskItem);

        // TODO: Вызвать функцию обновления счетчика
        // updateTasksCounter();
        
        console.log(`Добавлена задача: "${taskText}"`);
    }

    // TODO: Реализовать функцию обновления счетчика
    function updateTasksCounter() {
        // 1. Найти все элементы с классом .task-item
        // 2. Посчитать количество найденных элементов
        // 3. Обновить текст в элементе tasksCounter
        // 4. Учесть разные формы слова "задача" (1 задача, 2 задачи, 5 задач)
        
        console.log('Счетчик должен обновиться!');
    }

    // Обработчик отправки формы
    addTaskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const taskText = taskInput.value.trim();
        addNewTask(taskText);
        
        // Очищаем поле ввода
        taskInput.value = '';
        taskInput.focus();
    });

    // TODO: Вызвать updateTasksCounter при загрузке страницы для отображения начального состояния
    // updateTasksCounter();
});
