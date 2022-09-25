import React, { Component } from 'react';
import s from './info.module.css';
import library from './icon_library.svg';
import flag from './icon_flag.svg';
import vector from './icon_vector.svg';

const Info = () => {
  return (
    <div>
      <div className={s.blok_info}>
        <div>
          <h2 className={s.title}>Крок 1.</h2>
          <h3 className={s.subtitle}>
            <img src={library} alt="library" />
            Створіть особисту бібліотеку
          </h3>
          <p className={s.text}>
            <img src={vector} alt="vector" />
            Додайте до неї книжки, які маєте намір прочитати.
          </p>
        </div>

        <div>
          <h2 className={s.title}>Крок 2.</h2>
          <h3 className={s.subtitle}>
            <img src={flag} alt="flag" />
            Сформуйте своє перше тренування
          </h3>
          <p className={s.text}>
            <img src={vector} alt="vector" />
            Визначте ціль, оберіть період, розпочинайте тренування.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
