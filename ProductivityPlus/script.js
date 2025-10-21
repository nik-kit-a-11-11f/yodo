// Функция для добавления новой задачи
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    
    // Проверяем, что поле не пустое
    if (taskInput.value.trim() === '') {
        alert('Пожалуйста, введите задачу');
        return;
    }
    
    // Создаем новый элемент списка
    const newTask = document.createElement('li');
    newTask.className = 'task';
    newTask.textContent = taskInput.value;
    
    // Добавляем задачу в список
    taskList.appendChild(newTask);
    
    // Очищаем поле ввода
    taskInput.value = '';
    taskInput.focus();
}

// Добавляем обработчик нажатия Enter
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
