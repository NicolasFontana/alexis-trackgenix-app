import React from 'react';
import styles from './confirmModal.module.css';

const ConfirmModal = ({ children, isOpen, handleClose, confirmDelete, idDelete }) => {
  if (!isOpen) {
    return null;
  }

  console.log('entro al modal');
  console.log(idDelete);

  return (
    <div className={styles.modalOveray}>
      <div className={styles.modalWrapper}>
        {children}
        <button onClick={confirmDelete(idDelete)} className={styles.confirmButton}>
          Confirm
        </button>
        <button onClick={handleClose} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
