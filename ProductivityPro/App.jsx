// App.jsx 
import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Подготовить презентацию', completed: false },
    { id: 2, text: 'Написать отчет', completed: true },
    { id: 3, text: 'Созвить план на неделю', completed: false }
  ]);

  return (
    <div className="app">
      <h1>Productivity Pro</h1>
      <p>Минималистичный трекер задач</p>
      
      {/* TODO: Передать функцию setTasks в TaskForm через props */}
      <TaskForm />
      
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
