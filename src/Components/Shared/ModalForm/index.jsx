import styles from './modal-form.module.css';
import React from 'react';
import { useEffect } from 'react';

const ModalForm = ({ children, isOpen, handleClose, title }) => {
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
    <div className={styles.container} onPointerDown={handleClose}>
      <div className={styles.modal} onPointerDown={(e) => e.stopPropagation()}>
        <div className={`${styles.header} ${styles.noselect}`}>
          <h2>{title}</h2>
          <img
            className={styles.closeButton}
            onClick={handleClose}
            src={`${process.env.PUBLIC_URL}/assets/images/close-icon.svg`}
          />
        </div>
        <div className={`${styles.form} ${styles.noselect}`}>{children}</div>
      </div>
    </div>
  );
};

export default ModalForm;
