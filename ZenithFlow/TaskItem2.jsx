import { useState } from 'react';

// Компонент TaskItem (нужно оптимизировать)
const TaskItem = ({ task }) => {
  console.log('Render TaskItem:', task.text); // Логируем каждый рендер
  
  return (
    <div className="task-item">
      <h3>{task.text}</h3>
      <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
    </div>
  );
};

// Главный компонент приложения
function App() {
  const [tasks] = useState([
    { id: 1, text: 'Разработать новый фич', completed: false },
    { id: 2, text: 'Исправить баги в поиске', completed: true },
    { id: 3, text: 'Оптимизировать производительность', completed: false },
    { id: 4, text: 'Подготовить документацию', completed: false }
  ]);
  const [search, setSearch] = useState('');

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Zenith Flow - Task Manager</h1>
      
      <input
        type="text"
        placeholder="Поиск задач..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
      />
      
      <div>
        {filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default App;
