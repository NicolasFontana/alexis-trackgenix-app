import { useState } from 'react';
import Input from '../../Shared/Input';
import Select from '../../Shared/Select';
import Button from '../../Shared/Buttons/ButtonText';
// import MessageModal from '../../Shared/ErrorSuccessModal';
import styles from './form.module.css';
import { useDispatch } from 'react-redux';
import { addTask } from '../../../redux/tasks/thunks';

const Form = ({ closeModalForm }) => {
  const dispatch = useDispatch();

  // const [showMessageModal, setShowMessageModal] = useState(false);
  // const [message, setMessage] = useState('');
  const [userInput, setUserInput] = useState({
    taskName: '',
    startDate: '',
    workedHours: '',
    description: '',
    status: ''
  });

  const onChange = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    await sendInfo();
    // setShowMessageModal(true);
  };

  const sendInfo = () => {
    dispatch(addTask(userInput));
    // setMessage(response); No se que mandarle a ese modal :(
  };

  // const closeMessageModal = () => {
  //   setShowMessageModal(false);
  // };

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
      {/* <MessageModal
        show={showMessageModal}
        closeModal={closeMessageModal}
        closeModalForm={closeModalForm}
        successResponse={message}
      /> */}
    </form>
  );
};

export default Form;
