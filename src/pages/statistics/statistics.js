import React from 'react';
import SendPageForm from './sendPageForm';
import StatisticsList from './statisticsList';
import s from './statisticsList.module.css';

import { useGetAllTrainingsQuery } from '../../redux/books/trainingApi';

import ModalYouAreGood from './modal/ModalYouAreGood';
import ModalCongratulate from './modal/ModalCongratulate';
import ModalExit from './modal/ModalExit';

const Statistics = () => {
  // const [getAllTrainings] = useGetAllTrainingsQuery();
  // console.log(getAllTrainings);
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
