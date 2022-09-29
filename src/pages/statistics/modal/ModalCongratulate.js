import React from 'react';
import { ReactComponent as ThumbUp } from '../../../img/thumb_up-24px.svg';
import s from './ModalCongratulate.module.css';

const ModalCongratulate = () => {
  return (
    <div className={s.container}>
      <ThumbUp className={s.thumbUp} />
      <p className={s.text}>Вітаю! Ще одна книга прочитана.</p>
      <button className={s.btn}>Готово</button>
    </div>
  );
};
export default ModalCongratulate;
