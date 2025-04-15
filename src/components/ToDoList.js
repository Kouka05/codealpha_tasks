import React, { useState, useEffect, useCallback } from 'react';
import './ToDoList.css';

const getInitialTasks = () => {
  const savedTasks = localStorage.getItem('react-todos');
  return savedTasks ? JSON.parse(savedTasks) : [];
};

function ToDoList() {
  const [tasks, setTasks] = useState(getInitialTasks);
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    localStorage.setItem('react-todos', JSON.stringify(tasks));
  }, [tasks]); {/* to keep local storage up to date */}

  const handleInputChange = (event) => {
    setNewTaskText(event.target.value);
  };

  const addTask = useCallback(() => {
    const text = newTaskText.trim();
    if (text === "") {
      alert("Please enter a task!");
      return;
    }
    const newTask = {
      id: Date.now(), 
      text: text,
      completed: false
    };
    setTasks(prevTasks => [...prevTasks, newTask]); 
    setNewTaskText(''); 
  }, [newTaskText]); 

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  const toggleComplete = useCallback((id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []); 

  const deleteTask = useCallback((id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []); 

  return (
    <div className="todo-container component-container">
      <h1>Alpha To-Do List</h1>
      <div className="input-area">
        <input
          type="text"
          id="task-input"
          placeholder="Add a new task..."
          value={newTaskText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button id="add-task-btn" onClick={addTask}>Add Task</button>
      </div>
      <ul id="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span className="task-text" onClick={() => toggleComplete(task.id)}>
              {task.text}
            </span>
            <div className="task-buttons">
              <button className="complete-btn" onClick={() => toggleComplete(task.id)}>
                &#x2714; {/* Checkmark */}
              </button>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                &#x1F5D1; {/* Trash Can */}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;