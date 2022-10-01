import React from 'react';
import SendPageForm from './sendPageForm';
import StatisticsList from './statisticsList';
import s from './statisticsList.module.css';

import ModalYouAreGood from './modal/ModalYouAreGood';
import ModalCongratulate from './modal/ModalCongratulate';
import ModalExit from './modal/ModalExit';

const Statistics = () => {
  return (
    <>
      <div className={s.container}>
        <h2 className={s.resultsHeader}>Результати</h2>
        <SendPageForm />
        <h2 className={s.statisticsHeader}>Статистика</h2>
        <StatisticsList />
      </div>
      <ModalYouAreGood />
      <ModalCongratulate />
      <ModalExit />
    </>
  );
};

export default Statistics;
