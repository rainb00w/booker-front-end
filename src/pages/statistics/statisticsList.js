import React from 'react';
import StatisticsRow from './StatisticsRow';
import s from './statisticsList.module.css';
import { useGetAllTrainingsQuery } from '../../redux/books/trainingApi';

const StatisticsList = results => {
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

  let rows = [];

  results?.results?.forEach(({ date, pages, _id }) => {
    rows.push({
      date: new Date(date).yyyymmdd(),
      time: new Date(date).hhmmss(),
      pages,
      id: _id,
    });
  });
  const visibleRows = rows.slice(0, 5).reverse();

  return (
    <ul className={s.statisticsList}>
      {visibleRows.map(row => (
        <StatisticsRow key={row.id} row={row} className={s.statisticsList} />
      ))}
    </ul>
  );
};
export default StatisticsList;
