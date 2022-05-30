import styles from './Input.module.css';

const Input = (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <input
        className={styles.input}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Input;
