import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const processUserData = (data) => {
  const labels = [];
  const totalReports = [];
  let otherLabelIndex = -1;

  data?.forEach((item, index) => {
    if (item.city === "") {
      otherLabelIndex = index;
    } else {
      labels.push(item.city);
      totalReports.push(item.total_report);
    }
  });

  if (otherLabelIndex !== -1) {
    labels.push("Other");
    totalReports.push(data[otherLabelIndex].total_report);
  }

  return { labels, totalReports };
};

function BarChart({ data }) {
  const userData = processUserData(data);

  const maxTotalReports = Math.max(...userData.totalReports); // Temukan nilai maksimum dari totalReports

  const userByLocationData = {
    labels: userData.labels,
    datasets: [
      {
        label: "Total Users",
        data: userData.totalReports,
        backgroundColor: "rgba(2, 144, 226, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        max: maxTotalReports + 5,
      },
    },
  };
  

  return (
    <section className="bg-white rounded-[10px] p-5 w-full">
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
