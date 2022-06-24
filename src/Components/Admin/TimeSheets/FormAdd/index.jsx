import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTimesheet } from 'redux/time-sheets/thunks';
import { Input, Select, ButtonText, ErrorSuccessModal } from 'Components/Shared';
import styles from './form.module.css';

const FormAdd = ({ closeModalForm }) => {
  const dispatch = useDispatch();
  const [listTask, setListTask] = useState([]);
  const [listProject, setListProject] = useState([]);
  const [task, setTask] = useState('');
  const [projectId, setProjectId] = useState('');
  const [approved, setApproved] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);

  const fetchTask = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`);
      const data = await response.json();
      setListTask(...listTask, data.data);
    } catch (error) {
      console.error(error);
    }
  };

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
    fetchTask();
    fetchProject();
  }, []);

  const onSubmit = () => {
    dispatch(createTimesheet(projectId, task, approved, setMessage)).then(() => {
      setShowMessageModal(true);
    });
  };

  const onChangeProject = (e) => {
    setProjectId(e.target.value);
  };

  const handleSelectedTask = (e) => {
    setTask(e.target.value);
  };

  const onChangeApproved = (e) => {
    setApproved(e.target.checked);
  };

  return (
    <form className={styles.form}>
      <Select
        label="Projects"
        name="project"
        value={projectId}
        onChange={onChangeProject}
        title="Choose project"
        data={listProject.map((project) => ({
          _id: project._id,
          optionText: project.name
        }))}
        required={true}
        register={console.log}
      />
      <Select
        label="Tasks"
        name="task"
        value={task}
        onChange={handleSelectedTask}
        title="Choose task"
        data={listTask.map((task) => ({
          _id: task._id,
          optionText: task.taskName
        }))}
        required={true}
        register={console.log}
      />
      <Input
        label="Approved"
        name="approved"
        type="checkbox"
        checked={approved}
        onChange={onChangeApproved}
        register={console.log}
      />
      <ButtonText
        clickAction={() => {
          closeModalForm();
        }}
        label="Cancel"
      />
      <ButtonText
        clickAction={() => {
          onSubmit();
        }}
        label="Create"
      />
      <ErrorSuccessModal
        show={showMessageModal}
        closeModal={() => {
          setShowMessageModal(false);
        }}
        closeModalForm={closeModalForm}
        successResponse={message}
      />
    </form>
  );
};

export default FormAdd;
