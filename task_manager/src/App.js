import './App.css';
import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm'

function App() {

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState([]);

  const toggleTaskForm = () => {
      setShowTaskForm(!showTaskForm);
    };

    const handleSubmit = () => {
      setShowTaskForm(false); // Hide the TaskForm when submit button is clicked
      fetchTasks()
    };

  
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8000/getAllTasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data); // Set the fetched tasks into state
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  const handleDelete = async (taskID) => {
    const response = await fetch('http://localhost:8000/deleteTask', {
      method: 'POST', // HTTP method
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
      },
      body: JSON.stringify({taskID}), // Convert taskData object to JSON string
    });

    const data = await response.json()
    alert(data.message)

    fetchTasks()
  }

  const handleStatusChange = async (taskID) => {
    const response = await fetch('http://localhost:8000/updateTaskStatus', {
      method: 'POST', // HTTP method
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
      },
      body: JSON.stringify({taskID}),
    })

    const data = await response.json()
    alert(data.message)

    fetchTasks()
  }
  


  return (
    <div className='tasks_container'>
      <header>
        <h1>My Tasks</h1>
        <h1><i title="LOGOUT" class="fa-solid fa-ellipsis-vertical"></i></h1>
      </header>
      <div onClick={toggleTaskForm} className='add-task'>
        <i class="fas fa-plus"></i>
        <h3>Add a task</h3>
      </div>
      <ul className='tasks'>
        {tasks.map((task, index) => (
          <li className='task-list' key={task.taskID}>
            <div className='task-details'>
              <input className='task-checkbox' checked={task.taskStatus} onChange={() => handleStatusChange(task.taskID)} type="checkbox" />
              <label>{task.taskTitle}</label>
              <p className='task-description'>{task.taskDescription}</p>
              <p className='task-date'>
                Due: {task.taskDueDate}

              </p>
            </div>
            <div className='task-actions'>
              <i title="delete task" className="fa-solid fa-trash" onClick={() => handleDelete(task.taskID)}></i>
            </div>
          </li>
        ))}
      </ul>

      {showTaskForm && <TaskForm onSubmit={handleSubmit} />}
    </div>
  );
}

export default App;
