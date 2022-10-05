import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import s from './ChartTraning.module.css';
import { useTranslation } from 'react-i18next';

const ChartTraning = () => {
  const { t } = useTranslation();
  const data = {
    labels: ['', '', '', '', '', '', ''], //!! Поки що для прикладу
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
        data: [1, 2, 3, 4, 5], //!! Поки що для прикладу
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
        data: [8, 9, 10, 11, 12], //!! Поки що для прикладу
      },
    ],
  };

  const options = {
    scales: {
      yAxis: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      <div className={s.modalBox}>
        <div className={s.chartBox}>
          <p className={s.title}>
           {t('amontOfPages_day')}
            <span className={s.planedPages}>34</span>
          </p>
          <div className={s.lineBox}>
            <ul className={s.lineList}>
              <li className={s.lineItem}>{t('plan')}</li>    
              <li className={s.lineItem}>  {t('act')}</li>  
            </ul>
          </div>
          <Line options={options} data={data} />
          <p className={s.chartValue}> {t('time')}</p>   
        </div>
      </div>
    </>
  );
};

export default ChartTraning;
