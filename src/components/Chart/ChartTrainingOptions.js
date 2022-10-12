export const createOptions = (normalizeResults, maxPoint, labelsQuantity) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      onClick: null,
      labels: {
        padding: 15,
        usePointStyle: true,
        font: {
          family: 'Montserrat',
          size: 12,
          weight: 600,
          lineHeight: 1.25,
        },
        generateLabels: chart => {
          const data = chart.data;
          return data.datasets.map(dataset => ({
            text: dataset.label,
            fillStyle: dataset.borderColor,
            fontColor: '#091E3F',
            strokeStyle: 'transparent',
          }));
        },
      },
    },
    tooltip: {
      backgroundColor: '#F5F7FA',
      caretPadding: 10,
      titleColor: '#091E3F',
      titleFont: {
        family: 'Montserrat',
        size: 12,
        weight: 600,
        lineHeight: 1.25,
        color: '#091E3F',
      },
      bodyColor: '#091E3F',
      bodyFont: {
        family: 'Montserrat',
        size: 12,
        weight: 600,
        lineHeight: 1.25,
        color: '#091E3F',
      },
      padding: 10,
      displayColors: false,
      cornerRadius: 0,
    },
  },
  layout: {
    autoPadding: true,
  },
  scales: {
    x: {
      min:
        normalizeResults.length <= 0
          ? labelsQuantity
          : normalizeResults.length - labelsQuantity,
      max: normalizeResults.length - 1,
      grid: {
        borderColor: '#B1B5C2',
        borderWidth: 1,
        display: true,
        drawOnChartArea: true,
        drawTicks: false,
        color: '#B1B5C2',
      },
      ticks: {
        display: false,
        color: '#000000',
      },
      // offset: true,
    },
    y: {
      min: 0,
      max: maxPoint + 10,
      grid: {
        display: false,
        borderColor: '#B1B5C2',
      },
      ticks: {
        display: false,
        color: '#000000',
      },
    },
  },
  elements: {
    point: {
      radius: 5,
      hoverRadius: 10,
      borderWidth: 0,
      hoverBorderWidth: 0,
    },
    line: {
      borderCapStyle: 'round',
    },
  },
});
