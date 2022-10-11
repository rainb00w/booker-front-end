import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import s from './statisticsList.module.css';
const StatisticsRow = ({ row }) => {
  const { date, time, pages } = row;
  const { t } = useTranslation();

  return (
    <li className={s.statisticsListItem}>
      <span className={s.cellDate}>{date}</span>
      <span className={s.cellTime}>{time}</span>
      <span className={s.cellPage}>{pages}</span>
      <span className={s.cellPageAfter}>&nbsp;{t('results_pages')}</span>
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
