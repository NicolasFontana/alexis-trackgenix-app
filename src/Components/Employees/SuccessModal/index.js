import styles from './success-modal.module.css';

const SuccessModal = (props) => {
  if (!props.show) {
    return null;
  }
  console.log(props.message);
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Success/Error</h2>
          <img
            className={styles.closeButton}
            onClick={props.closeModal}
            src={`${process.env.PUBLIC_URL}/assets/images/close-icon.svg`}
          />
        </div>
        <p className={styles.message}> {props.message} </p>
      </div>
    </div>
  );
};

export default SuccessModal;
