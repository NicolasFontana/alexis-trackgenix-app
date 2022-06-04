import React from 'react';
import styles from './input.module.css';

const Input = (props) => {
  const { label, name, value, onChange, type } = props;

  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input
        className={styles.input}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default Input;
