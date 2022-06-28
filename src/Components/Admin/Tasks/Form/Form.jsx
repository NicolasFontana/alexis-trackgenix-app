import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from 'redux/tasks/thunks';
import { ButtonText, Input, Select, ErrorSuccessModal } from 'Components/Shared';
import styles from './form.module.css';

const Form = ({ closeModalForm }) => {
  const dispatch = useDispatch();

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [userInput, setUserInput] = useState({
    taskName: '',
    startDate: '',
    workedHours: '',
    description: '',
    status: ''
  });

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    dispatch(addTask(userInput, (response) => setMessage(response))).then(() => {
      setShowMessageModal(true);
    });
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
      />
      <Input
        label="Start Date"
        type="date"
        name="startDate"
        value={userInput.startDate}
        onChange={onChange}
        required={true}
      />
      <Input
        label="Worked Hours"
        type="text"
        name="workedHours"
        placeholder="Insert hours"
        value={userInput.workedHours}
        onChange={onChange}
        required={true}
      />
      <Input
        label="Description"
        type="text"
        name="description"
        placeholder="Insert description"
        value={userInput.description}
        onChange={onChange}
        required={true}
      />
      <Select
        label="Status"
        name="status"
        value={userInput.status}
        onChange={onChange}
        title="Choose status"
        data={['To do', 'In progress', 'Review', 'Blocked', 'Done', 'Cancelled']}
        required={true}
      />
      <ButtonText
        clickAction={() => {
          onSubmit();
        }}
        label="Submit"
      ></ButtonText>
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

export default Form;
