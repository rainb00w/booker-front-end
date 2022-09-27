import React from 'react';
import PropTypes from 'prop-types';
import s from './statisticsList.module.css';
const StatisticsRow = ({ row }) => {
  const { date, time, page } = row;
  return (
    <li className={s.statisticsListItem}>
      <span className={s.cellDate}>{date}</span>
      <span className={s.cellTime}>{time}</span>
      <span className={s.cellPage}>{page}</span>
    </li>
  );
};
export default StatisticsRow;
StatisticsRow.propTypes = {
  row: PropTypes.shape({
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
  }).isRequired,
};
