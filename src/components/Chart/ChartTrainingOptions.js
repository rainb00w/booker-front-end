export const createOptions = (normalizeResults, maxPoint, labelsQuantity) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  layout: {
    autoPadding: true,
    padding: 0,
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
      radius: 6,
      hoverRadius: 12,
      borderWidth: 0,
      hoverBorderWidth: 0,
    },
    line: {
      tension: 0.3,
      borderCapStyle: 'round',
    },
  },
});
