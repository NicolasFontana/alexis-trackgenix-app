import React from 'react';
import styles from './confirmModal.module.css';
import { useEffect } from 'react';

const ConfirmModal = ({ isOpen, handleClose, confirmDelete, title, message }) => {
  if (!isOpen) {
    return null;
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className={styles.modalOvelay} onPointerDown={handleClose}>
      <div className={styles.modalWrapper} onPointerDown={(e) => e.stopPropagation()}>
        <div className={styles.title}>
          <div className={styles.delete}>{title}</div>
          <button
            onClick={handleClose}
            className={styles.closeButton}
            src={`${process.env.PUBLIC_URL}/assets/images/close-icon.svg`}
          ></button>
        </div>
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
