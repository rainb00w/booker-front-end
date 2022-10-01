import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './buttonsContainer.module.css';

const ButtonsContainer = ({ modalBtnClick }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.buttons__container}>
        <button
          onClick={() => {
            modalBtnClick();
          }}
          className={styles.login__button}
        >
          <span className={styles.login__link}>Log in</span>
        </button>
        <button
          onClick={() => {
            navigate('/register');
          }}
          className={styles.register__button}
        >
          <span className={styles.register__link}>Register</span>
        </button>
      </div>
    </>
  );
};

export default ButtonsContainer;
