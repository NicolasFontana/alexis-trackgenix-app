import { useState } from 'react';
import Input from '../../Shared/Input';
import Select from '../../Shared/Select';
import Button from '../../Shared/Buttons/ButtonText';
import styles from './add.module.css';
import { useDispatch } from 'react-redux';
import { addAdmin } from '../../../redux/admins/thunks';

const AdminsAdd = ({ closeModalForm }) => {
  const dispatch = useDispatch();

  const [adminInput, setadminInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    active: ''
  });

  const onChange = (e) => {
    setadminInput({ ...adminInput, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    dispatch(addAdmin(adminInput));
    closeModalForm();
  };
  return (
    <form className={styles.form}>
      <Input
        label="Admin Name"
        type="text"
        name="firstName"
        placeholder="Insert admin name"
        value={adminInput.firstName}
        onChange={onChange}
        required={true}
      />
      <Input
        label="Admin lastName"
        type="text"
        name="lastName"
        placeholder="Insert admin lastName"
        value={adminInput.lastName}
        onChange={onChange}
        required={true}
      />
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Insert email"
        value={adminInput.email}
        onChange={onChange}
        required={true}
      />
      <Input
        label="Password"
        type="pasword"
        name="password"
        placeholder="Insert Password"
        value={adminInput.password}
        onChange={onChange}
        required={true}
      />
      <Select
        label="Active?"
        name="active"
        value={adminInput.active}
        onChange={onChange}
        title="Define condition"
        data={['True', 'False']}
        required={true}
      />
      <Button
        clickAction={() => {
          closeModalForm();
        }}
        label="Cancel"
      >
        Cancel
      </Button>
      <Button
        clickAction={() => {
          onSubmit();
        }}
        label="Submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default AdminsAdd;
