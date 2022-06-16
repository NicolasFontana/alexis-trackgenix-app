import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Select from '../../Shared/Select/index';
import ButtonText from '../../Shared/Buttons/ButtonText/index';
import ErrorSuccessModal from '../../Shared/ErrorSuccessModal/index';
import { useDispatch, useSelector } from 'react-redux';
import { createTimesheet } from '../../../redux/time-sheets/thunks';
import Preloader from '../../Shared/Preloader/Preloader';

const FormAdd = ({ closeModalForm }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.timesheets.loading);
  const [listTask, setListTask] = useState([]);
  const [listProject, setListProject] = useState([]);
  const [task, setTask] = useState('');
  const [projectId, setProjectId] = useState('');
  const [approved, setApproved] = useState('');
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

  const onSubmit = () => {
    dispatch(createTimesheet(projectId, task, approved, setMessage));
    setShowMessageModal(true);
  };

  const onChangeProject = (e) => {
    setProjectId(e.target.value);
    console.log(e.target.value);
  };

  const handleSelectedTask = (e) => {
    setTask(e.target.value);
    console.log(e.target.value);
  };

  const onChangeApproved = (e) => {
    setApproved(e.target.value);
    console.log(e.target.value);
  };

  return loading ? (
    <Preloader />
  ) : (
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
      />
      <Select
        label="Approved"
        name="approved"
        value={approved}
        onChange={onChangeApproved}
        title="Approve"
        data={['true', 'false']}
        required={true}
      />
      <ButtonText
        clickAction={() => {
          closeModalForm();
        }}
        label="Cancel"
      >
        Cancel
      </ButtonText>
      <ButtonText
        clickAction={() => {
          onSubmit();
        }}
        label="Submit"
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
