import React from 'react';
import { useState, useEffect } from 'react';
import styles from './edit.module.css';
import ButtonText from '../../../Shared/Buttons/ButtonText';
import Input from '../../../Shared/Input';
import SuccessModal from '../../../Shared/ErrorSuccessModal/index';
import { useDispatch } from 'react-redux';
import { updateEmployee } from '../../../../redux/employees/thunks';

const EmployeeFormEdit = ({ employeeEdit, closeModalForm }) => {
  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');
  const [employeeInput, setEmployeeInput] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    active: '',
    isProjectManager: '',
    projects: [],
    timeSheets: [],
    address: '',
    picture: '',
    dni: '',
    dateBirth: ''
  });

  useEffect(() => {
    setEmployeeInput({
      firstName: employeeEdit.firstName,
      lastName: employeeEdit.lastName,
      phone: employeeEdit.phone,
      email: employeeEdit.email,
      password: employeeEdit.password,
      active: employeeEdit.active,
      isProjectManager: employeeEdit.isProjectManager,
      projects: employeeEdit.projects.map((x) => x._id),
      timeSheets: employeeEdit.timeSheets.map((x) => x._id),
      address: employeeEdit.address,
      picture: employeeEdit.picture,
      dni: employeeEdit.dni,
      dateBirth: employeeEdit.dateBirth
    });
  }, []);

  const submitEdit = async () => {
    // let editedEmployee = JSON.stringify({
    //   firstName: employeeInput.firstName,
    //   lastName: employeeInput.lastName,
    //   phone: employeeInput.phone,
    //   email: employeeInput.email,
    //   password: employeeInput.password,
    //   active: employeeInput.active,
    //   isProjectManager: employeeInput.isProjectManager,
    //   projects: employeeInput.projects,
    //   timeSheets: employeeInput.timeSheets,
    //   address: employeeInput.address,
    //   picture: employeeInput.picture,
    //   dni: employeeInput.dni,
    //   dateBirth: employeeInput.dateBirth
    // });
    if (
      employeeInput.firstName === employeeEdit.firstName &&
      employeeInput.lastName === employeeEdit.lastName &&
      employeeInput.phone === employeeEdit.phone &&
      employeeInput.email === employeeEdit.email &&
      employeeInput.password === employeeEdit.password &&
      employeeInput.address === employeeEdit.address &&
      employeeInput.picture === employeeEdit.picture &&
      employeeInput.dni === employeeEdit.dni &&
      employeeInput.dateBirth === employeeEdit.dateBirth
    ) {
      setResponse({ message: "There haven't been any changes", data: {}, error: true });
      setShowSuccessModal(true);
    } else {
      // console.log(editedEmployee);
      dispatch(updateEmployee(employeeInput, employeeEdit._id, setResponse)).then(() =>
        setShowSuccessModal(true)
      );
    }
  };

  const onChange = (e) => {
    setEmployeeInput({ ...employeeInput, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <form className={styles.formBody}>
        <Input
          label="First Name"
          type="text"
          name="firstName"
          placeholder="Insert first name"
          value={employeeInput.firstName}
          onChange={onChange}
        />
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Insert last name"
          value={employeeInput.lastName}
          onChange={onChange}
        />
        <Input
          label="Phone"
          type="text"
          name="phone"
          placeholder="Insert phone"
          value={employeeInput.phone}
          onChange={onChange}
        />
        <Input
          label="Email"
          type="text"
          name="email"
          placeholder="Insert email"
          value={employeeInput.email}
          onChange={onChange}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Insert password"
          value={employeeInput.password}
          onChange={onChange}
        />
        <Input
          label="Address"
          type="text"
          name="address"
          placeholder="Insert address"
          value={employeeInput.address}
          onChange={onChange}
        />
        <Input
          label="Picture link"
          type="text"
          name="picture"
          placeholder="Insert picture link"
          value={employeeInput.picture}
          onChange={onChange}
        />
        <Input
          label="DNI"
          type="text"
          name="dni"
          placeholder="Insert DNI"
          value={employeeInput.dni}
          onChange={onChange}
        />
        <Input
          label="Date of birth"
          type="date"
          name="dateBirth"
          placeholder="Insert date of birth"
          value={employeeInput.dateBirth}
          onChange={onChange}
        />
        <div className={styles.buttonBox}>
          <ButtonText clickAction={closeModalForm} label="Cancel"></ButtonText>
          <ButtonText clickAction={submitEdit} label="Edit"></ButtonText>
        </div>
        <SuccessModal
          show={showSuccessModal}
          closeModal={() => {
            setShowSuccessModal(false);
          }}
          closeModalForm={closeModalForm}
          successResponse={response}
        />
      </form>
    </div>
  );
};

export default EmployeeFormEdit;
