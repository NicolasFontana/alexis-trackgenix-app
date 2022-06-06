import styles from './modal-form.module.css';

const ModalForm = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Add/Edit Employee</h2>
          <img
            className={styles.closeButton}
            onClick={props.closeModalForm}
            src={`${process.env.PUBLIC_URL}/assets/images/close-icon.svg`}
          />
        </div>
        {props.children}
        {/* <Form employeeId={props.listItemId} edit={props.edit} closeFormModal={props.closeModal} /> */}
      </div>
    </div>
  );
};

export default ModalForm;
