import React from 'react';
import s from './btnMytraining.module.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BtnMyTraining = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <button
        type="submit"
        className={s.btn}
        onClick={() => navigate('/training')}
      >
        {t('btnMyTraining')}
      </button>
    </>
  );
};

export default BtnMyTraining;
