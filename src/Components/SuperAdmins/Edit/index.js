import React from 'react';
import { useState, useEffect } from 'react';
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

  useEffect(async () => {
    try {
      const getSuperAdmin = await fetch(
        `${process.env.REACT_APP_API_URL}/api/super-admins/${superAdminID}`
      );
      const superAdminData = await getSuperAdmin.json();
      setsuperAdminInput({
        firstName: superAdminData.data.firstName,
        lastName: superAdminData.data.lastName,
        email: superAdminData.data.email,
        password: superAdminData.data.password,
        active: superAdminData.data.active
      });
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
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

  const onChange = (e) => {
    setsuperAdminInput({ ...superAdminInput, [e.target.name]: e.target.value });
  };

  return (
    <section className={styles.container}>
      <h2>Edit Super Admin</h2>
      <form onSubmit={onSubmit}>
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
          <button className={styles.submit} type="submit">
            Save
          </button>
          <a className={styles.cancel} href="/super-admins">
            Cancel
          </a>
        </div>
      </form>
    </section>
  );
};

export default SuperAdminsEdit;
