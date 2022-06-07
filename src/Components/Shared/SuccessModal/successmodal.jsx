import React from 'react';
import styles from './successModal.module.css';

const successModal = ({ showModal, setShowModal }) => {
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
          <h1>Great!</h1>
        </div>
        <div className={styles.description}>
          <p>Your request was successfully accepted</p>
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

export default successModal;
