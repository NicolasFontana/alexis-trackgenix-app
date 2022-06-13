import { useState } from 'react';
import Input from '../../Shared/Input';
import Select from '../../Shared/Select';
import Button from '../../Shared/Buttons/ButtonText';
import MessageModal from '../../Shared/ErrorSuccessModal';
import styles from './form.module.css';

const Form = ({ closeModalForm }) => {
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

  const onSubmit = async (e) => {
    e.preventDefault();
    await sendInfo();
    setShowMessageModal(true);
  };

  const sendInfo = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/api/tasks/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInput)
    })
      .then((response) => response.json())
      .then((response) => {
        setMessage(response);
      });
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
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
        data={['To do', 'In progress', 'Review', 'Bloqued', 'Done', 'Cancelled']}
        required={true}
      />
      <Button
        clickAction={() => {
          closeModalForm();
        }}
        label="Cancel"
      >
        Cancel
      </Button>
      <Button
        clickAction={() => {
          onSubmit();
        }}
        label="Submit"
      >
        Submit
      </Button>
      <MessageModal
        show={showMessageModal}
        closeModal={closeMessageModal}
        closeModalForm={closeModalForm}
        successResponse={message}
      />
    </form>
  );
};

export default Form;
