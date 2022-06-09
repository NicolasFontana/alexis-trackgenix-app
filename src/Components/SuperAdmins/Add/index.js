import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './add.module.css';
import ButtonText from '../../Shared/Buttons/ButtonText';

const SuperAdminsAdd = () => {
  const [superAdminInput, setsuperAdminInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    active: ''
  });

  const submitAdd = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`, {
      method: 'POST',
      body: JSON.stringify({
        firstName: superAdminInput.firstName,
        lastName: superAdminInput.lastName,
        email: superAdminInput.email,
        password: superAdminInput.password,
        active: superAdminInput.active === 'true'
      }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((response) => {
        alert(response.message);
      });
  };

  const history = useHistory();

  const routeChange = () => {
    let path = `/super-admins`;
    history.push(path);
  };

  const onChange = (e) => {
    setsuperAdminInput({ ...superAdminInput, [e.target.name]: e.target.value });
  };

  return (
    <section className={styles.container}>
      <h2>Create Super Admin</h2>
      <form>
        <div className={styles.formBody}>
          <div className={styles.formRow}>
            <label className={styles.label}>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={superAdminInput.firstName}
              onChange={onChange}
              required
            />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={superAdminInput.lastName}
              onChange={onChange}
              required
            />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Email:</label>
            <input
              type="email"
              name="email"
              value={superAdminInput.email}
              onChange={onChange}
              required
            />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Password:</label>
            <input
              type="password"
              name="password"
              value={superAdminInput.password}
              onChange={onChange}
              required
            />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Active:</label>
            <select name="active" value={superAdminInput.active} onChange={onChange} required>
              <option value=""></option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>
        <div>
          <ButtonText clickAction={routeChange} label="Cancel"></ButtonText>
          <ButtonText clickAction={submitAdd} label="Submit"></ButtonText>
        </div>
      </form>
    </section>
  );
};

export default SuperAdminsAdd;
