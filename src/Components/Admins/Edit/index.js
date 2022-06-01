import React from 'react';
import { useState } from 'react';
import styles from './edit.module.css';

const AdminsEdit = () => {
  const [adminInput, setadminInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    active: ''
  });

  const onSubmit = async (event) => {
    event.preventDefault();
  };

  const onChange = (e) => {
    setadminInput({ ...adminInput, [e.target.name]: e.target.value });
  };

  return (
    <section className={styles.container}>
      <h2>Edit Admin</h2>
      <a href="/admins">
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
                value={adminInput.firstName}
                onChange={onChange}
              />
            </label>
          </div>
          <div>
            <label>
              Last Name:
              <input name="lastName" value={adminInput.lastName} onChange={onChange} />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input type="text" name="email" value={adminInput.email} onChange={onChange} />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={adminInput.password}
                onChange={onChange}
              />
            </label>
          </div>
          <div>
            <label>
              Active:
              <select name="active" value={adminInput.active} onChange={onChange}>
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

export default AdminsEdit;
