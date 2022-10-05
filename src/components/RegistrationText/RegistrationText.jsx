import React from 'react';
import Media from 'react-media';
import ButtonsContainer from '../buttonsContainer/buttonsContainer';
import styles from './RegistrationText.module.css';
import { useTranslation } from 'react-i18next';

const RegistrationText = ({ modalBtnRegisterClick, modalBtnLoginClick }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.registration__text}>
      <h1 className={styles.title}>{t('infoTitle')}</h1>
      <div className={styles.container}>
        <h2 className={styles.subtitle}>{t('subtitleInfo1')}</h2>
        <ul className={styles.registration__list}>
          <li className={styles.registration__item}>
            <p className={styles.item__text}>{t('subtitle1_text1')}</p>
          </li>
          <li className={styles.registration__item}>
            <p className={styles.item__text}>{t('subtitle1_text2')}</p>
          </li>
          <li className={styles.registration__item}>
            <p className={styles.item__text}> {t('subtitle1_text3')}</p>
          </li>
        </ul>
        <h2 className={styles.subtitle}> {t('subtitleInfo2')}</h2>
        <ul className={styles.registration__list2}>
          <li className={styles.registration__item}>
            <p className={styles.item__text}>{t('subtitle2_text1')}</p>
          </li>
          <li className={styles.registration__item}>
            <p className={styles.item__text}>{t('subtitle2_text2')}</p>
          </li>
          <li className={styles.registration__item}>
            <p className={styles.item__text}>{t('subtitle2_text3')}</p>
          </li>
        </ul>
      </div>
      <Media queries={{ small: '(max-width: 768px)' }}>
        {matches => (
          <>
            {matches.small && (
              <ButtonsContainer
                modalBtnRegisterClick={modalBtnRegisterClick}
                modalBtnLoginClick={modalBtnLoginClick}
              />
            )}
          </>
        )}
      </Media>
    </div>
  );
};

export default RegistrationText;
