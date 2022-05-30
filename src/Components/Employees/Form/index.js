import { useState } from 'react';
import Input from '../Input';
import styles from './form.module.css';

const Form = () => {
  const [employeeInput, setEmployeeInput] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    active: '',
    projects: [],
    timesheets: []
  });

  const onChange = (event) => {
    setEmployeeInput({ ...employeeInput, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>Add new Employee</h2>
      </div>
      <form onSubmit={onSubmit}>
        <Input
          label="First Name"
          name="firstName"
          value={employeeInput.firstName}
          onChange={onChange}
          required
        />
        <Input
          label="Last Name"
          name="lastName"
          value={employeeInput.lastName}
          onChange={onChange}
          required
        />
        <Input
          label="Phone"
          name="phone"
          value={employeeInput.phone}
          onChange={onChange}
          required
        />
        <Input
          label="Email"
          name="email"
          value={employeeInput.email}
          onChange={onChange}
          required
        />
        <Input
          label="Password"
          name="password"
          value={employeeInput.password}
          onChange={onChange}
          required
        />
        <Input
          label="Active"
          name="active"
          value={employeeInput.active}
          onChange={onChange}
          required
        />
        <Input
          label="Projects"
          name="projects"
          value={employeeInput.projects}
          onChange={onChange}
          required
        />
        <Input
          label="Timesheets"
          name="timesheets"
          value={employeeInput.timesheets}
          onChange={onChange}
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Form;
