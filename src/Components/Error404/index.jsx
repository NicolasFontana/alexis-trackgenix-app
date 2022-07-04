import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonText } from 'Components/Shared';

import styles from './error404.module.css';

function Error404() {
  return (
    <>
      <div className={styles.container}>
        <h2>Sorry, this page isn&apos;t available.</h2>
        <p>The link you followed may be broken, or the page may have been removed.</p>
        <Link to="/home" className={styles.linkButton}>
          <ButtonText label={'Go back to Trackgenix.'} className={styles.buttonText} />
        </Link>
        <img src="https://i.ibb.co/q9V9N8T/Error404-Green.png" alt={'error 404'} />
      </div>
    </>
  );
}

export default Error404;
