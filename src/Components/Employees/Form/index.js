import { useState } from 'react';
import Input from '../Input';
import SuccessModal from '../SuccessModal';
import styles from './form.module.css';

const Form = (props) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  const [employeeInput, setEmployeeInput] = useState({
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
  if (
    props.edit &&
    props.employee._id &&
    employeeInput.firstName === '' &&
    employeeInput.lastName === '' &&
    employeeInput.password === ''
  ) {
    setEmployeeInput({
      firstName: props.employee.firstName,
      lastName: props.employee.lastName,
      phone: props.employee.phone,
      email: props.employee.email,
      password: props.employee.password,
      active: props.employee.active,
      isProjectManager: props.employee.isProjectManager,
      projects: props.employee.projects,
      timeSheets: props.employee.timeSheets
    });
  }

  const onChange = (event) => {
    setEmployeeInput({ ...employeeInput, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (props.edit) {
      fetch(`${process.env.REACT_APP_API_URL}api/employees/${props.employee._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          firstName: employeeInput.firstName,
          lastName: employeeInput.lastName,
          phone: employeeInput.phone,
          email: employeeInput.email,
          password: employeeInput.password,
          active: employeeInput.active,
          isProjectManager: employeeInput.isProjectManager,
          projects: employeeInput.projects,
          timeSheets: employeeInput.timeSheets
        }),
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((response) => {
          setSuccessMessage(response.message);
        });
    } else {
      fetch(`${process.env.REACT_APP_API_URL}api/employees/`, {
        method: 'POST',
        body: JSON.stringify({
          firstName: employeeInput.firstName,
          lastName: employeeInput.lastName,
          phone: employeeInput.phone,
          email: employeeInput.email,
          password: employeeInput.password,
          active: employeeInput.active,
          isProjectManager: employeeInput.isProjectManager,
          projects: employeeInput.projects,
          timeSheets: employeeInput.timeSheets
        }),
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((response) => {
          setSuccessMessage(response.message);
        });
    }
  };

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <Input
        label="First Name"
        name="firstName"
        placeholder="Juan"
        value={employeeInput.firstName}
        onChange={onChange}
      />
      <Input
        label="Last Name"
        name="lastName"
        placeholder="Perez"
        value={employeeInput.lastName}
        onChange={onChange}
      />
      <Input
        label="Phone"
        name="phone"
        placeholder="123456789"
        value={employeeInput.phone}
        onChange={onChange}
      />
      <Input
        label="Email"
        name="email"
        placeholder="juanperez@gmail.com"
        value={employeeInput.email}
        onChange={onChange}
      />
      <Input
        label="Password"
        name="password"
        placeholder="********"
        value={employeeInput.password}
        onChange={onChange}
      />
      <Input
        label="Active"
        name="active"
        placeholder="true/false"
        value={employeeInput.active}
        onChange={onChange}
      />
      <Input
        label="Is Project Manager?"
        name="isProjectManager"
        placeholder="true/false"
        value={employeeInput.isProjectManager}
        onChange={onChange}
      />
      <Input
        label="Projects"
        name="projects"
        placeholder=""
        value={employeeInput.projects}
        onChange={onChange}
      />
      <Input
        label="Timesheets"
        name="timesheets"
        placeholder=""
        value={employeeInput.timesheets}
        onChange={onChange}
      />
      <button
        onClick={() => {
          setShowSuccessModal(true);
        }}
        className={styles.submitButton}
        type="submit"
      >
        Confirm
      </button>
      <SuccessModal show={showSuccessModal} closeModal={closeModal} message={successMessage} />
    </form>
  );
};

export default Form;
