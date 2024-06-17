import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};


const processUserData = (data) => {
  const labels = [];
  const totalUsers = [];
  let otherLabelIndex = -1;

  data?.forEach((item, index) => {
    if (item.city === '') {
      otherLabelIndex = index;
    } else {
      labels.push(item.city);
      totalUsers.push(item.total_user);
    }
  });

  if (otherLabelIndex !== -1) {
    labels.push('Other');
    totalUsers.push(data[otherLabelIndex].total_user);
  }

  return { labels, totalUsers };
};

function BarChart({data}) {
  const userData = processUserData(data);

  const userByLocationData = {
    labels: userData.labels,
    datasets: [
      {
        label: 'Total Users',
        data: userData.totalUsers,
        backgroundColor: 'rgba(2, 144, 226, 1)',
      },
    ],
  };

  return (
    <section className="bg-white rounded-[10px] p-5">
      <div className="flex justify-between items-center pb-6">
        <h5 className="h5 font-semibold text-neutral-900">Data Based On Location</h5>
      </div>
      <div className="w-full h-[250px]">
        <Bar options={options} data={userByLocationData} />
      </div>
    </section>
  );
}

export default BarChart;
