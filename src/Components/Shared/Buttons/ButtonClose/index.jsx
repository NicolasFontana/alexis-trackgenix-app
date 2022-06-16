import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from '../button.module.css';

const xmark = <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>;

const Button = ({ clickAction }) => {
  return (
    <button type="button" onClick={clickAction} className={styles.buttonClose}>
      {xmark}
    </button>
  );
};

export default Button;
