import React, { useState, useEffect } from 'react';
import styles from './AddItem.module.css';

const AddItem = ({ show, closeForm, setShowModal, setShowTitle }) => {
  if (!show) {
    return null;
  }

  const [listTask, setListTask] = useState([]);
  const [listProject, setListProject] = useState([]);
  const [task, setTask] = useState('');
  const [projectId, setProjectId] = useState('');
  const [approved, setApproved] = useState('');

  const fetchTask = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`);
      const data = await response.json();
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

  const handleSelectedTask = (e) => {
    const id = e;
    setTask(id);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        projectId: projectId,
        Task: [{ taskId: task }],
        approved: approved
      })
    };
    const url = `http://localhost:8000/api/time-sheets`;

    fetch(url, options).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          setShowModal(true);
          setShowTitle(message);
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
        <h2>Add Time Sheet</h2>
        <div>
          <label>Project</label>
          <select
            name="project"
            onChange={(e) => {
              setProjectId(e.target.value);
            }}
          >
            <option></option>
            {listProject.map((project) => (
              <>
                <option key={project._id} value={project._id}>
                  {project._id}
                </option>
              </>
            ))}
          </select>
        </div>
        <div>
          <label>Task</label>
          <select
            name="Task"
            onChange={(e) => {
              handleSelectedTask(e.target.value);
            }}
          >
            <option></option>
            {listTask.map((task) => (
              <>
                <option key={task._id} value={task._id}>
                  {task._id}
                </option>
              </>
            ))}
          </select>
        </div>
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

export default AddItem;
