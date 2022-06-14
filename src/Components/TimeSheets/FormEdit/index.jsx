import { useState, useEffect } from 'react';
import styles from './FormEdit.module.css';
import Select from '../../Shared/Select/index';
import ButtonText from '../../Shared/Buttons/ButtonText/index';
import ResponseModal from '../../Shared/ErrorSuccessModal/index';

const FormEdit = ({ closeModalEdit, timeSheet, timeSheetId }) => {
  const [listTask, setListTask] = useState([]);
  const [listProject, setListProject] = useState([]);
  const [message, setMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [userInput, setUserInput] = useState({
    projectId: timeSheet.projectId,
    task: timeSheet.task,
    approved: timeSheet.approved
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
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        projectId: userInput.projectId,
        Task: [{ taskId: userInput.task }],
        approved: userInput.approved
      })
    };
    const url = `${process.env.REACT_APP_API_URL}/api/time-sheets/${timeSheetId}`;

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        setMessage(response);
      });
    setShowMessageModal(true);
  };

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onChangeApproved = (e) => {
    setUserInput({ ...userInput, approved: e.target.value == 'true' ? true : false });
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
      />
      <Select
        label="Approved"
        name="approved"
        defaultValue={userInput.approved}
        onChange={onChangeApproved}
        title="Approve"
        data={['true', 'false']}
        required={true}
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
        label="Submit"
      />
      <ResponseModal
        show={showMessageModal}
        closeModal={closeMessageModal}
        closeModalForm={closeModalEdit}
        successResponse={message}
      />
    </form>
  );
};

export default FormEdit;
