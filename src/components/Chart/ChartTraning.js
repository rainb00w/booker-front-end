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
import { createOptions } from './ChartTrainingOptions';
import s from './ChartTraning.module.css';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../redux/auth';

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

const ChartTraning = ({ trainingData = {
  startDate: new Date(),
  finishDate: new Date(),
  books: [],
  results: []
} }) => {
  const { startDate, finishDate, books, results } = trainingData;
  const { t } = useTranslation();
  const trainingStatus = useSelector(authSelectors.getTrainingStatus);
  const duration = Date.parse(finishDate) - Date.parse(startDate);
  const totalDays = Math.ceil(duration / (1000 * 3600 * 24));
  const totalBooksPages = books.reduce((acc, item) => acc + item.pages, 0);
  const pagesToRead = Math.ceil(totalBooksPages / totalDays);
  const resultsArray = isArrayNotEmpty(results) ? results.map(result => {
    return {
      date: formatDate(result.date),
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
  for (let i = 0; i <= totalDays; i += 1) {
    planData.push(pagesToRead);
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
  const maxPoint = isArrayNotEmpty(books) ? Math.max(...planData, ...resultData) : 10;
  const data = {
    labels: datesArray, // масив дат для кожного дня тренування
    datasets: [
      {
        label: t('plan'),
        fill: false,
        borderColor: '#091e3f',
        pointBackgroundColor: '#091e3f',
        data: planData, // масив планових значень прочитаних сторінок для кожного дня тренування
      },
      {
        label: t('act'),
        fill: false,
        lineTension: 0.3,
        borderColor: '#ff6b08',
        pointBackgroundColor: '#ff6b08',
        data: resultData, // масив значень кількості прочитаних сторінок для кожного дня тренування
      },
    ],
  };

  const emptyData = {
    labels: ['', '', '', '', ''], // масив дат для кожного дня тренування
    datasets: [
      {
        label: t('plan'),
        fill: false,
        borderColor: '#091e3f',
        pointBackgroundColor: '#091e3f',
        pointHighlightFill: '#F5F7FA',
        data: [10], // масив планових значень прочитаних сторінок для кожного дня тренування
      },
      {
        label: t('act'),
        fill: false,
        lineTension: 0.3,
        borderColor: '#ff6b08',
        pointBackgroundColor: '#ff6b08',
        data: [5], // масив значень кількості прочитаних сторінок для кожного дня тренування
      },
    ],
  };

  return (
    <div className={s.chartBox}>
      <p className={s.title}>
        {t('amontOfPages_day')}
        <span className={s.planedPages}>{isNaN(pagesToRead) ? 0 : trainingStatus ? pagesToRead : 0}</span>
      </p>
      <div className={s.chart}>
        <Line options={createOptions(trainingStatus ? normalizedResults : [0, 0, 0, 0, 0], trainingStatus ? maxPoint : 10, trainingStatus ? planData.length : 5)} data={trainingStatus ? data : emptyData} />
      </div>
      <p className={s.chartValue}> {t('time')}</p>
    </div>
  );
};

export default ChartTraning;
