import React from 'react';
import PropTypes from 'prop-types';
const StatisticsRow = ({ row }) => {
  const { date, time, page } = row;
  return (
    <li>
      <span>{date}</span>
      <span>{time}</span>
      <span>{page}</span>
    </li>
  );
};
export default StatisticsRow;
StatisticsRow.propTypes = {
  row: propTypes.shape({
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
  }),
};
