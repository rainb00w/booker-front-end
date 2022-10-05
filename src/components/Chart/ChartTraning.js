import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { createOptions } from './ChartTrainingOptions';
import s from './ChartTraning.module.css';
import { useTranslation } from 'react-i18next';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const ChartTraning = ({ trainingData }) => {
  const { t } = useTranslation();
  function getDaysArray(start, end) {
    const arr = [];
    for (const dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
      arr.push(formatDate(new Date(dt)));
    }
    return arr;
  };
  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
  };

  const duration = Date.parse(trainingData['finishDate']) - Date.parse(trainingData['startDate']);
  const totalDays = Math.ceil(duration / (1000 * 3600 * 24));
  const totalBooksPages = trainingData['books'].reduce((acc, item) => acc + item.pages, 0);
  const resultsArray = trainingData.results?.map(result => {
    const dateCropped = result.date.slice(0, 10)
    return {
      date: dateCropped,
      pages: result.pages
    }
  });
  const planData = [];
  const resultData = [];
  const datesArray = getDaysArray(trainingData['startDate'], trainingData['finishDate']);
  const normalizedResults = Object.values(resultsArray?.reduce((acc, { date, pages }) => {
    if (!acc[date]) {
      acc[date] = Object.assign({}, { date, pages });
    }
    else {
      acc[date].pages += pages;
    }
    return acc;
  }, {}));
  for (let i = 0; i < totalDays; i += 1) {
    planData.push(totalBooksPages / totalDays);
    normalizedResults.forEach(item => {
      if (item.date === datesArray[i]) {
        resultData.push(item.pages);
      } else {
        resultData.push(0);
      }
    })
  }
  const maxPoint = Math.max(...planData, ...resultData);

  const data = {
    labels: datesArray, // масив дат для кожного дня тренування
    datasets: [
      {
        label: 'Plan',
        fill: false,
        lineTension: 0.3,
        borderColor: '#091e3f',
        pointBackgroundColor: '#091e3f',
        pointHoverRadius: 10,
        pointRadius: 8,
        PointHitRadius: 10,
        data: planData, // масив планових значень прочитаних сторінок для кожного дня тренування
      },
      {
        label: 'Fact',
        fill: false,
        lineTension: 0.3,
        borderColor: '#ff6b08',
        pointBackgroundColor: '#ff6b08',
        pointHoverRadius: 10,
        pointRadius: 8,
        PointHitRadius: 10,
        data: resultData, // масив значень кількості прочитаних сторінок для кожного дня тренування
      },
    ],
  };

  return (
    <>
      <div className={s.modalBox}>
        <div className={s.chartBox}>
          <p className={s.title}>
           {t('amontOfPages_day')}
            <span className={s.planedPages}>{datesArray.length}</span>
          </p>
          <div className={s.lineBox}>
            <ul className={s.lineList}>
              <li className={s.lineItem}>{t('plan')}</li>
              <li className={s.lineItem}>  {t('act')}</li>
            </ul>
          </div>
          <Line options={createOptions(normalizedResults, maxPoint, planData.length)} data={data} />
          <p className={s.chartValue}> {t('time')}</p>
        </div>
      </div>
    </>
  );
};

export default ChartTraning;
