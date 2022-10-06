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

  // const rows = [
  //   { date: '10.10.2019', time: '08:08:00', pages: 32 },
  //   { date: '11.10.2019', time: '09:08:00', pages: 154 },
  //   { date: '12.10.2019', time: '10:08:00', pages: 7 },
  //   { date: '13.10.2019', time: '11:08:00', pages: 12 },
  //   { date: '14.10.2019', time: '12:08:00', pages: 21 },
  // ];
  const getAllTrainings = useGetAllTrainingsQuery();
  const { results = [] } = getAllTrainings.data;
  console.log(results, 'results');
  let rows = [];
  results.forEach(element => {
    rows.push({
      date: new Date(element.date).yyyymmdd(),
      time: new Date(element.date).hhmmss(),
      pages: element.pages,
      id: element._id,
    });
  });

  console.log(rows);
  return (
    <ul className={s.statisticsList}>
      {rows.map(row => (
        <StatisticsRow key={row.id} row={row} className={s.statisticsList} />
      ))}
    </ul>
  );
};
export default StatisticsList;
