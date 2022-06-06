import { useEffect, useState } from 'react';
import Input from '../Input';
import SuccessModal from '../SuccessModal';
import styles from './form.module.css';

const Form = (props) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [employeeInput, setEmployeeInput] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    active: true,
    isProjectManager: false,
    projects: [],
    timeSheets: []
  });

  useEffect(() => {
    if (
      props.edit &&
      props.employeeId &&
      employeeInput.firstName === '' &&
      employeeInput.lastName === '' &&
      employeeInput.password === ''
    ) {
      fetch(`${process.env.REACT_APP_API_URL}/api/employees/${props.employeeId}`)
        .then((response) => response.json())
        .then((response) => {
          setEmployeeInput({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            phone: response.data.phone,
            email: response.data.email,
            password: response.data.password,
            active: response.data.active,
            isProjectManager: response.data.isProjectManager,
            projects: response.data.projects.map((x) => x._id),
            timeSheets: response.data.timeSheets.map((x) => x._id)
          });
        });
    }
  }, []);

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const onChange = (event) => {
    setEmployeeInput({ ...employeeInput, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (props.edit) {
      fetch(`${process.env.REACT_APP_API_URL}/api/employees/${props.employeeId}`, {
        method: 'PUT',
        body: JSON.stringify({
          firstName: employeeInput.firstName,
          lastName: employeeInput.lastName,
          phone: employeeInput.phone,
          email: employeeInput.email,
          password: employeeInput.password,
          active: employeeInput.active,
          isProjectManager: employeeInput.isProjectManager,
          projects:
            employeeInput.projects.length === 0
              ? []
              : employeeInput.projects.toString().replace(/\s+/g, '').split(','),
          timeSheets:
            employeeInput.timeSheets.length === 0
              ? []
              : employeeInput.timeSheets.toString().replace(/\s+/g, '').split(',')
        }),
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((response) => {
          setSuccessMessage(response);
        });
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/api/employees/`, {
        method: 'POST',
        body: JSON.stringify({
          firstName: employeeInput.firstName,
          lastName: employeeInput.lastName,
          phone: employeeInput.phone,
          email: employeeInput.email,
          password: employeeInput.password,
          active: employeeInput.active,
          isProjectManager: employeeInput.isProjectManager,
          projects:
            employeeInput.projects.length === 0
              ? []
              : employeeInput.projects.toString().replace(/\s+/g, '').split(','),
          timeSheets:
            employeeInput.timeSheets.length === 0
              ? []
              : employeeInput.timeSheets.toString().replace(/\s+/g, '').split(',')
        }),
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((response) => {
          setSuccessMessage(response);
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
      <div className={styles.select}>
        <label>Active?</label>
        <select name="active" value={employeeInput.active} onChange={onChange}>
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </select>
      </div>
      <div className={styles.select}>
        <label>Is Project Manager?</label>
        <select name="isProjectManager" value={employeeInput.isProjectManager} onChange={onChange}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <Input
        label="Projects (separate IDs with a comma)"
        name="projects"
        placeholder=""
        value={employeeInput.projects}
        onChange={onChange}
      />
      <Input
        label="Timesheets (separate IDs with a comma)"
        name="timeSheets"
        placeholder=""
        value={employeeInput.timeSheets}
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
      <SuccessModal
        show={showSuccessModal}
        closeModal={closeSuccessModal}
        closeModalForm={props.closeModalForm}
        successResponse={successMessage}
        edit={props.edit}
      />
    </form>
  );
};

export default Form;
