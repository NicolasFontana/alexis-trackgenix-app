import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from '../button.module.css';

const plus = <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>;

const Button = ({ clickAction }) => {
  return (
    <button type="button" onClick={clickAction} className={styles.buttonAdd}>
      {plus}
    </button>
  );
};

export default Button;
