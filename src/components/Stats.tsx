import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface StatsProps {
  actionsHistory: Map<number, number>;
}

const Stats: React.FC<StatsProps> = ({ actionsHistory }) => {
  const sortedEntries = [...actionsHistory.entries()].sort(([keyA], [keyB]) => keyA - keyB);

  const sortedKeys = sortedEntries.map(([key]) => key);
  const sortedValues = sortedEntries.map(([_, value]) => value);

  const data = {
    labels: sortedKeys.map(key => `Action ${key}`),
    datasets: [
      {
        label: 'Number of times',
        data: sortedValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Actions Frequency',
      },
    },
  };

  return (
    <div style={{ width: "50vw", height: "50vh", margin: "0 auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Stats;
