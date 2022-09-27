import React from 'react';
import FormPropsTextFields from './inputPage';
import StatisticsList from './statisticsList';
import s from './statisticsList.module.css';

const Statistics = () => {
  return (
    <div className={s.container}>
      <h2 className={s.resultsHeader}>Результати</h2>
      <div className={s.inputs}>
        <label className={s.inputsLabel}>
          Дата
          <input className={s.inputPage} type="date" name="dateInput" />
        </label>
        <label className={s.inputsLabel}>
          Кількість сторінок
          <input className={s.inputDate} type="number" name="pageInput" />
        </label>
      </div>
      <button className={s.addResultBtn} type="submit">
        Додати результат
      </button>
      <h2 className={s.statisticsHeader}>Статистика</h2>
      <StatisticsList />
    </div>
  );
};

export default Statistics;
