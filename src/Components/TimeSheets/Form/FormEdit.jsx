import { useEffect, useState } from 'react';
import styles from './FormEdit.module.css';
import Select from '../../Shared/Select';
import ButtonText from '../../Shared/Buttons/ButtonText';
import SuccessModal from '../../Shared/ErrorSuccessModal/index';

const EditItem = ({ show, closeForm, previewTimeSheet, setShowModal, setShowTitle }) => {
  if (!show) {
    return null;
  }

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [listTask, setListTask] = useState([]);
  const [listProject, setListProject] = useState([]);
  const [task, setTask] = useState(previewTimeSheet.Task[0].taskId._id);
  const [projectId, setProjectId] = useState(previewTimeSheet.projectId._id);
  const [approved, setApproved] = useState(previewTimeSheet.approved);

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

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

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
        Task: [{ taskId: task }],
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
      setSuccessMessage('Time Sheet edited Successfully');
      setShowModal(true);
      return response.json();
    });
  };

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <Select
        label="Project"
        name="project"
        value={projectId}
        onChange={(e) => {
          setProjectId(e.target.value);
        }}
        {...listProject.map((project) => (
          <option key={project._id} value={project._id}>
            {project.name}
          </option>
        ))}
      />
      <Select
        label="Task"
        name="Task"
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
        }}
        {...listTask.map((task) => (
          <option key={task._id} value={task._id}>
            {task.taskName}
          </option>
        ))}
      />
      <Select
        label="Approved"
        name="approved"
        value={approved}
        onChange={(e) => {
          setApproved(e.target.value);
        }}
        title="Define condition"
        data={['Approved', 'Disapproved']}
        required={true}
      />
      <ButtonText
        clickAction={() => {
          onSubmit();
          setShowSuccessModal(true);
        }}
        label="Confirm"
      />
      <SuccessModal
        show={showSuccessModal}
        closeModal={closeSuccessModal}
        closeModalForm={closeForm}
        successResponse={successMessage}
      />
    </form>
  );
};

export default EditItem;
