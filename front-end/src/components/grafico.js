import React from 'react';
import { Line } from 'react-chartjs-2';

const Grafico = ({ data, title, label }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default Grafico;
