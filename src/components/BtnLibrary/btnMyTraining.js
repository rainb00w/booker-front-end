import React from 'react';
import s from './btnMytraining.module.css';

const BtnMyTraining = () => {
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
