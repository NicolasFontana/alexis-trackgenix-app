import { useState } from 'react';
import Input from '../Input/Input';
import styles from './form.module.css';

const Form = () => {
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
    return fetch(`${process.env.REACT_APP_API_URL}api/tasks/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInput)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          alert('The data entered is not correct');
        } else {
          alert('Task added successfully');
        }
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.header}>
          <h2>Add New Task</h2>
        </div>
        <form onSubmit={onSubmit} className={styles.formInputs}>
          <Input label="Task Name" name="taskName" value={userInput.taskName} onChange={onChange} />
          <Input
            label="Start Date"
            name="startDate"
            value={userInput.startDate}
            onChange={onChange}
          />
          <Input
            label="Worked Hours"
            name="workedHours"
            value={userInput.workedHours}
            onChange={onChange}
          />
          <Input
            label="Description"
            name="description"
            value={userInput.description}
            onChange={onChange}
          />
          <select name="status" value={userInput.status} onChange={onChange}>
            <option value="">Status</option>
            <option value="To do">To do</option>
            <option value="In progress">In progress</option>
            <option value="Review">Review</option>
            <option value="Blocked">Blocked</option>
            <option value="Done">Done</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button type="submit">Submit</button>
          <a href="/tasks">Go Back</a>
        </form>
      </div>
    </div>
  );
};

export default Form;
