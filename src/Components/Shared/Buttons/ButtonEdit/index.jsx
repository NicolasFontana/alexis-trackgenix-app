import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import styles from '../button.module.css';

const pencil = <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>;

const Button = ({ clickAction }) => {
  return (
    <button type="button" onClick={clickAction} className={styles.buttonEdit}>
      {pencil}
    </button>
  );
};

export default Button;
