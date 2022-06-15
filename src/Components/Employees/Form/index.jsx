import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Preloader from '../../Shared/Preloader/Preloader';
import Input from '../../Shared/Input';
import Select from '../../Shared/Select';
import ButtonText from '../../Shared/Buttons/ButtonText';
import SuccessModal from '../../Shared/ErrorSuccessModal/index';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, updateEmployee } from '../../../redux/employees/thunks';

const Form = ({ closeModalForm, edit, item }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.employees.isLoading);
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
    if (edit && item._id) {
      setEmployeeInput({
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
    setEmployeeInput({ ...employeeInput, [event.target.name]: event.target.value });
  };

  const onSubmit = () => {
    if (edit) {
      setShowSuccessModal(true);
      dispatch(
        updateEmployee(employeeInput, item._id, (successMessage) =>
          setSuccessMessage(successMessage)
        )
      );
    } else {
      setShowSuccessModal(true);
      dispatch(
        createEmployee(employeeInput, (successMessage) => setSuccessMessage(successMessage))
      );
    }
  };

  return isLoading ? (
    <Preloader />
  ) : (
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
        }}
        label="Confirm"
      />
      <SuccessModal
        show={showSuccessModal}
        closeModal={() => {
          setShowSuccessModal(false);
        }}
        closeModalForm={closeModalForm}
        successResponse={successMessage}
      />
    </form>
  );
};

export default Form;
