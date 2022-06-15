import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editAdmin } from '../../../redux/admins/thunks';
import styles from './edit.module.css';
import Preloader from '../../Shared/Preloader/Preloader';
import Input from '../../Shared/Input';
import Select from '../../Shared/Select';
import ButtonText from '../../Shared/Buttons/ButtonText';
import SuccessModal from '../../Shared/ErrorSuccessModal/index';

const AdminsEdit = ({ closeModalForm, edit, item }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.admins.isLoading);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');
  const [adminInput, setadminInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    active: ''
  });

  useEffect(() => {
    if (edit && item._id) {
      setadminInput({
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        password: item.password,
        active: item.active === true ? 'Active' : 'Inactive'
      });
    }
  }, []);

  const onChange = (event) => {
    setadminInput({ ...adminInput, [event.target.name]: event.target.value });
  };

  const onSubmit = () => {
    setShowSuccessModal(true);
    dispatch(editAdmin(adminInput, item.id, (response) => setResponse(response)));
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <section className={styles.container}>
      <h2>Edit Admin</h2>
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
          data={['Active', 'Inactive']}
          required={true}
        />
        <div className={styles.buttons}>
          <ButtonText clickAction={closeModalForm} label="Cancel">
            Cancel
          </ButtonText>
          <ButtonText clickAction={onSubmit} label="Submit">
            Submit
          </ButtonText>
        </div>
        <SuccessModal
          show={showSuccessModal}
          closeModal={() => {
            setShowSuccessModal(false);
          }}
          closeModalForm={closeModalForm}
          successResponse={response}
        />
      </form>
    </section>
  );
};

export default AdminsEdit;
