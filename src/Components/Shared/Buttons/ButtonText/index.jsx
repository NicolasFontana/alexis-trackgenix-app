import styles from '../button.module.css';

const Button = ({ clickAction, label, enter }) => {
  return (
    <button type={enter ? 'submit' : 'button'} onClick={clickAction} className={styles.button}>
      {label}
    </button>
  );
};

export default Button;
