import React, { useState, useEffect } from 'react';
import styles from './AddItem.module.css';

const AddItem = ({ show, closeForm, setShowModal, setShowTitle }) => {
  if (!show) {
    return null;
  }

  // const [userInput, setUserInput] = useState({
  //   projectName: '',
  //   taskId: '',
  //   taskName: '',
  //   startDate: '',
  //   workedHours: '',
  //   description: '',
  //   status: ''
  // });

  const [listTask, setListTask] = useState([]);
  const [listProject, setListProject] = useState([]);
  // const [projectName, setProjectName] = useState('');
  const [task, setTask] = useState('');
  const [projectId, setProjectId] = useState('');

  const [approved, setApproved] = useState('');

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

  // const onChange = (e) => {
  //   setTask({ ...task, [e.target.name]: e.target.value });
  // };

  const handleSelectedTask = (e) => {
    console.log('asd', e);
    const id = e;
    // console.log('asd task', listTask);
    // const taskSelected = listTask.filter((task) => id === task._id);
    // console.log('asd taskSelected', taskSelected);
    setTask(id);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('asd', { taskId: task });
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        projectId: projectId,
        // projectName: projectName,
        Task: [...listTask, { taskId: task }],
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
        <h2>Form</h2>
        <div>
          <label>Project ID</label>
          {/* <select
            name="project"
            onChange={(e) => {
              setProjectId(e.target.value);
            }}
          >
            <option>Select</option>
            {
            listProject.map((project) => (
              <option key={project._id} value={project._id}>
                {project._id}
              </option>
            ))}
          </select> */}
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
        {/* <div>
          <label>Project Name</label>
          <input
            type="text"
            name="projectName"
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
          ></input>
        </div> */}
        <div>
          <label>Task ID</label>
          {/* <select name="Task" onChange={onChange}>
            {listTask.map((task) => (
              <option key={task._id} value={task._id}>
                {task._id}
              </option>
            ))}
          </select> */}
          <select
            name="Task"
            onChange={(e) => {
              handleSelectedTask(e.target.value);
            }}
          >
            <option></option>
            {listTask.map((task) => (
              <>
                <option
                  key={task._id}
                  value={task._id}
                  // onClick={() => {
                  //   handleSelectedTask(task._id);
                  // }}
                >
                  {task._id}
                </option>
              </>
            ))}
          </select>
        </div>
        {/* <div>
          <label>Task Name</label>
          <input type="text" name="taskName" value={task.taskName} onChange={onChange}></input>
        </div>
        <div>
          <label>Start Date</label>
          <input type="date" name="startDate" value={task.startDate} onChange={onChange}></input>
        </div>
        <div>
          <label>Worked Hours</label>
          <input
            type="number"
            name="workedHours"
            value={task.workedHours}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={task.description}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Status</label>
          <input type="boolean" name="status" value={task.status} onChange={onChange}></input>
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

export default AddItem;
