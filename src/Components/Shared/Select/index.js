import styles from './select.module.css';

const Select = ({ label, name, title, data, register, error }) => {
  return (
    <div className={styles.selectContainer}>
      <label className={`${styles.label} ${styles.noselect}`}>{label}</label>
      <select
        className={error ? `${styles.select} ${styles.selectError}` : styles.select}
        name={name}
        {...register(name)}
      >
        <option value="" disabled hidden>
          {title}
        </option>
        {data.map((item, index) => {
          return item._id ? (
            <option value={item._id} key={item._id} className={styles.options}>
              {item.optionText}
            </option>
          ) : (
            <option value={item} key={index} className={styles.options}>
              {item}
            </option>
          );
        })}
      </select>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Select;
