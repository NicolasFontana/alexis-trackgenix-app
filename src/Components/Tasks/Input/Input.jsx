import React from 'react';
import styles from './input.module.css';

const Input = (props) => {
  const { label, name, value, onChange } = props;

  return (
    <div>
      <label>{label}</label>
      <input className={styles.input} name={name} value={value} onChange={onChange} required />
    </div>
  );
};

export default Input;
