import styles from './textarea.module.css';

const Textarea = ({ label, name, placeholder, error, register }) => {
  return (
    <div className={styles.textareaContainer}>
      <label className={`${styles.label} ${styles.noselect}`}>{label}</label>
      <textarea
        cols="30"
        rows="3"
        className={error ? `${styles.textarea} ${styles.textareaError}` : styles.textarea}
        name={name}
        placeholder={placeholder}
        {...register(name)}
      ></textarea>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Textarea;
