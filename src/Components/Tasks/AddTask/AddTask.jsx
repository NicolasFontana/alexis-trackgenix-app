import React from 'react';
import { useState } from 'react';
import './AddTask.module.css';

const AddItem = ({ addItem }) => {
  const [userInput, setUserInput] = useState({
    taskName: '',
    startDate: '',
    workedHours: '',
    description: '',
    status: ''
  });

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addItem(userInput);
    setUserInput({
      taskName: '',
      startDate: '',
      workedHours: '',
      description: '',
      status: ''
    });
  };

  return (
    <div>
      <div>
        <h2>Add New Task</h2>
      </div>
      <form onSubmit={onSubmit} className="input-form">
        <div>
          <label>Name</label>
          <input type="text" name="taskName" value={userInput.taskName} onChange={onChange} />
        </div>
        <div>
          <label>Start Date</label>
          <input type="text" name="startDate" value={userInput.startDate} onChange={onChange} />
        </div>
        <div>
          <label>Worked Hours</label>
          <input type="text" name="workedHours" value={userInput.workedHours} onChange={onChange} />
        </div>
        <div>
          <label>Description</label>
          <input type="text" name="description" value={userInput.description} onChange={onChange} />
        </div>
        <div>
          <label>Status</label>
          <input type="text" name="status" value={userInput.status} onChange={onChange} />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AddItem;
