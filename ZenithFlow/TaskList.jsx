const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Закончить проект', completed: false },
    { id: 2, text: 'Подготовить презентацию', completed: true },
    { id: 3, text: 'Написать отчет', completed: false }
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  // Функции для работы с задачами
  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask = {
        id: Date.now(),
        text: newTaskText,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
    }
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="task-list">
      <h1>Умный список дел</h1>
      <div className="add-task">
        <input 
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Новая задача..."
        />
        <button onClick={addTask}>Добавить</button>
      </div>
      <div className="tasks">
        {tasks.map(task => (
          <TaskItem 
            key={task.id}
            task={task}
            onToggle={toggleTask}
          />
        ))}
      </div>
    </div>
  );
};
