import React from 'react';
import { ReactComponent as ThumbUp } from '../../../img/thumb_up-24px.svg';
import s from './ModalYouAreGood.module.css';

const ModalYouAreGood = () => {
  return (
    <div className={s.container}>
      <ThumbUp className={s.thumbUp} />
      <p className={s.text}>
        Ти молодчина, але потрібно швидше! Наступного разу тобі все вдасться)
      </p>
      <button className={s.btnTraining}>Нове тренування</button>
      <button className={s.btnBack}>Назад</button>
    </div>
  );
};
export default ModalYouAreGood;
