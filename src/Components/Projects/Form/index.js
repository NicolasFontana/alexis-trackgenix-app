import { useState, useEffect } from 'react';
import styles from './form.module.css';
import ListMembers from './ListMembers/ListMembers';
// import Select from '../../Shared/Select';
import Input from '../../Shared/Input';
import Textarea from '../../Shared/Textarea';

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
  const [edited, setEdited] = useState(true);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, []);

  const handleOnSubmit = async () => {
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
        throw new Error(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setEdited(true);
    handleOnSubmit();
  };

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
    setEdited(false);
  };

  const onChangeActive = (e) => {
    setUserInput({ ...userInput, active: e.target.checked });
    setEdited(false);
  };

  const handleOnClick = () => {
    edited
      ? (window.location.href = '/projects')
      : confirm('All unsaved changes will be lost. Are you sure you want to continue?')
      ? (window.location.href = '/projects')
      : null;
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
              <Input
                label="Project Name"
                type="text"
                name="name"
                placeholder="Insert project name"
                value={userInput.name}
                onChange={onChange}
                required={true}
              />
              <Input
                label="Client"
                type="text"
                name="clientName"
                placeholder="Insert client name"
                value={userInput.clientName}
                onChange={onChange}
                required={true}
              />
              {/* <Select
                label="Active"
                name="active"
                defaultValue={userInput.active}
                onChange={onChangeActive}
                data={['True', 'False']}
                required={true}
              /> */}
              {/* <label>Active</label> */}
              <Input
                label="Active"
                name="active"
                type="checkbox"
                checked={userInput.active}
                onChange={onChangeActive}
              />
              <Input
                label="Start Date"
                type="date"
                name="startDate"
                value={onAdd ? userInput.startDate : userInput.startDate.slice(0, 10)}
                onChange={onChange}
                required={true}
              />
              <Input
                label="End Date"
                type="date"
                name="endDate"
                value={onAdd ? userInput.endDate : userInput.endDate.slice(0, 10)}
                onChange={onChange}
                required={true}
              />
            </div>
            <div className={styles.divcontainer}>
              <Textarea
                label="Description"
                name="description"
                value={userInput.description}
                placeholder="Add a description of the project"
                onChange={onChange}
                required={true}
              />
              <div>
                <ListMembers project={project} onAdd={onAdd} edited={edited} />
              </div>
            </div>
          </div>
          <div className={styles.buttons}>
            <input type="submit" value="Submit" onSubmit={onSubmit} />
          </div>
          <a onClick={() => handleOnClick()} className={styles.goBack}>
            Go back
          </a>
        </form>
      </div>
    </>
  );
};
export default ProjectForm;
