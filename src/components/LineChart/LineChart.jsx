import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ label, labels, data }) => {
  const chartRef = useRef(null);
  const minTemp = Math.min(...data);
  const maxTemp = Math.max(...data);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.5)',
            data,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: label,
        },
        },
        scales: {
          y: {
            beginAtZero: true,
            min: minTemp,
            max: maxTemp,
          },
        },
        layout: {
          padding: 10,
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default LineChart;