import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postSuperAdmins } from 'redux/super-admins/thunks';
import { ButtonText, Input, ErrorSuccessModal } from 'Components/Shared';
import styles from './add.module.css';

const SuperAdminsFormAdd = ({ closeModalForm }) => {
  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');
  const [superAdminInput, setsuperAdminInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    active: false
  });

  let newSuperAdmin = JSON.stringify({
    firstName: superAdminInput.firstName,
    lastName: superAdminInput.lastName,
    email: superAdminInput.email,
    password: superAdminInput.password,
    active: superAdminInput.active
  });

  const submitAdd = () => {
    dispatch(postSuperAdmins(newSuperAdmin, setResponse)).then(() => setShowSuccessModal(true));
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
          required={true}
        />
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Insert last name"
          value={superAdminInput.lastName}
          onChange={onChange}
          required={true}
        />
        <Input
          label="Email"
          type="text"
          name="email"
          placeholder="Insert email"
          value={superAdminInput.email}
          onChange={onChange}
          required={true}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Insert password"
          value={superAdminInput.password}
          onChange={onChange}
          required={true}
        />
        <Input
          label="Active"
          name="active"
          type="checkbox"
          checked={superAdminInput.active}
          onChange={onChangeActive}
        />
        <div className={styles.buttonBox}>
          <ButtonText clickAction={closeModalForm} label="Cancel"></ButtonText>
          <ButtonText clickAction={submitAdd} label="Create"></ButtonText>
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

export default SuperAdminsFormAdd;
