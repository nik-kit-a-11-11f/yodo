// TODO: Создать массив для хранения задач
// Сейчас данные хранятся только в DOM, поэтому пропадают при перезагрузке
// let tasks = [];

// Элементы DOM
const tasksList = document.querySelector('.tasks-list');
const tasksCounter = document.querySelector('#tasks-counter');
const addTaskForm = document.querySelector('.add-task-form');
const taskInput = document.querySelector('.task-input');

// Функция для отрисовки всех задач из массива
function renderTasks() {
    console.log('Отрисовываем задачи...');
    
    // Очищаем список перед отрисовкой
    tasksList.innerHTML = '';
    
    // TODO: Перебрать массив tasks и отрисовать каждую задачу
    // tasks.forEach(task => {
    //     const taskElement = createTaskElement(task);
    //     tasksList.append(taskElement);
    // });
    
    // Временная заглушка - отображаем сообщение, что массив пуст
    if (true) { // Заменить на проверку tasks.length === 0
        tasksList.innerHTML = `
            <div class="empty-state">
                <p>Правок пока нет</p>
                <p>Добавьте первую правку с помощью формы выше</p>
            </div>
        `;
    }
    
    updateTasksCounter();
}

// Функция для создания HTML-элемента задачи
function createTaskElement(task) {
    const taskElement = document.createElement('li');
    taskElement.className = 'task-item';
    taskElement.innerHTML = `
        <div class="task-content">
            <div class="task-text">${task.text}</div>
            <div class="task-id">ID: ${task.id}</div>
        </div>
    `;
    return taskElement;
}

// Функция для добавления новой задачи
function addNewTask(taskText) {
    if (!taskText.trim()) {
        alert('Пожалуйста, введите описание правки');
        return;
    }
    
    console.log('Добавляем новую задачу:', taskText);
    
    // TODO: Создать объект задачи и добавить в массив tasks
    // const newTask = {
    //     id: Date.now(), // Уникальный ID на основе времени
    //     text: taskText
    // };
    // tasks.push(newTask);
    
    // TODO: Вызвать renderTasks() для обновления интерфейса
    // renderTasks();
    
    // Временная заглушка - добавляем прямо в DOM (так делать НЕ нужно!)
    const tempElement = document.createElement('li');
    tempElement.className = 'task-item';
    tempElement.innerHTML = `
        <div class="task-content">
            <div class="task-text">${taskText}</div>
            <div class="task-id">ID: временный</div>
        </div>
    `;
    tasksList.append(tempElement);
    updateTasksCounter();
}

// Функция для обновления счетчика задач
function updateTasksCounter() {
    // TODO: Использовать длину массива tasks
    // const count = tasks.length;
    const count = document.querySelectorAll('.task-item').length; // Временное решение
    tasksCounter.textContent = `Всего: ${count}`;
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

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('Трекер правок "Pixel Perfect" загружен!');
    
    // TODO: Инициализировать начальные данные
    // tasks = []; // или загрузить из localStorage
    
    // TODO: Вызвать renderTasks() для первоначальной отрисовки
    // renderTasks();
    
    updateTasksCounter();
});
