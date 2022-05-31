import React, { useState } from 'react';
import styles from './AddItem.module.css';

const AddItem = ({ show, closeForm, setShowModal, setShowTitle }) => {
  if (!show) {
    return null;
  }

  const [userInput, setUserInput] = useState({
    projectName: '',
    taskId: '',
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
    setUserInput({
      projectName: '',
      taskId: '',
      taskName: '',
      startDate: '',
      workedHours: '',
      description: '',
      status: ''
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        projectId: '62940f0a8e6848e55acaf6f3',
        Task: userInput.Task,
        Startdate: userInput.Startdate,
        Workedhours: userInput.Workedhours,
        Description: userInput.Description,
        Status: userInput.Status,
        approved: userInput.approved
      })
    };
    const url = `${process.env.REACT_APP_API_URL}/api/time-sheets`;

    fetch(url, options).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          setShowModal(true);
          setShowTitle(message);
          throw new Error(message);
        });
      }
      setShowTitle('Time Sheet Created');
      setShowModal(true);
      return response.json();
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Form</h2>
        <div>
          <label>Project Name</label>
          <input
            type="text"
            name="projectName"
            value={userInput.projectName}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Task ID</label>
          <input type="text" name="taskId" value={userInput.taskId} onChange={onChange}></input>
        </div>
        <div>
          <label>Task Name</label>
          <input type="text" name="taskName" value={userInput.taskName} onChange={onChange}></input>
        </div>
        <div>
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={userInput.startDate}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Worked Hours</label>
          <input
            type="number"
            name="workedHours"
            value={userInput.workedHours}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={userInput.description}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Status</label>
          <input type="boolean" name="status" value={userInput.status} onChange={onChange}></input>
        </div>
        <div>
          <input
            type="submit"
            value="Confirm"
            onSubmit={() => {
              setShowModal(true);
            }}
          ></input>
        </div>
        <div>
          <button onClick={closeForm}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
