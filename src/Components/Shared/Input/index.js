import styles from './input.module.css';

const Input = (props) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{props.label}</label>
      <input
        className={styles.input}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        required={props.required}
      />
    </div>
  );
};

export default Input;
