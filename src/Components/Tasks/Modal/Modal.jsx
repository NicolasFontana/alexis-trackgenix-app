import styles from 'modal.module.css';

const Modal = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <button className={styles.button}>Cancel</button>
        <button className={styles.button}>Delete</button>
      </div>
    </div>
  );
};

export default Modal;
