import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEmployee, updateEmployee } from '../../../redux/employees/thunks';
import styles from './form.module.css';
// import Preloader from '../../Shared/Preloader/Preloader';
import Input from '../../Shared/Input';
import Select from '../../Shared/Select';
import ButtonText from '../../Shared/Buttons/ButtonText';
import SuccessModal from '../../Shared/ErrorSuccessModal/index';

const Form = ({ closeModalForm, edit, item }) => {
  const dispatch = useDispatch();
  // const isLoading = useSelector((state) => state.employees.isLoading);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');
  const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    active: '',
    isProjectManager: '',
    projects: [],
    timeSheets: []
  });

  useEffect(() => {
    if (edit && item._id) {
      setUserInput({
        firstName: item.firstName,
        lastName: item.lastName,
        phone: item.phone,
        email: item.email,
        password: item.password,
        active: item.active === true ? 'Active' : 'Inactive',
        isProjectManager: item.isProjectManager === true ? 'Yes' : 'No',
        projects: item.projects.map((x) => x._id),
        timeSheets: item.timeSheets.map((x) => x._id)
      });
    }
  }, []);

  const onChange = (event) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value });
  };

  const onSubmit = () => {
    if (edit) {
      dispatch(updateEmployee(userInput, item._id, setResponse)).then(() => {
        setShowSuccessModal(true);
      });
    } else {
      dispatch(createEmployee(userInput, setResponse)).then(() => {
        setShowSuccessModal(true);
      });
    }
  };

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <Input
        label="First Name"
        name="firstName"
        type="text"
        value={userInput.firstName}
        onChange={onChange}
        placeholder="Juan"
      />
      <Input
        label="Last Name"
        name="lastName"
        type="text"
        value={userInput.lastName}
        onChange={onChange}
        placeholder="Perez"
      />
      <Input
        label="Phone"
        name="phone"
        type="text"
        value={userInput.phone}
        onChange={onChange}
        placeholder="123456789"
      />
      <Input
        label="Email"
        name="email"
        type="text"
        value={userInput.email}
        onChange={onChange}
        placeholder="juanperez@gmail.com"
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={userInput.password}
        onChange={onChange}
        placeholder="********"
      />
      <Select
        label="Active?"
        name="active"
        value={userInput.active}
        onChange={onChange}
        title="Define condition"
        data={['Active', 'Inactive']}
        required={true}
      />
      <Select
        label="Is a Project Manager?"
        name="isProjectManager"
        value={userInput.isProjectManager}
        onChange={onChange}
        title="Define PM condition"
        data={['Yes', 'No']}
        required={true}
      />
      <Input
        label="Projects (separate IDs with a comma)"
        name="projects"
        type="text"
        value={userInput.projects}
        onChange={onChange}
        placeholder=""
      />
      <Input
        label="Timesheets (separate IDs with a comma)"
        name="timeSheets"
        type="text"
        value={userInput.timeSheets}
        onChange={onChange}
        placeholder=""
      />
      <ButtonText
        clickAction={() => {
          onSubmit();
        }}
        label={edit ? 'Edit' : 'Create'}
      />
      <SuccessModal
        show={showSuccessModal}
        closeModal={() => {
          setShowSuccessModal(false);
        }}
        closeModalForm={closeModalForm}
        successResponse={response}
      />
    </form>
  );
};

export default Form;
