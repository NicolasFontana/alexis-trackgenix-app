import React from 'react';
import { useState } from 'react';
import styles from './add.module.css';
import ButtonText from '../../Shared/Buttons/ButtonText';
import Input from '../../Shared/Input';
import { useDispatch } from 'react-redux';
import { addAdmin } from '../../../redux/admins/thunks';
import SuccessModal from '../../Shared/ErrorSuccessModal/index';

const AdminsAdd = ({ closeModalForm }) => {
  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');
  const [adminInput, setadminInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    active: false
  });

  let newAdmin = JSON.stringify({
    firstName: adminInput.firstName,
    lastName: adminInput.lastName,
    email: adminInput.email,
    password: adminInput.password,
    active: adminInput.active === true
  });

  const onChange = (e) => {
    setadminInput({ ...adminInput, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    dispatch(addAdmin(newAdmin, setResponse)).then(() => {
      setShowSuccessModal(true);
    });
  };

  const onChangeActive = (e) => {
    setadminInput({ ...adminInput, active: e.target.checked });
  };

  return (
    <form className={styles.form}>
      <Input
        label="Admin Name"
        type="text"
        name="firstName"
        placeholder="Insert admin name"
        value={adminInput.firstName}
        onChange={onChange}
        required={true}
        register={console.log}
      />
      <Input
        label="Admin lastName"
        type="text"
        name="lastName"
        placeholder="Insert admin lastName"
        value={adminInput.lastName}
        onChange={onChange}
        required={true}
        register={console.log}
      />
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Insert email"
        value={adminInput.email}
        onChange={onChange}
        required={true}
        register={console.log}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Insert Password"
        value={adminInput.password}
        onChange={onChange}
        required={true}
        register={console.log}
      />
      <Input
        label="Active"
        name="active"
        type="checkbox"
        checked={adminInput.active}
        onChange={onChangeActive}
        register={console.log}
      />
      <div className={styles.buttonBox}>
        <ButtonText
          clickAction={() => {
            onSubmit();
          }}
          label="Creade"
        ></ButtonText>
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
  );
};

export default AdminsAdd;
