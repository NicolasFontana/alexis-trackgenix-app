import React from 'react';
import { useState } from 'react';
import styles from './add.module.css';
import Modal from '../Modal';

const SuperAdminsAdd = () => {
  const [showModal, setShowModal] = useState(false);
  const [superAdminInput, setsuperAdminInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    active: ''
  });

  let message = '';

  const onSubmit = (event) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}api/super-admins`, {
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
        console.log(response);
        message = response.message;
        console.log(message);
        setShowModal(true);
      });
  };

  const onChange = (e) => {
    setsuperAdminInput({ ...superAdminInput, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      <Modal
        show={showModal}
        modalTitle={'Success'}
        modalMessage={message}
        closeModal={closeModal}
        confirmModal={closeModal}
      />
      <h2>Create Super Admin</h2>
      <a href="/super-admins">
        <button>Exit</button>
      </a>
      <form onSubmit={onSubmit}>
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
            <select name="active" value={superAdminInput.active} onChange={onChange}>
              <option value=""></option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>
        <button type="submit">Save</button>
      </form>
    </section>
  );
};

export default SuperAdminsAdd;
