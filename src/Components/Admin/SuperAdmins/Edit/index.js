import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonText } from 'Components/Shared';
import styles from './edit.module.css';

const SuperAdminsEdit = () => {
  const [superAdminInput, setsuperAdminInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    active: ''
  });

  const params = new URLSearchParams(window.location.search);
  const superAdminID = params.get('id');

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/super-admins/${superAdminID}`
      );
      const superAdminData = await response.json();
      setsuperAdminInput({
        firstName: superAdminData.data.firstName,
        lastName: superAdminData.data.lastName,
        email: superAdminData.data.email,
        password: superAdminData.data.password,
        active: superAdminData.data.active
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submitEdit = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${superAdminID}`, {
      method: 'PUT',
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
      <h2>Edit Super Admin</h2>
      <form>
        <div className={styles.formBody}>
          <div className={styles.formRow}>
            <label className={styles.label}>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={superAdminInput.firstName}
              onChange={onChange}
            />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={superAdminInput.lastName}
              onChange={onChange}
            />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Email:</label>
            <input type="email" name="email" value={superAdminInput.email} onChange={onChange} />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Password:</label>
            <input
              type="password"
              name="password"
              value={superAdminInput.password}
              onChange={onChange}
            />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Active:</label>
            <select name="active" value={superAdminInput.active} onChange={onChange}>
              <option value=""></option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>
        <div className={styles.buttons}>
          <ButtonText clickAction={routeChange} label="Cancel"></ButtonText>
          <ButtonText clickAction={submitEdit} label="Submit"></ButtonText>
        </div>
      </form>
    </section>
  );
};

export default SuperAdminsEdit;
