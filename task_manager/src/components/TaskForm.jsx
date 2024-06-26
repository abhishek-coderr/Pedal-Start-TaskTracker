import React, { useState } from 'react';
import './TaskForm.css';

function TaskForm({ onSubmit }) {
  // State hooks to manage form data
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Collect form data into an object
    const taskData = {
      title,
      description,
      date,
    };
console.log(taskData);
    try {
      const response = await fetch('http://localhost:8000/addtask', {
        method: 'POST', // HTTP method
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
        },
        body: JSON.stringify({taskData}), // Convert taskData object to JSON string
      });

      const data= await response.json()
      alert(data.message)
      setTitle('')
      setDescription('')
      setDate('')

    
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
    }

    onSubmit();
  };

  return (
    <div className="task-form">
      <h2>New Task Form</h2>
      <p><i>Please add the required details of your task below</i></p>
      <form className="task_details" onSubmit={handleSubmit}>
        <input 
          type="text" 
          required 
          placeholder="Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Update title state on input change
        /><br />
        <textarea 
          rows={5} 
          placeholder="Task description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Update description state on input change
        ></textarea><br />
        <input 
          required 
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)} // Update date state on input change
        /><br />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}

export default TaskForm;
