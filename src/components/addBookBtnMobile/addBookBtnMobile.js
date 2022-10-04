import React from 'react';
import styles from './addBookBtnMobile.module.css';

const AddBookBtnMobile = ({ handleClick }) => {
  return (
    <button onClick={handleClick} className={styles.btn}>
      <span>+</span>
    </button>
  );
};

export default AddBookBtnMobile;
