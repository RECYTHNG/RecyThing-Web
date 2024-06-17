import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 20,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const labels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"];

const generateRandomData = (min, max, numPoints) => {
  const data = [];
  for (let i = 0; i < numPoints; i++) {
    data.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return data;
};

const data = {
  labels,
  datasets: [
    {
      label: "Littering",
      data: generateRandomData(10, 100, labels.length),
      backgroundColor: "#00476D",
      borderColor: "#00476D",
      fill: false,
      tension: 0.4,
    },
    {
      label: "Rubbish",
      data: generateRandomData(10, 100, labels.length),
      backgroundColor: "#7FB23B",
      borderColor: "#7FB23B",
      fill: false,
      tension: 0.4,
    },
  ],
};

const LineChart = () => {
  return (
    <section>
      <div className="bg-white p-5 rounded-[10px]">
        <div className="flex justify-between items-center pb-6">
          <h5 className="h5 font-semibold">Reporting Statistic</h5>
          <div className="flex gap-5">
            <div className="flex gap-2 items-center">
              <div className="rounded-full w-2 h-2 bg-[#00476D]"></div>
              <p className="sub-s">Littering</p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="rounded-full w-2 h-2 bg-[#7FB23B]"></div>
              <p className="sub-s">Rubbish</p>
            </div>
          </div>
        </div>
        <div className="h-[296px]">
          <Line options={options} data={data} />
        </div>
      </div>
    </section>
  )
};

export default LineChart;
