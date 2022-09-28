import React from 'react';
import StatisticsRow from './StatisticsRow';
import s from './statisticsList.module.css';
const StatisticsList = () => {
  const rows = [
    { date: '10.10.2019', time: '08:08:00', page: 32 },
    { date: '11.10.2019', time: '09:08:00', page: 154 },
    { date: '12.10.2019', time: '10:08:00', page: 7 },
    { date: '13.10.2019', time: '11:08:00', page: 12 },
    { date: '14.10.2019', time: '12:08:00', page: 21 },
  ];
  return (
    <ul className={s.statisticsList}>
      {rows.map(row => (
        <StatisticsRow key={rows.date} row={row} className={s.statisticsList} />
      ))}
    </ul>
  );
};
export default StatisticsList;
