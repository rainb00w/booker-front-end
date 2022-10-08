import React, { useState, useEffect } from "react";
import Media from 'react-media';
import AuthModal from '../../components/authModal/authModal';
import Registration from "../../components/pages/registration/registration";
import RegistrationText from '../../components/RegistrationText/RegistrationText';
import styles from "../login/loginPage.module.css";

const RegistrationPage = () => {
  const [modal, setModal] = useState(true);
  
  useEffect(() => {
    const hide = localStorage.getItem('AuthModal');
    location.state === 'modal' || hide === 'hide'
      ? setModal(false)
      : setModal(true);
  }, []);

  const modalBtnRegisterClick = () => {
    setModal(false);
    localStorage.setItem('AuthModal', 'hide');
  };

  const modalBtnLoginClick = () => {
    localStorage.setItem('AuthModal', 'hide');
    navigate('/login', { state: 'modal' });
  };

    return (
      <section className={styles.section}>
        <div className={styles.left__block}>
          <Registration />
        </div>
        {modal && (
          <Media queries={{ small: '(max-width: 768px)' }}>
            {matches => (
              <>
                {matches.small && (
                  <AuthModal
                    modalBtnRegisterClick={modalBtnRegisterClick}
                    modalBtnLoginClick={modalBtnLoginClick}
                  />
                )}
              </>
            )}
          </Media>
        )}
        <Media queries={{ tablet: '(min-width: 768px)' }}>
          {matches => matches.tablet &&
            <div className={styles.right__block}>
              <RegistrationText />
            </div>}
        </Media>
      </section>
    )
};

export default RegistrationPage;