import styles from './Input.module.css';

const Input = (props) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{props.label}</label>
      <input
        className={styles.input}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        type={props.type}
      />
    </div>
  );
};

export default Input;
