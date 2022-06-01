import React from 'react';
import styles from './modal.module.css';

const Modal = ({ title, showModal, closeModal }) => {
  if (!showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>{title}</div>
      <button className={styles.button} onClick={closeModal}>
        Continue
      </button>
    </div>
  );
};

export default Modal;
