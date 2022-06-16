import React from 'react';
import styles from './confirmModal.module.css';
import ButtonClose from '../Buttons/ButtonClose';
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
          <h2>{title}</h2>
          <ButtonClose clickAction={handleClose} />
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
