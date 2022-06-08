import React from 'react';
import styles from './confirmModal.module.css';

const ConfirmModal = ({ children, isOpen, handleClose, confirmDelete }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOvelay}>
      <div className={styles.modalWrapper}>
        {children}
        <button onClick={confirmDelete} className={styles.Button}>
          Delete
        </button>
        <button onClick={handleClose} className={styles.Button}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
