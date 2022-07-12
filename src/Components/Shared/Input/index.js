import styles from './input.module.css';

const Input = ({ label, name, type, placeholder, error, register, disabled }) => {
  return (
    <div className={type == 'checkbox' ? styles.checkboxContainer : styles.inputContainer}>
      <label htmlFor={name} className={`${styles.label} ${styles.noselect}`}>
        {label}
      </label>
      <input
        className={error ? `${styles.input} ${styles.inputError}` : styles.input}
        name={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        disabled={disabled}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
