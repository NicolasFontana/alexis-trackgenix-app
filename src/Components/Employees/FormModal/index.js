import styles from './form-modal.module.css';
import Form from '../Form';

const Modal = (props) => {
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
            onClick={props.closeModal}
            src={`${process.env.PUBLIC_URL}/assets/images/close-icon.svg`}
          />
        </div>
        <Form />
      </div>
    </div>
  );
};

export default Modal;
