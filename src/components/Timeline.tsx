import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  TimeScale,
} from "chart.js";
import { OracleResponse } from "../types/OracleResponse";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  TimeScale
);

interface StatsProps {
  history: OracleResponse[];
}

const Timeline: React.FC<StatsProps> = ({ history }) => {
  const colors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(255, 205, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(201, 203, 207, 0.2)",
  ];
  const pointColors = [
    "rgb(255, 99, 132)",
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
    "rgb(153, 102, 255)",
    "rgb(201, 203, 207)",
  ];

  const actionTypes = Array.from(
    new Set(history.map((entry) => entry.action))
  ).sort((a, b) => a - b);

  const datasets = actionTypes.map((action, index) => {
    const groupedData = history
      .filter((entry) => entry.action === action)
      .reduce((acc, entry) => {
        const date = new Date(entry.datetime).toISOString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const sortedDates = Object.keys(groupedData).sort();
    let cumulativeCount = 0;
    const data = sortedDates.map((date) => {
      cumulativeCount += groupedData[date];
      return {
        x: new Date(date),
        y: cumulativeCount,
      };
    });

    return {
      label: `Action ${action}`,
      data,
      borderColor: colors[index % colors.length],
      backgroundColor: pointColors[index % colors.length],
      fill: true,
    };
  });

  const data = {
    datasets,
  };

  // @ts-ignore
  const options: ChartJS.Options<"line"> = {
    plugins: {
      title: {
        text: "Timeline",
        display: true,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          tooltipFormat: "dd/MM/yyyy HH:mm:ss",
          displayFormats: {
            second: "dd/MM/yyyy HH:mm:ss",
          },
        },
        title: {
          display: true,
          text: "Date",
        },
        ticks: {
          callback: (value: string | number | Date) => {
            return new Intl.DateTimeFormat("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }).format(new Date(value));
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
        ticks: {
          callback: (value: { toString: () => any }) => value.toString(),
        },
      },
    },
  };

  return (
    <div style={{ width: "50vw", height: "50vh", margin: "0 auto" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default Timeline;
