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
      ticks: {
        stepSize: 5,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    datalabels: false,
  },
  responsive: true,
};

const labels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

const processData = (data) => {
  return data?.map(month => month.total_reports).filter(total => total !== 0);
};

const processLabels = (data) => {
  return data?.map((month, index) => (month.total_reports !== 0 ? labels[index] : null)).filter(label => label !== null);
};

const LineChart = ({ data }) => {
  const litteringData = processData(data?.report_littering);
  const rubbishData = processData(data?.report_rubbish);
  const filteredLabels = processLabels(data?.report_littering);

  const reportData = {
    labels: filteredLabels,
    datasets: [
      {
        label: "Littering",
        data: litteringData,
        backgroundColor: "#00476D",
        borderColor: "#00476D",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Rubbish",
        data: rubbishData,
        backgroundColor: "#7FB23B",
        borderColor: "#7FB23B",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  return (
    <section className="w-full">
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
        <div className="w-full h-[250px]">
          <Line options={options} data={reportData} />
        </div>
      </div>
    </section>
  )
};

export default LineChart;
