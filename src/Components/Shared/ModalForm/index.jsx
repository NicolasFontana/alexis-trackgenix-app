import styles from './modal-form.module.css';
import React from 'react';

const ModalForm = ({ children, isOpen, handleClose, title }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <img
            className={styles.closeButton}
            onClick={handleClose}
            src={`${process.env.PUBLIC_URL}/assets/images/close-icon.svg`}
          />
        </div>
        <div className={styles.form}>{children}</div>
      </div>
    </div>
  );
};

export default ModalForm;
