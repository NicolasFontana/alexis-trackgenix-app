import React from 'react';
import styles from './confirmModal.module.css';

const ConfirmModal = ({ isOpen, handleClose, confirmDelete, title, message }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOvelay}>
      <div className={styles.modalWrapper}>
        <div className={styles.tittle}>{title}</div>
        <div className={styles.message}>{message}</div>
        <div className={styles.modalButton}>
          <button onClick={confirmDelete} className={styles.Button}>
            Delete
          </button>
          <button onClick={handleClose} className={styles.Button}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
