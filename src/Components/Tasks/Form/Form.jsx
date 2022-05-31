import { useState } from 'react';
import Input from '../Input/Input';

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

    return fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInput)
    });
  };

  return (
    <div>
      <div>
        <h2>Add New Task</h2>
      </div>
      <form onSubmit={onSubmit} className="form-input">
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
        <Input label="Status" name="status" value={userInput.status} onChange={onChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
