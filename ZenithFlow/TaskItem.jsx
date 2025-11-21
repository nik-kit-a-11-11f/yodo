const TaskItem = ({ task, onToggle }) => {
  console.log(`Рендер задачи: ${task.text}`); // Логируем каждый рендер

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input 
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span>{task.text}</span>
    </div>
  );
};
