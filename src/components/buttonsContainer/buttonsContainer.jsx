import React from 'react';
import styles from './buttonsContainer.module.css';

const ButtonsContainer = ({ modalBtnRegisterClick, modalBtnLoginClick }) => {
  return (
    <>
      <div className={styles.buttons__container}>
        <button
          onClick={() => {
            modalBtnLoginClick();
          }}
          className={styles.login__button}
        >
          <span className={styles.login__link}>Log in</span>
        </button>
        <button
          onClick={() => {
            modalBtnRegisterClick();
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
