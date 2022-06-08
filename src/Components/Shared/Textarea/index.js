import styles from './textarea.module.css';

const Textarea = ({ label, name, value, onChange, placeholder, required }) => {
  return (
    <div className={styles.textareaContainer}>
      <label className={styles.label}>{label}</label>
      <textarea
        cols="30"
        rows="5"
        maxLength={150}
        className={styles.textarea}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      ></textarea>
    </div>
  );
};

export default Textarea;
