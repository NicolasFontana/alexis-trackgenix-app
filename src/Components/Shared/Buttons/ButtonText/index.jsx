import styles from '../button.module.css';

const Button = ({ clickAction, label }) => {
  return (
    <button type="button" onClick={clickAction} className={styles.button}>
      {label}
    </button>
  );
};

export default Button;
