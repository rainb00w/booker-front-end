import React from 'react';
import { createPortal } from 'react-dom';
import RegistrationText from '../registrationText/registrationText';
import styles from './authModal.module.css';

const modalRoot = document.querySelector('#modal__root');

const AuthModal = ({ modalBtnClick }) => {
  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <RegistrationText modalBtnClick={modalBtnClick} />
      </div>
    </div>,
    modalRoot
  );
};

export default AuthModal;
