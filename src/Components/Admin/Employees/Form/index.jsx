import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEmployee, updateEmployee } from 'redux/employees/thunks';
import styles from './form.module.css';
import { Input, ButtonText, ErrorSuccessModal } from 'Components/Shared';

const Form = ({ closeModalForm, edit, item }) => {
  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');
  const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    active: false,
    isProjectManager: false,
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
        active: item.active,
        isProjectManager: item.isProjectManager,
        projects: item.projects.map((x) => x._id),
        timeSheets: item.timeSheets.map((x) => x._id)
      });
    }
  }, []);

  const onChange = (event) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value });
  };

  const onChangeActive = (e) => {
    setUserInput({ ...userInput, active: e.target.checked });
  };

  const onChangePM = (e) => {
    setUserInput({ ...userInput, isProjectManager: e.target.checked });
  };

  const onSubmit = () => {
    if (edit) {
      if (
        userInput.firstName === item.firstName &&
        userInput.lastName === item.lastName &&
        userInput.phone === item.phone &&
        userInput.email === item.email &&
        userInput.password === item.password &&
        userInput.active === item.active &&
        userInput.isProjectManager === item.isProjectManager &&
        userInput.projects.toString() === item.projects.map((x) => x._id).toString() &&
        userInput.timeSheets.toString() === item.timeSheets.map((x) => x._id).toString()
      ) {
        setResponse({ message: "There haven't been any changes", data: {}, error: true });
        setShowSuccessModal(true);
      } else {
        dispatch(updateEmployee(userInput, item._id, setResponse)).then(() => {
          setShowSuccessModal(true);
        });
      }
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
      <Input
        label="Is a Project Manager?"
        name="isProjectManager"
        type="checkbox"
        checked={userInput.isProjectManager}
        onChange={onChangePM}
      />
      <Input
        label="Active"
        name="active"
        type="checkbox"
        checked={userInput.active}
        onChange={onChangeActive}
      />
      <ButtonText
        clickAction={() => {
          onSubmit();
        }}
        label={edit ? 'Edit' : 'Create'}
      />
      <ErrorSuccessModal
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
