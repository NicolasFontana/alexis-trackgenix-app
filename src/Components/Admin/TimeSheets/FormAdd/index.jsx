import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTimesheet } from 'redux/time-sheets/thunks';
import { getTasks } from 'redux/tasks/thunks';
import { getProjects } from 'redux/projects/thunks';
import { Input, Select, ButtonText, ErrorSuccessModal } from 'Components/Shared';
import styles from './form.module.css';

const FormAdd = ({ closeModalForm }) => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.list);
  const tasks = useSelector((state) => state.tasks.list);

  const [task, setTask] = useState('');
  const [projectId, setProjectId] = useState('');
  const [approved, setApproved] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getProjects());
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
        data={projects.map((project) => ({
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
        data={tasks.map((task) => ({
          _id: task._id,
          optionText: task.taskName
        }))}
        required={true}
      />
      <Input
        label="Approved"
        name="approved"
        type="checkbox"
        checked={approved}
        onChange={onChangeApproved}
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
