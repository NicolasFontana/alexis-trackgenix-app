import { useState, useEffect } from 'react';
import styles from './form.module.css';
import ListMembers from './ListMembers/ListMembers';

const ProjectForm = () => {
  const [userInput, setUserInput] = useState({
    name: '',
    startDate: '',
    endDate: '',
    clientName: '',
    active: true,
    description: ''
  });
  const [project, saveProjects] = useState([]);
  const [onAdd, setOnAdd] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(async () => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const projectID = params.get('id');
    if (projectID) {
      try {
        const getProject = await fetch(
          `${process.env.REACT_APP_API_URL}/api/projects/${projectID}`
        );
        const projectData = await getProject.json();
        saveProjects([projectData.data]);
        setUserInput({
          name: projectData.data.name,
          startDate: projectData.data.startDate,
          endDate: projectData.data.endDate,
          clientName: projectData.data.clientName,
          active: projectData.data.active,
          description: projectData.data.description
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    } else {
      try {
        const getProject = await fetch(`${process.env.REACT_APP_API_URL}/api/projects`);
        const projectData = await getProject.json();
        saveProjects(projectData.data);
        setOnAdd(true);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const projectID = params.get('id');
    let url = `${process.env.REACT_APP_API_URL}/api/projects`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInput)
    };
    if (projectID) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API_URL}/api/projects/${projectID}`;
    }
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(data.error);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error);
    }
  };
  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onChangeActive = (e) => {
    setUserInput({ ...userInput, active: e.target.value == 'true' ? true : false });
  };

  return isLoading ? (
    <h1 className={styles.loading}>Loading form...</h1>
  ) : (
    <>
      <div className={styles.maincontainer}>
        <form onSubmit={onSubmit} className={styles.container}>
          {onAdd ? <h2>Add Project</h2> : <h2>Edit Project</h2>}
          <div className={styles.maincontainer}>
            <div className={styles.divcontainer}>
              <div>
                <label>Project Name</label>
                <input
                  className={styles.inputs}
                  type="text"
                  name="name"
                  placeholder="Insert project name"
                  value={userInput.name}
                  onChange={onChange}
                />
              </div>
              <div>
                <label>Client</label>
                <input
                  className={styles.inputs}
                  type="text"
                  name="clientName"
                  placeholder="Insert client name"
                  value={userInput.clientName}
                  onChange={onChange}
                />
              </div>
              <div>
                <label>Active</label>
                <select
                  name="active"
                  defaultValue={userInput.active}
                  onChange={onChangeActive}
                  className={styles.inputs}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div>
                <label>Start Date</label>
                <input
                  className={styles.inputs}
                  type="date"
                  name="startDate"
                  placeholder="mm/dd/yyyy"
                  value={onAdd ? userInput.startDate : userInput.startDate.slice(0, 10)}
                  onChange={onChange}
                />
              </div>
              <div>
                <label>End Date</label>
                <input
                  className={styles.inputs}
                  type="date"
                  name="endDate"
                  placeholder="mm/dd/yyyy"
                  value={onAdd ? userInput.endDate : userInput.endDate.slice(0, 10)}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className={styles.divcontainer}>
              <div>
                <label>Description</label>
                <textarea
                  id="textarea"
                  name="description"
                  cols="30"
                  rows="10"
                  value={userInput.description}
                  placeholder="Add a description of the project"
                  onChange={onChange}
                ></textarea>
              </div>
              <div>
                <ListMembers project={project} onAdd={onAdd} />
              </div>
            </div>
          </div>
          <div className={styles.buttons}>
            <input type="submit" value="Submit" onSubmit={onSubmit} />
          </div>
          <a href={'/projects'} className={styles.goBack}>
            Go back
          </a>
        </form>
      </div>
    </>
  );
};
export default ProjectForm;
