import React from 'react';
import { createPortal } from 'react-dom';
import RegistrationText from '../RegistrationText';
import styles from './authModal.module.css';

const modalRoot = document.querySelector('#modal__root');

const AuthModal = ({ modalBtnRegisterClick, modalBtnLoginClick }) => {
  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <RegistrationText
          modalBtnRegisterClick={modalBtnRegisterClick}
          modalBtnLoginClick={modalBtnLoginClick}
        />
      </div>
    </div>,
    modalRoot
  );
};

export default AuthModal;
