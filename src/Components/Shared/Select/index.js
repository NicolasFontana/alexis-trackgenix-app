import styles from './select.module.css';

const Select = ({ label, name, value, defaultValue, onChange, required, title, data }) => {
  return (
    <div className={styles.selectContainer}>
      <label className={`${styles.label} ${styles.noselect}`}>{label}</label>
      <select
        className={styles.select}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
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
    </div>
  );
};

export default Select;
