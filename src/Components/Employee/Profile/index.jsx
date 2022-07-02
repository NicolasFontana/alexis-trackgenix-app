import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from 'redux/employees/thunks';
import styles from './profile.module.css';
import { ButtonText, ModalForm } from 'Components/Shared';
import FormEdit from './Edit';

const EmployeeProfile = () => {
  const dispatch = useDispatch();
  // const isLoading = useSelector((state) => state.employees.isLoading);
  const employeeId = useSelector((state) => state.auth.user?.data._id);
  const employee = useSelector((state) => state.employees.list).find(
    (employee) => employee._id === employeeId
  );
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
      <ModalForm isOpen={showModalFormEdit} handleClose={editClose} title="Edit Personal Data">
        <FormEdit employeeEdit={employee} closeModalForm={editClose} />
      </ModalForm>
    );
  }

  const status = employee?.active ? 'Active' : 'Inactive';
  const isPM = employee?.isProjectManager ? 'Yes' : 'No';

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Profile</h2>
      <div className={styles.pictureFrame}>
        <img
          src="https://avatars.dicebear.com/api/male/luchito.svg"
          alt="Profile picture"
          className={styles.profilePicture}
        ></img>
      </div>
      <div className={styles.data}>
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>First Name:</h3>
          <p className={styles.rowText}>{`${employee?.firstName}`}</p>
        </div>
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>Last Name:</h3>
          <p className={styles.rowText}>{`${employee?.lastName}`}</p>
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
          <h3 className={styles.rowTitle}>Status:</h3>
          <p className={styles.rowText}>{`${status}`}</p>
        </div>
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>Is Project Manager:</h3>
          <p className={styles.rowText}>{`${isPM}`}</p>
        </div>
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>Address:</h3>
          <p className={styles.rowText}>{`${employee?.address}`}</p>
        </div>
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>DNI:</h3>
          <p className={styles.rowText}>{`${employee?.dni}`}</p>
        </div>
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>Date of Birth:</h3>
          <p className={styles.rowText}>{`${employee?.dateBirth?.slice(0, 10)}`}</p>
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
