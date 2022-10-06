import React from 'react';
import StatisticsRow from './StatisticsRow';
import s from './statisticsList.module.css';
import { useGetAllTrainingsQuery } from '../../redux/books/trainingApi';
const StatisticsList = () => {
  Date.prototype.yyyymmdd = function () {
    let mm = this.getMonth() + 1; // getMonth() is zero-based
    let dd = this.getDate();

    return [
      this.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd,
    ].join('-');
  };
  Date.prototype.hhmmss = function () {
    let hh = this.getHours();
    let mm = this.getMinutes();
    return [(hh > 9 ? '' : '0') + hh, (mm > 9 ? '' : '0') + mm, '00'].join(':');
  };

  const getAllTrainings = useGetAllTrainingsQuery();
  const { results = [] } = getAllTrainings.data;
  // console.log(results, 'results');
  let rows = [];
  results.forEach(({ date, pages, _id }) => {
    rows.push({
      date: new Date(date).yyyymmdd(),
      time: new Date(date).hhmmss(),
      pages,
      id: _id,
    });
  });
  const visibleRows = rows.slice(-5);

  // console.log(rows);
  return (
    <ul className={s.statisticsList}>
      {visibleRows.map(row => (
        <StatisticsRow
          key={visibleRows.id}
          row={row}
          className={s.statisticsList}
        />
      ))}
    </ul>
  );
};
export default StatisticsList;
