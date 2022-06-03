import React from 'react';
import styles from './modal.module.css';

const Modal = ({ title, showModal, closeModal }) => {
  if (!showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <button className={styles.button} onClick={closeModal}>
          &#10006;
        </button>
        <div className={styles.message}>{title}</div>
      </div>
    </div>
  );
};

export default Modal;
