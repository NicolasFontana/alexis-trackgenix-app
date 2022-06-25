import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { putTimesheet } from 'redux/time-sheets/thunks';
import { Select, ButtonText, ErrorSuccessModal, Input } from 'Components/Shared';
import styles from './form.module.css';

const FormEdit = ({ closeModalEdit, timesheetItem }) => {
  const dispatch = useDispatch();
  const [listTask, setListTask] = useState([]);
  const [listProject, setListProject] = useState([]);
  const [message, setMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [userInput, setUserInput] = useState({
    projectId: timesheetItem.projectId._id,
    task: timesheetItem.Task[0].taskId._id,
    approved: true
  });

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
    dispatch(putTimesheet(userInput, timesheetItem._id, setMessage));
    setShowMessageModal(true);
  };

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onChangeApproved = (e) => {
    setUserInput({ ...userInput, active: e.target.checked });
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  return (
    <form className={styles.form}>
      <Select
        label="Projects"
        name="projectId"
        value={userInput.projectId}
        onChange={onChange}
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
        value={userInput.task}
        onChange={onChange}
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
        checked={userInput.active}
        onChange={onChangeApproved}
        title="Approve"
        type="checkbox"
        required={true}
        register={console.log}
      />
      <ButtonText
        clickAction={() => {
          closeModalEdit();
        }}
        label="Cancel"
      >
        Cancel
      </ButtonText>
      <ButtonText
        clickAction={() => {
          onSubmit();
        }}
        label="Edit"
      />
      <ErrorSuccessModal
        show={showMessageModal}
        closeModal={closeMessageModal}
        closeModalForm={closeModalEdit}
        successResponse={message}
      />
    </form>
  );
};

export default FormEdit;
