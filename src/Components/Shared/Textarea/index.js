import styles from './textarea.module.css';

const Textarea = (props) => {
  return (
    <div className={styles.textareaContainer}>
      <label className={styles.label}>{props.label}</label>
      <textarea
        cols="30"
        rows="5"
        maxLength={150}
        className={styles.textarea}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        required={props.required}
      ></textarea>
    </div>
  );
};

export default Textarea;
