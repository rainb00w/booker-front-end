import React from 'react';
import styles from './buttonsContainer.module.css';
import { useTranslation } from 'react-i18next';

const ButtonsContainer = ({ modalBtnRegisterClick, modalBtnLoginClick }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.buttons__container}>
        <button
          onClick={() => {
            modalBtnLoginClick();
          }}
          className={styles.login__button}
        >
          <span className={styles.login__link}>{t('login')}</span>
        </button>
        <button
          onClick={() => {
            modalBtnRegisterClick();
          }}
          className={styles.register__button}
        >
          <span className={styles.register__link}>{t('signUp')}</span>
        </button>
      </div>
    </>
  );
};

export default ButtonsContainer;
