import { useState } from 'react';
import Input from '../../Shared/Input';
import Select from '../../Shared/Select';
import Button from '../../Shared/Buttons/ButtonText';
import styles from './edit.module.css';
import { useDispatch } from 'react-redux';
import { editTask } from '../../../redux/tasks/thunks';

const Edit = ({ task, closeModalForm }) => {
  const dispatch = useDispatch();
  console.log(task);

  const [userInput, setUserInput] = useState({
    taskName: task.taskName,
    startDate: task.startDate,
    workedHours: task.workedHours,
    description: task.description,
    status: task.status
  });

  const onChange = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    console.log(userInput);
    dispatch(editTask(userInput, task._id));
    closeModalForm();
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
      <Button clickAction={closeModalForm} label="Cancel">
        Cancel
      </Button>
      <Button clickAction={onSubmit} label="Submit">
        Submit
      </Button>
    </form>
  );
};

export default Edit;
