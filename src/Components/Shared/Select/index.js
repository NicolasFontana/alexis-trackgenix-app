import styles from './select.module.css';

const Select = ({ label, name, title, data, register, error, disabled, defaultValue }) => {
  return (
    <div className={styles.selectContainer}>
      {label ? <label className={`${styles.label} ${styles.noselect}`}>{label}</label> : null}
      <select
        className={error ? `${styles.select} ${styles.selectError}` : styles.select}
        name={name}
        {...register(name)}
        defaultValue={defaultValue}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <option value="" disabled hidden>
          {title}
        </option>
        {data.map((item, index) => {
          return item._id ? (
            <option value={item._id} key={item._id} className={styles.options} disabled={disabled}>
              {item.optionText}
            </option>
          ) : (
            <option value={item} key={index} className={styles.options} disabled={disabled}>
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
