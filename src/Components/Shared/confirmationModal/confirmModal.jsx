import React from 'react';
import styles from './confirmModal.module.css';
import { useEffect } from 'react';
import { ButtonText } from 'Components/Shared';

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
        </div>
        <div className={styles.message}>{message}</div>
        <div className={styles.modalButton}>
          <ButtonText clickAction={confirmDelete} label={'Confirm'} />
          <ButtonText clickAction={handleClose} label={'Close'} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
