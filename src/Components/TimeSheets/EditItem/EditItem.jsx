import React, { useState } from 'react';
import styles from './EditItem.module.css';

const EditItem = ({ show, closeForm, previewTimeSheet, setShowModal, setShowTitle }) => {
  if (!show) {
    return null;
  }

  const [editTimeSheet, setEditTimeSheet] = useState({
    projectName: previewTimeSheet.projectId.name,
    taskId: previewTimeSheet.Task[0].taskId._id,
    taskName: previewTimeSheet.Task[0].taskId.taskName,
    startDate: previewTimeSheet.Task[0].taskId.startDate,
    workedHours: previewTimeSheet.Task[0].taskId.workedHours,
    description: previewTimeSheet.Task[0].taskId.description,
    status: previewTimeSheet.Task[0].taskId.status
  });

  const onChange = (e) => {
    setEditTimeSheet({ ...editTimeSheet, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setEditTimeSheet({
      projectName: '',
      taskId: '',
      taskName: '',
      startDate: '',
      workedHours: '',
      description: '',
      status: ''
    });

    const TimeSheetId = previewTimeSheet._id;

    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        projectName: editTimeSheet.projectName,
        taskId: editTimeSheet.taskId,
        taskName: editTimeSheet.taskName,
        startDate: editTimeSheet.startDate,
        workedHours: editTimeSheet.workedHours,
        description: editTimeSheet.description,
        status: editTimeSheet.status
      })
    };
    const url = `${process.env.REACT_APP_API_URL}/api/time-sheets/${TimeSheetId}`;

    fetch(url, options).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          setShowModal(true);
          setShowTitle(message);
          throw new Error(message);
        });
      }
      setShowTitle('Time Sheet edited Successfully');
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
            value={editTimeSheet.projectName}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Task ID</label>
          <input type="text" name="taskId" value={editTimeSheet.taskId} onChange={onChange}></input>
        </div>
        <div>
          <label>Task Name</label>
          <input
            type="text"
            name="taskName"
            value={editTimeSheet.taskName}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={editTimeSheet.startDate}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Worked Hours</label>
          <input
            type="number"
            name="workedHours"
            value={editTimeSheet.workedHours}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={editTimeSheet.description}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Status</label>
          <input
            type="boolean"
            name="status"
            value={editTimeSheet.status}
            onChange={onChange}
          ></input>
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
export default EditItem;
