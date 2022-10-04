import React from 'react';
import SendPageForm from './sendPageForm';
import StatisticsList from './statisticsList';
import s from './statisticsList.module.css';

import ModalYouAreGood from './modal/ModalYouAreGood';
import ModalCongratulate from './modal/ModalCongratulate';
import ModalExit from './modal/ModalExit';
import Timer from 'components/Timer/Timer';
import { StyledTimerContainer } from './statistics.style';
import BookTableTraining from 'components/bookTableTraining/bookTableTraining';
import BookMobileTableTraining from 'components/bookTableTraining/bookMobileTableTraining';

const Statistics = ({ endDate, endYear, selectedBooks }) => {
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
