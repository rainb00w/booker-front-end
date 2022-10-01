import React from 'react';
import s from './btnMytraining.module.css';
import { useNavigate } from 'react-router-dom';

const BtnMyTraining = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        type="submit"
        className={s.btn}
        onClick={() => navigate('/training')}
      >
        My training
      </button>
    </>
  );
};

export default BtnMyTraining;
