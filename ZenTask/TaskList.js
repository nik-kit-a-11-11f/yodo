import { useState, useEffect } from 'react';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Функция для добавления новой задачи
  const addTask = () => {
    if (newTaskText.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: newTaskText,
        completed: false,
        createdAt: new Date().toISOString()
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setNewTaskText('');
    }
  };

  // Функция для удаления задачи
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Функция для переключения статуса выполнения задачи
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Функция для очистки всех задач
  const clearAllTasks = () => {
    setTasks([]);
  };

  // Функция для сохранения задач в localStorage
  const saveTasksToStorage = (tasksToSave) => {
    localStorage.setItem('zenTasks', JSON.stringify(tasksToSave));
  };

  // TODO: Шаг 1 - Добавьте useEffect для загрузки задач при монтировании
  // Этот эффект должен выполниться только один раз при первом рендере

  // Эффект для сохранения задач при их изменении
  useEffect(() => {
    if (!isLoading) {
      saveTasksToStorage(tasks);
      console.log('Задачи сохранены в localStorage:', tasks);
    }
  }, [tasks, isLoading]);

  return (
    <div className="task-list">
      <header className="task-list-header">
        <h1>ZenTask</h1>
        <p className="tagline">Ваш спокойный список дел</p>
      </header>

      <div className="problem-section">
        <div className="problem-alert">
          <h3>⚠️ Проблема ZenTask</h3>
          <p>При перезагрузке страницы все задачи исчезают!</p>
          <div className="problem-demo">
            <strong>Попробуйте:</strong>
            <ol>
              <li>Добавьте несколько задач</li>
              <li>Обновите страницу (F5)</li>
              <li>Убедитесь, что задачи пропали</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="task-input-section">
        <div className="task-input">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Какая задача вас ждет сегодня?"
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            disabled={isLoading}
          />
          <button onClick={addTask} disabled={isLoading}>
            Добавить задачу
          </button>
        </div>
        
        <div className="task-controls">
          <button onClick={clearAllTasks} className="clear-btn" disabled={isLoading}>
            Очистить все
          </button>
          <span className="task-count">
            Всего задач: {tasks.length}
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Загружаем ваши задачи...</p>
        </div>
      ) : (
        <div className="tasks-container">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>Список дел пуст</h3>
              <p>Добавьте первую задачу и начните свой продуктивный день!</p>
              <div className="empty-tips">
                <p><strong>Совет:</strong> Задачи автоматически сохраняются при изменении</p>
              </div>
            </div>
          ) : (
            <>
              <div className="tasks-stats">
                <span>Всего: {tasks.length}</span>
                <span>Выполнено: {tasks.filter(t => t.completed).length}</span>
                <span>Осталось: {tasks.filter(t => !t.completed).length}</span>
              </div>
              
              <ul className="tasks">
                {tasks.map(task => (
                  <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                    <div className="task-content">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                        className="task-checkbox"
                      />
                      <span className="task-text">{task.text}</span>
                    </div>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="delete-task-btn"
                      title="Удалить задачу"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <div className="localstorage-info">
        <h3>Информация для разработчика</h3>
        <div className="info-grid">
          <div className="info-item">
            <strong>Ключ в localStorage:</strong>
            <code>zenTasks</code>
          </div>
          <div className="info-item">
            <strong>Текущее состояние:</strong>
            <span>{isLoading ? 'Загрузка...' : 'Готово'}</span>
          </div>
          <div className="info-item">
            <strong>Задач в памяти:</strong>
            <span>{tasks.length}</span>
          </div>
        </div>
        
        <div className="debug-actions">
          <button 
            onClick={() => console.log('Tasks in state:', tasks)}
            className="debug-btn"
          >
            Лог в консоль
          </button>
          <button 
            onClick={() => console.log('Tasks in localStorage:', localStorage.getItem('zenTasks'))}
            className="debug-btn"
          >
            Проверить localStorage
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskList;
