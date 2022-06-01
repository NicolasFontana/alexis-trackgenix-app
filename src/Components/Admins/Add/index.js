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
    fetch(`${process.env.REACT_APP_API_URL}api/admins/`, {
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
        console.log(response);
      });
  };

  const onChange = (e) => {
    setadminInput({ ...adminInput, [e.target.name]: e.target.value });
  };

  return (
    <section className={styles.container}>
      <h2>Create Admin</h2>
      <a href="/admins">
        <button>Exit</button>
      </a>
      <form onSubmit={onSubmit}>
        <div className={styles.formBody}>
          <div className={styles.formRow}>
            <label className={styles.label}>
              First Name:
              <input
                type="text"
                name="firstName"
                value={adminInput.firstName}
                onChange={onChange}
                required
              />
            </label>
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={adminInput.lastName}
                onChange={onChange}
                required
              />
            </label>
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>
              Email:
              <input
                type="email"
                name="email"
                value={adminInput.email}
                onChange={onChange}
                required
              />
            </label>
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>
              Password:
              <input
                type="password"
                name="password"
                value={adminInput.password}
                onChange={onChange}
                required
              />
            </label>
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>
              Active:
              <select name="active" value={adminInput.active} onChange={onChange}>
                <option value=""></option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </label>
          </div>
        </div>
        <button type="submit">Save</button>
      </form>
    </section>
  );
};

export default AdminsAdd;
