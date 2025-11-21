import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Изучить React', completed: false },
    { id: 2, text: 'Написать приложение', completed: false }
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  // Функция для добавления новой задачи
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

  // Функция для удаления задачи
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Функция для переключения статуса выполнения задачи
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ProductivityPlus Task Manager</h1>
        <div className="task-input">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Введите новую задачу..."
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask}>Добавить задачу</button>
        </div>
        
        <div className="tasks-list">
          <h2>Список задач ({tasks.length})</h2>
          {tasks.length === 0 ? (
            <p>Задач пока нет. Добавьте первую задачу!</p>
          ) : (
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
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
