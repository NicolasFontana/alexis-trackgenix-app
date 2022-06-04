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
    return fetch(`${process.env.REACT_APP_API_URL}/api/tasks/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInput)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message == '"taskName" length must be at least 3 characters long') {
          alert('Task name length must be at least 3 characters longs');
        } else if (response.message == '"startDate" must be a valid date') {
          alert('Start date must be a valid date');
        } else if (response.message == '"workedHours" must be a number') {
          alert('Worked Hours must be a number');
        } else if (response.message == '"workedHours" must be an integer') {
          alert('Worked Hours must be an integer');
        } else if (response.message == '"description" length must be at least 6 characters long') {
          alert('Description length must be at least 6 characters long');
        } else if (
          response.message ==
          '"status" must be one of [To do, In progress, Review, Blocked, Done, Cancelled]'
        ) {
          alert('Status must be: [To do, In progress, Review, Blocked, Done, Cancelled]');
        } else {
          alert('Task edited successfully');
          window.location.replace(
            'https://alexis-trackgenix-app-git-feature-tg-30tasks-agustin-basp-m2022.vercel.app/tasks'
          );
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
          <Input
            label="Task Name"
            name="taskName"
            type="text"
            value={userInput.taskName}
            onChange={onChange}
          />
          <Input
            label="Start Date"
            name="startDate"
            type="date"
            value={userInput.startDate}
            onChange={onChange}
          />
          <Input
            label="Worked Hours"
            name="workedHours"
            type="number"
            value={userInput.workedHours}
            onChange={onChange}
          />
          <Input
            label="Description"
            name="description"
            type="text"
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
