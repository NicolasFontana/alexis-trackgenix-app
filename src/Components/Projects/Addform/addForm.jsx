import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../../../redux/projects/thunks';
import Button from '../../Shared/Buttons/ButtonText';
import ModalErrorSuccess from '../../Shared/ErrorSuccessModal';
import Input from '../../Shared/Input';
import Textarea from '../../Shared/Textarea';
import styles from './add.form.module.css';

const AddForm = ({ closeModalForm }) => {
  const dispatch = useDispatch();
  const [showModalErrorSuccess, setModalErrorSuccess] = useState(false);
  //const [message, setMessage] = useState('');
  const [userInput, setUserInput] = useState({
    name: '',
    startDate: '',
    endDate: '',
    clientName: '',
    active: true,
    description: ''
  });

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    dispatch(addProject(userInput));
    setModalErrorSuccess(true);
  };

  const onChangeCheckBox = (e) => {
    setUserInput({ ...userInput, active: e.target.checked });
  };

  const closeModalErrorSuccess = () => {
    setModalErrorSuccess(false);
  };

  return (
    <>
      <form className={styles.form}>
        <div className={styles.container}></div>
        <Input
          label="Project Name"
          type="text"
          name="name"
          placeholder="Insert project name"
          value={userInput.name}
          onChange={onChange}
          required={true}
        />
        <Input
          label="Client"
          type="text"
          name="clientName"
          placeholder="Insert client name"
          value={userInput.clientName}
          onChange={onChange}
          required={true}
        />
        <Input
          label="Active"
          name="active"
          type="checkbox"
          checked={userInput.active}
          onChange={onChangeCheckBox}
        />
        <Input
          label="Start Date"
          type="date"
          name="startDate"
          value={userInput.startDate.slice(0, 10)}
          onChange={onChange}
          required={true}
        />
        <Input
          label="End Date"
          type="date"
          name="endDate"
          value={userInput.endDate.slice(0, 10)}
          onChange={onChange}
          required={true}
        />

        <Textarea
          label="Description"
          name="description"
          value={userInput.description}
          placeholder="Add a description of the project"
          onChange={onChange}
          required={true}
        />
        <div className={styles.buttons}>
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
              setModalErrorSuccess(true);
            }}
            label="Submit"
          >
            Submit
          </Button>
        </div>
        <ModalErrorSuccess
          show={showModalErrorSuccess}
          closeModal={closeModalErrorSuccess}
          closeModalForm={closeModalForm}
          successResponse={'message'}
        />
      </form>
    </>
  );
};

export default AddForm;
