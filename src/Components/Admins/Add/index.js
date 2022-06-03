import React from 'react';
import { useState } from 'react';
import styles from './add.module.css';

const AdminsAdd = () => {
  const [adminInput, setadminInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    active: ''
  });
  const onSubmit = (event) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/api/admins/`, {
      method: 'POST',
      body: JSON.stringify({
        firstName: adminInput.firstName,
        lastName: adminInput.lastName,
        email: adminInput.email,
        password: adminInput.password,
        active: adminInput.active === 'true'
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
    setadminInput({ ...adminInput, [e.target.name]: e.target.value });
  };

  return (
    <section className={styles.container}>
      <h2>Create Admin</h2>
      <form onSubmit={onSubmit}>
        <div className={styles.formBody}>
          <div className={styles.formRow}>
            <label className={styles.label}>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={adminInput.firstName}
              onChange={onChange}
              required
            />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={adminInput.lastName}
              onChange={onChange}
              required
            />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Email:</label>
            <input
              type="email"
              name="email"
              value={adminInput.email}
              onChange={onChange}
              required
            />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Password:</label>
            <input
              type="password"
              name="password"
              value={adminInput.password}
              onChange={onChange}
              required
            />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Active:</label>
            <select name="active" value={adminInput.active} onChange={onChange} required>
              <option value=""></option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.submit} type="submit">
            Create
          </button>
          <a className={styles.cancel} href="/admins">
            Cancel
          </a>
        </div>
      </form>
    </section>
  );
};

export default AdminsAdd;
