import { useState, useEffect } from 'react';
import styles from './form.module.css';
import ListMembers from './ListMembers/ListMembers';
import Preloader from '../../Shared/Preloader/Preloader';
import Input from '../../Shared/Input';
import Textarea from '../../Shared/Textarea';
import ButtonText from '../../Shared/Buttons/ButtonText';

const ProjectForm = ({ edit, itemId, functionValue, closeModalForm }) => {
  const [userInput, setUserInput] = useState({
    name: '',
    startDate: '',
    endDate: '',
    clientName: '',
    active: true,
    description: ''
  });
  const [project, saveProjects] = useState([]);
  const [edited, setEdited] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (edit) {
        try {
          const getProject = await fetch(`${process.env.REACT_APP_API_URL}/api/projects/${itemId}`);
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
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, []);

  const handleOnSubmit = async () => {
    let url = `${process.env.REACT_APP_API_URL}/api/projects`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInput)
    };
    if (edit) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API_URL}/api/projects/${itemId}`;
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
    setEdited(false);
    handleOnClick();
  };

  const onSubmit = () => {
    edited
      ? handleOnSubmit()
      : (setEdited(false), alert('No input changed. The project stayed the same'));
  };

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
    setEdited(true);
  };

  const onChangeActive = (e) => {
    setUserInput({ ...userInput, active: e.target.checked });
    setEdited(true);
  };

  const handleOnClick = () => {
    edited
      ? confirm('All unsaved changes will be lost. Are you sure you want to continue?')
        ? closeModalForm()
        : null
      : closeModalForm();
  };

  return isLoading ? (
    <Preloader>
      <p>Loading projects</p>
    </Preloader>
  ) : (
    <>
      <form onSubmit={onSubmit} className={styles.container}>
        <div className={!edit ? styles.maincontainer.add : styles.maincontainer}>
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
              value={!edit ? userInput.startDate : userInput.startDate.slice(0, 10)}
              onChange={onChange}
              required={true}
            />
            <Input
              label="End Date"
              type="date"
              name="endDate"
              value={!edit ? userInput.endDate : userInput.endDate.slice(0, 10)}
              onChange={onChange}
              required={true}
            />
          </div>
          <div className={styles.larger}>
            <Textarea
              label="Description"
              name="description"
              value={userInput.description}
              placeholder="Add a description of the project"
              onChange={onChange}
              required={true}
            />
            <div>
              <ListMembers
                project={project}
                onAdd={!edit}
                edited={edited}
                functionValue={functionValue}
              />
            </div>
          </div>
        </div>
        <div>
          <ButtonText
            clickAction={function () {
              onSubmit();
            }}
            label="Submit"
          ></ButtonText>
          <ButtonText
            clickAction={function () {
              handleOnClick();
            }}
            label="Close"
          ></ButtonText>
        </div>
      </form>
    </>
  );
};
export default ProjectForm;
