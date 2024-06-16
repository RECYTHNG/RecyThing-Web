import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['User Classic', 'User Silver', 'User Gold', 'User Platinum'],
  datasets: [
    {
      data: [50, 66, 21, 22],
      backgroundColor: ['rgba(222, 145, 73, 1)', 'rgba(166, 166, 166, 1)', 'rgba(239, 189, 70, 1)', '#59A7C4'],
      borderWidth: 0,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          const data = tooltipItem.raw;
          const label = tooltipItem.label;
          return ` ${data} ${label}`;
        },
      },
    },
  },
  responsive: true,
  maintainAspectRatio: true,
  cutout: 70,
};

const DoughnutChart = () => {
  return (
    <section className="py-[22.5px] px-[28px] bg-white rounded-[10px] w-fit flex flex-col items-center gap-5">
      <h2 className="h5 text-black font-semibold">User Achievment</h2>
      <div className="w-[172px] aspect-square relative flex items-center justify-center">
        <Doughnut data={data} options={options} />
        <div className="absolute flex flex-col items-center justify-center">
          <p className="body-l text-[#949596]">User</p>
          <span className="font-bold text-[#585757] h3">220</span>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-x-5 gap-y-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-[#DE9149]"></div>
          <p className="body-m text-dark-900">50 User Classic</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-[#EFBD46]"></div>
          <p className="body-m text-dark-900">21 User Gold</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-[#A6A6A6]"></div>
          <p className="body-m text-dark-900">66 User Silver</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-[#59A7C4]"></div>
          <p className="body-m text-dark-900">22 User Platinum</p>
        </div>
      </div>
    </section>
  );
};

export default DoughnutChart;
