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
  const [message, setMessage] = useState('');
  const [newProject, setNewProject] = useState({
    name: '',
    startDate: '',
    endDate: '',
    clientName: '',
    active: true,
    description: ''
  });

  const onSubmit = async () => {
    dispatch(addProject(newProject, (message) => setMessage(message))).then(() => {
      setModalErrorSuccess(true);
    });
  };

  const onChangeCheckBox = (e) => {
    setNewProject({ ...newProject, active: e.target.checked });
  };
  const onChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <Input
            label="Project Name"
            type="text"
            name="name"
            placeholder="Insert project name"
            value={newProject.name}
            onChange={onChange}
            required={true}
          />
          <Input
            label="Client"
            type="text"
            name="clientName"
            placeholder="Insert client name"
            value={newProject.clientName}
            onChange={onChange}
            required={true}
          />
          <Input
            label="Active"
            name="active"
            type="checkbox"
            checked={newProject.active}
            onChange={onChangeCheckBox}
          />
          <Input
            label="Start Date"
            type="date"
            name="startDate"
            value={newProject.startDate.slice(0, 10)}
            onChange={onChange}
            required={true}
          />
          <Input
            label="End Date"
            type="date"
            name="endDate"
            value={newProject.endDate.slice(0, 10)}
            onChange={onChange}
            required={true}
          />

          <Textarea
            label="Description"
            name="description"
            value={newProject.description}
            placeholder="Add a description of the project"
            onChange={onChange}
            required={true}
          />
        </form>
        <div className={styles.buttons}>
          <Button
            clickAction={() => {
              closeModalForm();
            }}
            label="Cancel"
          ></Button>
          <Button
            clickAction={() => {
              onSubmit();
            }}
            label="Create"
          ></Button>
        </div>
        <ModalErrorSuccess
          show={showModalErrorSuccess}
          closeModal={() => {
            setModalErrorSuccess(false);
          }}
          closeModalForm={closeModalForm}
          successResponse={message}
        />
      </div>
    </>
  );
};

export default AddForm;
