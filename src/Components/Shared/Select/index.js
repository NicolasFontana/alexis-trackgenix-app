import styles from './select.module.css';

const Select = (props) => {
  return (
    <div className={styles.selectContainer}>
      <label className={styles.label}>{props.label}</label>
      <select
        className={styles.select}
        name={props.name}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        required={props.required}
      >
        <option value="" disabled hidden>
          {props.title}
        </option>
        {props.data.map((item, index) => {
          return item._id ? (
            <option value={item._id} key={item._id} className={styles.options}>
              {item.name}
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
