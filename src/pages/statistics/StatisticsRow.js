import React from 'react';
import PropTypes from 'prop-types';
import s from './statisticsList.module.css';
const StatisticsRow = ({ row }) => {
  const { date, time, pages } = row;
  const lang = 'стор.';
  return (
    <li className={s.statisticsListItem}>
      <span className={s.cellDate}>{date}</span>
      <span className={s.cellTime}>{time}</span>
      <span className={s.cellPage}>{pages}</span>
      <span className={s.cellPageAfter}>&nbsp;{lang}</span>
    </li>
  );
};
export default StatisticsRow;
StatisticsRow.propTypes = {
  row: PropTypes.shape({
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    pages: PropTypes.number.isRequired,
  }).isRequired,
};
