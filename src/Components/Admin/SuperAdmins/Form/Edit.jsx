import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { putSuperAdmins } from 'redux/super-admins/thunks';
import { ButtonText, Input, ErrorSuccessModal } from 'Components/Shared';
import styles from './add.module.css';

const SuperAdminsFormEdit = ({ superAdminEdit, closeModalForm }) => {
  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');
  const [superAdminInput, setsuperAdminInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    active: ''
  });

  useEffect(() => {
    setsuperAdminInput({
      firstName: superAdminEdit.firstName,
      lastName: superAdminEdit.lastName,
      email: superAdminEdit.email,
      password: superAdminEdit.password,
      active: superAdminEdit.active
    });
  }, []);

  const submitEdit = async () => {
    let editedSuperAdmin = JSON.stringify({
      firstName: superAdminInput.firstName,
      lastName: superAdminInput.lastName,
      email: superAdminInput.email,
      password: superAdminInput.password,
      active: superAdminInput.active
    });
    if (
      superAdminInput.firstName === superAdminEdit.firstName &&
      superAdminInput.lastName === superAdminEdit.lastName &&
      superAdminInput.email === superAdminEdit.email &&
      superAdminInput.password === superAdminEdit.password &&
      superAdminInput.active === superAdminEdit.active
    ) {
      setResponse({ message: "There haven't been any changes", data: {}, error: true });
      setShowSuccessModal(true);
    } else {
      dispatch(putSuperAdmins(superAdminEdit._id, editedSuperAdmin, setResponse)).then(() =>
        setShowSuccessModal(true)
      );
    }
  };

  const onChange = (e) => {
    setsuperAdminInput({ ...superAdminInput, [e.target.name]: e.target.value });
  };

  const onChangeActive = (e) => {
    setsuperAdminInput({ ...superAdminInput, active: e.target.checked });
  };

  return (
    <div className={styles.container}>
      <form className={styles.formBody}>
        <Input
          label="First Name"
          type="text"
          name="firstName"
          placeholder="Insert first name"
          value={superAdminInput.firstName}
          onChange={onChange}
          register={console.log}
        />
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Insert last name"
          value={superAdminInput.lastName}
          onChange={onChange}
          register={console.log}
        />
        <Input
          label="Email"
          type="text"
          name="email"
          placeholder="Insert email"
          value={superAdminInput.email}
          onChange={onChange}
          register={console.log}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Insert password"
          value={superAdminInput.password}
          onChange={onChange}
          register={console.log}
        />
        <Input
          label="Active"
          name="active"
          type="checkbox"
          checked={superAdminInput.active}
          onChange={onChangeActive}
          register={console.log}
        />
        <div className={styles.buttonBox}>
          <ButtonText clickAction={closeModalForm} label="Cancel"></ButtonText>
          <ButtonText clickAction={submitEdit} label="Edit"></ButtonText>
        </div>
        <ErrorSuccessModal
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

export default SuperAdminsFormEdit;
