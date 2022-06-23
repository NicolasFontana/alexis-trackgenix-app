import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.container}>
      <h3>{props.modalTitle}</h3>
      <h4>{props.modalMessage}</h4>
      <div>
        <button onClick={props.confirmModal}>Confirm</button>
        <button onClick={props.closeModal}>Exit</button>
      </div>
    </div>
  );
};

export default Modal;
