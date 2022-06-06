import styles from './success-modal.module.css';

const SuccessModal = (props) => {
  if (!props.show) {
    return null;
  }

  const closeBothModals = () => {
    props.closeModal();
    props.closeModalForm();
  };

  return props.successResponse.error === true ? (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Error</h2>
          <img
            className={styles.closeButton}
            onClick={props.closeModal}
            src={`${process.env.PUBLIC_URL}/assets/images/close-icon.svg`}
          />
        </div>
        <p className={styles.message}> {props.successResponse.message} </p>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Success</h2>
          <img
            className={styles.closeButton}
            onClick={closeBothModals}
            src={`${process.env.PUBLIC_URL}/assets/images/close-icon.svg`}
          />
        </div>
        <p className={styles.message}> {props.successResponse.message} </p>
      </div>
    </div>
  );
};

export default SuccessModal;
