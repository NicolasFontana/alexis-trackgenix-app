import styles from './input.module.css';

const Input = ({ label, name, type, value, onChange, placeholder, checked, required }) => {
  return (
    <div className={type == 'checkbox' ? styles.checkboxContainer : styles.inputContainer}>
      <label className={`${styles.label} ${styles.noselect}`}>{label}</label>
      <input
        className={styles.input}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        checked={checked}
        required={required}
      />
    </div>
  );
};

export default Input;
