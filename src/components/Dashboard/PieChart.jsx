import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const userByGenderData = {
  labels: ["Laki Laki", "Perempuan", "Other"],
  datasets: [
    {
      data: [54.90, 37.25, 7.84],
      backgroundColor: ["#55B5EC", "#0290E2", "#8BCCF2"],
      borderWidth: 0,
    },
  ],
};

const rubbishCriteriaData = {
  labels: ["Sampah Basah", "Sampah Kering", "Sampah Basah & Kering"],
  datasets: [
    {
      data: [39.29, 33.93, 26.79],
      backgroundColor: ["#0290E2", "#55B5EC", "#8BCCF2"],
      borderWidth: 0,
    },
  ],
};

const litteringCriteriaData = {
  labels: ["Organik", "Anorganik", "Berbahaya"],
  datasets: [
    {
      data: [27.27, 43.18, 29.55],
      backgroundColor: ["#0290E2", "#55B5EC", "#8BCCF2"],
      borderWidth: 0,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      onClick: (e) => {
        e.stopPropagation();
      },
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        boxWidth: 10,
        font: {
          size: 10,
        },
        formatter: function (value, ctx) {
          return `${value}`;
        },
        padding: 10,
      },
      interactive: false,
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          const total = tooltipItem.dataset.data.reduce((acc, value) => acc + value, 0);
          const value = tooltipItem.raw;
          const percentage = ((value / total) * 100).toFixed(0);
          return `${value} (${percentage}%)`;
        },
      },
      interactive: false,
    },
    datalabels: {
      formatter: (value, ctx) => {
        let total = 0;
        const dataset = ctx.chart.data.datasets[0].data;
        dataset.forEach((data) => {
          total += data;
        });
        const percentage = Math.round((value / total) * 100);
        return `${percentage}%`;
      },
      color: "#fff",
      font: {
        weight: "bold",
      },
    },
  },
  responsive: true,
  maintainAspectRatio: true,
};

const PieChart = () => {
  return (

    <div className="grid grid-cols-3 gap-[22px]">
      <div className="py-[22.5px] px-[28px] bg-white rounded-[10px] flex flex-col gap-5 w-full">
        <h2 className="text-[20px] text-black font-semibold text-start">User By Gender</h2>
        <div className="w-full flex items-center justify-center">
          <div className="min-w-[216px] aspect-square flex items-center justify-center">
            <Pie data={userByGenderData} options={options} />
          </div>
        </div>
      </div>

      <div className="py-[22.5px] px-[28px] bg-white rounded-[10px] flex flex-col gap-5 w-full">
        <h2 className="text-[20px] text-black font-semibold text-start">Rubbish Criteria</h2>
        <div className="w-full flex items-center justify-center">
          <div className="min-w-[216px] aspect-square flex items-center justify-center">
            <Pie data={rubbishCriteriaData} options={options} />
          </div>
        </div>
      </div>

      <div className="py-[22.5px] px-[28px] bg-white rounded-[10px] flex flex-col gap-5 w-full">
        <h2 className="text-[20px] text-black font-semibold text-start">Littering Criteria</h2>
        <div className="w-full flex items-center justify-center">
          <div className="min-w-[216px] aspect-square flex items-center justify-center">
            <Pie data={litteringCriteriaData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
