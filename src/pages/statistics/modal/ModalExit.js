import React from 'react';
import s from './ModalExit.module.css';

const ModalExit = () => {
  return (
    <div className={s.container}>
      <p className={s.text}>
        Якщо Ви вийдете з програми незбережені дані будуть втрачені
      </p>
      <div className={s.btnWrapper}>
        <button className={s.btnCancel}>Відміна</button>
        <button className={s.btnExit}>Вийти</button>
      </div>
    </div>
  );
};
export default ModalExit;
