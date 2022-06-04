import React, { useState, useEffect } from 'react';
import styles from './EditItem.module.css';

const EditItem = ({ show, closeForm, previewTimeSheet, setShowModal, setShowTitle }) => {
  if (!show) {
    return null;
  }

  const [listTask, setListTask] = useState([]);
  const [listProject, setListProject] = useState([]);
  const [task, setTask] = useState(previewTimeSheet.Task[0].taskId._id);
  const [projectId, setProjectId] = useState(previewTimeSheet.projectId._id);
  const [approved, setApproved] = useState(previewTimeSheet.approved);

  const fetchTask = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`);
      const data = await response.json();
      console.log(data);
      setListTask(...listTask, data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchProject = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/projects`);
      const data = await response.json();
      setListProject(...listProject, data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const TimeSheetId = previewTimeSheet._id;

    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        projectId: projectId,
        task: task,
        approved: approved
      })
    };
    const url = `${process.env.REACT_APP_API_URL}/api/time-sheets/${TimeSheetId}`;

    fetch(url, options).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          setShowModal(true);
          setShowTitle(message);
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
          <label>Project</label>
          <select
            name="project"
            onChange={(e) => {
              setProjectId(e.target.value);
            }}
          >
            {listProject.map((project) => (
              <option key={project._id} value={project._id}>
                {project._id}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Task</label>
          <select
            name="Task"
            onChange={(e) => {
              setTask(e.target.value);
            }}
          >
            {listTask.map((task) => (
              <option key={task._id} value={task._id}>
                {task._id}
              </option>
            ))}
          </select>
        </div>
        {/* <div>
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
        </div> */}
        <div>
          <label>Approved</label>
          <select
            name="approved"
            onChange={(e) => {
              setApproved(e.target.value);
            }}
          >
            <option></option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
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
