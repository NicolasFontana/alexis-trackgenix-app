import styles from './errorsuccessmodal.module.css';

const modalErrorSuccess = ({ show, closeModal, closeModalForm, successResponse }) => {
  if (!show) {
    return null;
  }

  return (
    <div
      className={styles.container}
      onPointerDown={successResponse.error === false ? closeModalForm : closeModal}
    >
      <div className={styles.modal} onPointerDown={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{successResponse.error === false ? 'Success' : 'Error'}</h2>
          <img
            className={styles.closeButton}
            onClick={successResponse.error === false ? closeModalForm : closeModal}
            src={`${process.env.PUBLIC_URL}/assets/images/close-icon.svg`}
          />
        </div>
        <p className={styles.message}> {successResponse.message} </p>
      </div>
    </div>
  );
};

export default modalErrorSuccess;
