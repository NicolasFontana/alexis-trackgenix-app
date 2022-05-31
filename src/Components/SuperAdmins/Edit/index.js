import React from 'react';
import { useState } from 'react';
import styles from './edit.module.css';

const SuperAdminsEdit = () => {
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
      <h2>Edit Super Admin</h2>
      <a href="/super-admins">
        <button>Exit</button>
      </a>
      <form onSubmit={onSubmit}>
        <div>
          <div>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={superAdminInput.firstName}
                onChange={onChange}
              />
            </label>
          </div>
          <div>
            <label>
              Last Name:
              <input name="lastName" value={superAdminInput.lastName} onChange={onChange} />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input type="text" name="email" value={superAdminInput.email} onChange={onChange} />
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
              <select name="active" value={superAdminInput.active} onChange={onChange}>
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

export default SuperAdminsEdit;
