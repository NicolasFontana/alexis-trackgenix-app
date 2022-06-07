import React from 'react';
import styles from './errorModal.module.css';

const errorModal = ({ showModal, setShowModal }) => {
  if (!showModal) {
    return null;
  }
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.modalCloseBtn}>
          <button className={styles.btnClose} onClick={() => setShowModal(false)}>
            X
          </button>
        </div>
        <div className={styles.title}>
          <h1>Error in your request</h1>
        </div>
        <div className={styles.description}>
          <p>An error occurred while sending the request</p>
        </div>
        <div className={styles.modalCloseBtnFooter}>
          <button className={styles.btnCloseFooter} onClick={() => setShowModal(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default errorModal;
