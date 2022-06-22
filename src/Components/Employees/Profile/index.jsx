import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../../redux/employees/thunks';
import styles from './profile.module.css';
import Preloader from '../../Shared/Preloader/Preloader';
import ButtonText from '../../Shared/Buttons/ButtonText';
import ModalForm from '../../Shared/ModalForm';
import FormEdit from './Edit';

const EmployeeProfile = () => {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employees.list).find(
    (employee) => employee._id === '62996ab1b89dc4b653576647'
  );
  const isLoading = useSelector((state) => state.employees.isLoading);
  const [showModalFormEdit, setShowModalFormEdit] = useState(false);

  const editOpen = () => {
    setShowModalFormEdit(true);
  };

  const editClose = () => {
    setShowModalFormEdit(false);
  };

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  let modalEdit;
  if (showModalFormEdit) {
    modalEdit = (
      <ModalForm isOpen={showModalFormEdit} handleClose={editClose} title="Edit Employee">
        <FormEdit employeeEdit={employee} closeModalForm={editClose} />
      </ModalForm>
    );
  }

  const status = employee?.active ? 'Active' : 'Inactive';
  const isPM = employee?.isProjectManager ? 'Yes' : 'No';

  return isLoading && !showModalFormEdit ? (
    <Preloader />
  ) : (
    <section className={styles.container}>
      <h2 className={styles.title}>Profile</h2>
      <div className={styles.pictureFrame}>
        <img
          src="https://avatars.dicebear.com/api/male/luchito.svg"
          alt="Profile picture"
          className={styles.profilePicture}
        ></img>
      </div>
      <div>
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>Name:</h3>
          <p className={styles.rowText}>{`${employee?.firstName} ${employee?.lastName}`}</p>
        </div>
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>Phone:</h3>
          <p className={styles.rowText}>{`${employee?.phone}`}</p>
        </div>
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>Email:</h3>
          <p className={styles.rowText}>{`${employee?.email}`}</p>
        </div>
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>Address:</h3>
          <p className={styles.rowText}>{`${employee?.address}`}</p>
        </div>
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>Status:</h3>
          <p className={styles.rowText}>{`${status}`}</p>
        </div>
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>Is Project Manager:</h3>
          <p className={styles.rowText}>{`${isPM}`}</p>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <ButtonText clickAction={editOpen} label="Edit profile"></ButtonText>
      </div>
      {modalEdit}
    </section>
  );
};

export default EmployeeProfile;
