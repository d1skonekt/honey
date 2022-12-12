export const DONUT_CHART_PALETTE = [
  '#67b7dc',
  '#6794dc',
  '#6771dc',
  '#8067dc',
  '#a367dc',
  '#c767dc',
  '#dc67ce',
  '#dc67ab',
  '#dc6788',
]

/**
 *
 * @param {number[]} chartData
 * @param {string[]} chartLabels
 * @returns {Record<string,any>}
 */
export const GET_CONFIG = (chartData, chartLabels) => {
  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: chartData,
        backgroundColor: DONUT_CHART_PALETTE,
        borderWidth: 0,
      },
    ],
  }

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: 'white',
          },
        },
      },
    },
  }

  return config
}
