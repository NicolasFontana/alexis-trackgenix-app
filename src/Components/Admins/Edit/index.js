import React from 'react';
import { useState, useEffect } from 'react';
import styles from './edit.module.css';

const AdminsEdit = () => {
  const [adminInput, setadminInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    active: ''
  });

  const params = new URLSearchParams(window.location.search);
  const adminID = params.get('id');

  useEffect(async () => {
    try {
      const getAdmin = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${adminID}`);
      const adminData = await getAdmin.json();
      setadminInput({
        firstName: adminData.data.firstName,
        lastName: adminData.data.lastName,
        email: adminData.data.email,
        password: adminData.data.password,
        active: adminData.data.active
      });
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/api/admins/${adminID}`, {
      method: 'PUT',
      body: JSON.stringify(adminInput),
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
      <h2>Edit Admin</h2>
      <form onSubmit={onSubmit}>
        <div className={styles.formBody}>
          <div className={styles.formRow}>
            <label className={styles.label}>First Name:</label>
            <input type="text" name="firstName" value={adminInput.firstName} onChange={onChange} />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Last Name:</label>
            <input type="text" name="lastName" value={adminInput.lastName} onChange={onChange} />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Email:</label>
            <input type="email" name="email" value={adminInput.email} onChange={onChange} />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Password:</label>
            <input
              type="password"
              name="password"
              value={adminInput.password}
              onChange={onChange}
            />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Active:</label>
            <select name="active" value={adminInput.active} onChange={onChange}>
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
          <a className={styles.cancel} href="/admins">
            Cancel
          </a>
        </div>
      </form>
    </section>
  );
};

export default AdminsEdit;
