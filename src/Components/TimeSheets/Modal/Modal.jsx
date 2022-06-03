import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ showModal, showTitle, setShowModal }) => {
  if (!showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.tittle}>Delete timesheet</div>
        <div className={styles.description}>{showTitle}</div>
        <button className={styles.btnClose} onClick={() => setShowModal(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
