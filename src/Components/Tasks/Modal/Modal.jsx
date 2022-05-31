import styles from './modal.module.css';

const Modal = ({ title, setShowModal }) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <button className={styles.button} onClick={() => setShowModal(false)}>
          Delete
        </button>
        <button className={styles.button} onClick={() => setShowModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
