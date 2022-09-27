import React from 'react';
import FormPropsTextFields from './inputPage';
import StatisticsList from './statisticsList';

const Statistics = () => {
  return (
    <>
      <h2>Результати</h2>
      <FormPropsTextFields />
      <button type="submit">Додати результат</button>
      <h2>Статистика</h2>
      <StatisticsList />
    </>
  );
};

export default Statistics;
