import React from 'react';
import { useState } from 'react';
import styles from './form.module.css';

const SuperAdminsForm = () => {
  const [superAdminInput, setsuperAdminInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    active: ''
  });

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const onChange = (e) => {
    setsuperAdminInput({ ...superAdminInput, [e.target.name]: e.target.value });
  };

  return (
    <section className={styles.container}>
      <h2>Form</h2>
      <form onSubmit={onSubmit}>
        <div>
          <div>
            <label>
              First Name:
              <input
                type="text"
                name="first-name"
                value={superAdminInput.firstName}
                onChange={onChange}
              />
            </label>
          </div>
          <div>
            <label>
              Last Name:
              <input
                type="text"
                name="last-name"
                value={superAdminInput.lastName}
                onChange={onChange}
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input type="email" name="email" value={superAdminInput.email} onChange={onChange} />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={superAdminInput.password}
                onChange={onChange}
              />
            </label>
          </div>
          <div>
            <label>
              Active:
              <select value={superAdminInput.active} onChange={onChange}>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </label>
          </div>
        </div>
        <button type="submit">Save</button>
        <a href="/super-admins/">
          <button>Exit</button>
        </a>
      </form>
    </section>
  );
};

export default SuperAdminsForm;
