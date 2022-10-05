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

function getDaysArray(start, end) {
  const arr = [];
  for (const dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
    arr.push(formatDate(new Date(dt)));
  }
  return arr;
};

function formatDate(date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
};

function isArrayNotEmpty(array) {
  if (Array.isArray(array) && array.length) return true;
  else return false;
}

const ChartTraning = ({ trainingData }) => {
  const { startDate, finishDate, books, results } = trainingData;
  const { t } = useTranslation();
  const duration = Date.parse(finishDate) - Date.parse(startDate);
  const totalDays = Math.ceil(duration / (1000 * 3600 * 24));
  const totalBooksPages = books.reduce((acc, item) => acc + item.pages, 0);
  const resultsArray = isArrayNotEmpty(results) ? results.map(result => {
    const dateCropped = result.date.slice(0, 10)
    return {
      date: dateCropped,
      pages: result.pages
    }
  }) : [];
  const planData = [];
  const resultData = [];
  const datesArray = getDaysArray(startDate, finishDate);
  const normalizedResults = isArrayNotEmpty(resultsArray) ? Object.values(resultsArray.reduce((acc, { date, pages }) => {
    if (!acc[date]) {
      acc[date] = Object.assign({}, { date, pages });
    }
    else {
      acc[date].pages += pages;
    }
    return acc;
  }, {})) : [];
  for (let i = 0; i < totalDays; i += 1) {
    planData.push(totalBooksPages / totalDays);
  }
  datesArray.forEach((item, index) => {
    if (isArrayNotEmpty(normalizedResults)) {
      const foundValue = normalizedResults.find(result => result.date === item)
      if (foundValue) {
        resultData[index] = foundValue.pages;
      } else {
        resultData[index] = 0;
      }
    } else {
        resultData[index] = 0;
      }
  });
  const maxPoint = Math.max(...planData, ...resultData);

  const data = {
    labels: datesArray, // масив дат для кожного дня тренування
    datasets: [
      {
        label: t('plan'),
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
        label: t('act'),
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
            <span className={s.planedPages}>{totalBooksPages / totalDays}</span>
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
