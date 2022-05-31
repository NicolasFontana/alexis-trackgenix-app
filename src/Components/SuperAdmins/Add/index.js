import React from 'react';
import { useState } from 'react';
import styles from './add.module.css';

const SuperAdminsAdd = () => {
  const [superAdminInput, setsuperAdminInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    active: ''
  });

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
      });
  };

  const onChange = (e) => {
    setsuperAdminInput({ ...superAdminInput, [e.target.name]: e.target.value });
  };

  return (
    <section className={styles.container}>
      <h2>Create Super Admin</h2>
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
                required
              />
            </label>
          </div>
          <div>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={superAdminInput.lastName}
                onChange={onChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={superAdminInput.email}
                onChange={onChange}
                required
              />
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
                required
              />
            </label>
          </div>
          <div>
            <label>
              Active:
              <select name="active" value={superAdminInput.active} onChange={onChange}>
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

export default SuperAdminsAdd;
