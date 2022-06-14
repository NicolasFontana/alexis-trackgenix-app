import React from 'react';
import { useState } from 'react';
import styles from './add.module.css';
import ButtonText from '../../Shared/Buttons/ButtonText';
import Input from '../../Shared/Input';
import { useDispatch } from 'react-redux';
import { postSuperAdmins } from '../../../redux/super-admins/thunks';

const SuperAdminsFormAdd = ({ closeModalForm }) => {
  const dispatch = useDispatch();
  const [superAdminInput, setsuperAdminInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    active: ''
  });

  let newSuperAdmin = JSON.stringify({
    firstName: superAdminInput.firstName,
    lastName: superAdminInput.lastName,
    email: superAdminInput.email,
    password: superAdminInput.password,
    active: superAdminInput.active
  });

  const submitAdd = () => {
    dispatch(postSuperAdmins(newSuperAdmin));
  };

  const onChange = (e) => {
    setsuperAdminInput({ ...superAdminInput, [e.target.name]: e.target.value });
  };

  const onChangeActive = (e) => {
    setsuperAdminInput({ ...superAdminInput, active: e.target.checked });
  };

  return (
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
        type="text"
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
        <ButtonText clickAction={submitAdd} label="Submit"></ButtonText>
      </div>
    </form>
  );
};

export default SuperAdminsFormAdd;
