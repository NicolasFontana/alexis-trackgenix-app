import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.socialContainer}>
        <a href="">
          <img className={styles.socialIcon} src="/assets/images/twitter.svg" />
        </a>
        <a href="">
          <img className={styles.socialIcon} src="/assets/images/facebook.svg" />
        </a>
        <a href="">
          <img className={styles.socialIcon} src="/assets/images/instagram.svg" />
        </a>
      </div>
      <div className={styles.license}>
        <div className={styles.location}>Rosario, Argentina</div>
        <div className={styles.copyright}>Copyright © 2022 Trackgenix SA. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
