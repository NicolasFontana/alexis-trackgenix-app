import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
// import styles from './button.module.css';

const trashCan = <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>;
const pencil = <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>;
const plus = <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>;

const Button = ({ clickAction, classNamea, label }) => {
  let buttonText;
  switch (label) {
    case 'trashCan':
      buttonText = trashCan;
      break;
    case 'pencil':
      buttonText = pencil;
      break;
    case 'plus':
      buttonText = plus;
      break;
    default:
      buttonText = label;
  }

  return (
    <button type="button" onClick={clickAction} className={classNamea}>
      {buttonText}
    </button>
  );
};

export default Button;
