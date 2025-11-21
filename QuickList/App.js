import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Молоко', completed: false },
    { id: 2, text: 'Хлеб', completed: false },
    { id: 3, text: 'Яйца', completed: true }
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  // Функция для добавления нового товара
  const addTask = () => {
    if (newTaskText.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: newTaskText,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
    }
  };

  // Функция для удаления товара
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Функция для переключения статуса покупки товара
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Функция для очистки всего списка
  const clearAllTasks = () => {
    setTasks([]);
  };

  // Функция для загрузки тестовых данных
  const loadSampleData = () => {
    const sampleTasks = [
      { id: 1, text: 'Молоко', completed: false },
      { id: 2, text: 'Хлеб', completed: false },
      { id: 3, text: 'Яйца', completed: true },
      { id: 4, text: 'Сыр', completed: false },
      { id: 5, text: 'Фрукты', completed: false }
    ];
    setTasks(sampleTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>QuickList - Список покупок</h1>
        
        <div className="app-description">
          <p>Добавляйте товары в список покупок. Отмечайте купленное.</p>
          <p className="warning">⚠️ Проблема: при перезагрузке страницы список исчезает!</p>
        </div>

        <div className="task-input">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Что нужно купить?"
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask}>Добавить</button>
        </div>

        <div className="controls">
          <button onClick={loadSampleData} className="secondary-btn">
            Загрузить пример
          </button>
          <button onClick={clearAllTasks} className="danger-btn">
            Очистить всё
          </button>
        </div>
        
        <div className="tasks-list">
          <h2>Мой список покупок ({tasks.length})</h2>
          
          {tasks.length === 0 ? (
            <div className="empty-state">
              <p>Список покупок пуст</p>
              <p>Добавьте первый товар или загрузите пример</p>
            </div>
          ) : (
            <>
              <div className="stats">
                <span>Всего: {tasks.length}</span>
                <span>Осталось: {tasks.filter(t => !t.completed).length}</span>
                <span>Куплено: {tasks.filter(t => t.completed).length}</span>
              </div>
              
              <ul>
                {tasks.map(task => (
                  <li key={task.id} className={task.completed ? 'completed' : ''}>
                    <span 
                      onClick={() => toggleTaskCompletion(task.id)}
                      className="task-text"
                    >
                      {task.text}
                    </span>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="delete-btn"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="localstorage-demo">
          <h3>Демонстрация проблемы</h3>
          <p>Попробуйте:</p>
          <ol>
            <li>Добавить несколько товаров в список</li>
            <li>Обновить страницу (F5)</li>
            <li>Убедиться, что список исчез</li>
          </ol>
        </div>
      </header>
    </div>
  );
}

export default App;
