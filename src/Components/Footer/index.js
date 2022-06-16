import { faFacebook, faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './footer.module.css';

const twitter = <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>;
const facebook = <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>;
const instagram = <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>;
const github = <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>;

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.socialContainer}>
        <a href="https://twitter.com/">{twitter}</a>
        <a href="https://www.facebook.com/">{facebook}</a>
        <a href="https://www.instagram.com/">{instagram}</a>
        <a href="https://github.com/BaSP-m2022/alexis-trackgenix-app">{github}</a>
      </div>
      <div className={styles.license}>
        <div className={styles.location}>Rosario, Argentina</div>
        <div className={styles.copyright}>Copyright © 2022 Trackgenix SA. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
