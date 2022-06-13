import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Select from '../../Shared/Select';
import ButtonText from '../../Shared/Buttons/ButtonText';
import SuccessModal from '../../Shared/ErrorSuccessModal/index';

const Form = ({ closeModalForm, edit, itemId }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
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

  useEffect(() => {
    if (edit && itemId) {
      fetch(`${process.env.REACT_APP_API_URL}/api/employees/${itemId}`)
        .then((response) => response.json())
        .then((response) => {
          setEmployeeInput({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            phone: response.data.phone,
            email: response.data.email,
            password: response.data.password,
            active: response.data.active === true ? 'Active' : 'Inactive',
            isProjectManager: response.data.isProjectManager === true ? 'Yes' : 'No',
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

  const onSubmit = () => {
    if (edit) {
      fetch(`${process.env.REACT_APP_API_URL}/api/employees/${itemId}`, {
        method: 'PUT',
        body: JSON.stringify({
          firstName: employeeInput.firstName,
          lastName: employeeInput.lastName,
          phone: employeeInput.phone,
          email: employeeInput.email,
          password: employeeInput.password,
          active: employeeInput.active === 'Active' ? true : false,
          isProjectManager: employeeInput.isProjectManager === 'Yes' ? true : false,
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
          active: employeeInput.active === 'Active' ? true : false,
          isProjectManager: employeeInput.isProjectManager === 'Yes' ? true : false,
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
        type="text"
        value={employeeInput.firstName}
        onChange={onChange}
        placeholder="Juan"
      />
      <Input
        label="Last Name"
        name="lastName"
        type="text"
        value={employeeInput.lastName}
        onChange={onChange}
        placeholder="Perez"
      />
      <Input
        label="Phone"
        name="phone"
        type="text"
        value={employeeInput.phone}
        onChange={onChange}
        placeholder="123456789"
      />
      <Input
        label="Email"
        name="email"
        type="text"
        value={employeeInput.email}
        onChange={onChange}
        placeholder="juanperez@gmail.com"
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={employeeInput.password}
        onChange={onChange}
        placeholder="********"
      />
      <Select
        label="Active?"
        name="active"
        value={employeeInput.active}
        onChange={onChange}
        title="Define condition"
        data={['Active', 'Inactive']}
        required={true}
      />
      <Select
        label="Is a Project Manager?"
        name="isProjectManager"
        value={employeeInput.isProjectManager}
        onChange={onChange}
        title="Define PM condition"
        data={['Yes', 'No']}
        required={true}
      />
      <Input
        label="Projects (separate IDs with a comma)"
        name="projects"
        type="text"
        value={employeeInput.projects}
        onChange={onChange}
        placeholder=""
      />
      <Input
        label="Timesheets (separate IDs with a comma)"
        name="timeSheets"
        type="text"
        value={employeeInput.timeSheets}
        onChange={onChange}
        placeholder=""
      />
      <ButtonText
        clickAction={() => {
          onSubmit();
          setShowSuccessModal(true);
        }}
        label="Confirm"
      />
      <SuccessModal
        show={showSuccessModal}
        closeModal={closeSuccessModal}
        closeModalForm={closeModalForm}
        successResponse={successMessage}
      />
    </form>
  );
};

export default Form;
