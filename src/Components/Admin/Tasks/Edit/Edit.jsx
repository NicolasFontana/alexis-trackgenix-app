import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from 'redux/tasks/thunks';
import { ButtonText, Select, Input, ErrorSuccessModal } from 'Components/Shared';
import styles from './edit.module.css';

const Edit = ({ task, closeModalForm }) => {
  const dispatch = useDispatch();

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [userInput, setUserInput] = useState({
    taskName: task.taskName,
    startDate: task.startDate,
    workedHours: task.workedHours,
    description: task.description,
    status: task.status
  });

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (
      userInput.taskName === task.taskName &&
      userInput.startDate === task.startDate &&
      userInput.workedHours === task.workedHours &&
      userInput.description === task.description
    ) {
      setMessage({ message: "There haven't been any changes", data: {}, error: true });
      setShowMessageModal(true);
    } else {
      dispatch(editTask(userInput, task._id, (response) => setMessage(response))).then(() => {
        setShowMessageModal(true);
      });
    }
  };

  return (
    <form className={styles.form}>
      <Input
        label="Task Name"
        type="text"
        name="taskName"
        placeholder="Insert task name"
        value={userInput.taskName}
        onChange={onChange}
        required={true}
        register={console.log}
      />
      <Input
        label="Start Date"
        type="date"
        name="startDate"
        value={userInput.startDate.substring(0, 10)}
        onChange={onChange}
        required={true}
        register={console.log}
      />
      <Input
        label="Worked Hours"
        type="text"
        name="workedHours"
        placeholder="Insert hours"
        value={userInput.workedHours}
        onChange={onChange}
        required={true}
        register={console.log}
      />
      <Input
        label="Description"
        type="text"
        name="description"
        placeholder="Insert description"
        value={userInput.description}
        onChange={onChange}
        required={true}
        register={console.log}
      />
      <Select
        label="Status"
        name="status"
        value={userInput.status}
        onChange={onChange}
        title="Choose status"
        data={['To do', 'In progress', 'Review', 'Blocked', 'Done', 'Cancelled']}
        required={true}
        register={console.log}
      />
      <ButtonText clickAction={closeModalForm} label="Cancel">
        Cancel
      </ButtonText>
      <ButtonText clickAction={onSubmit} label="Submit">
        Submit
      </ButtonText>
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

export default Edit;
