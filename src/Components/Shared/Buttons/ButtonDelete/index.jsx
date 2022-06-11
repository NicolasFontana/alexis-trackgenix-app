import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from '../button.module.css';

const trashCan = <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>;

const Button = ({ clickAction }) => {
  return (
    <button type="button" onClick={clickAction} className={styles.buttonDelete}>
      {trashCan}
    </button>
  );
};

export default Button;
