import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const labels = ['Cimahi', 'Cibereum', 'Bandung', 'Surabaya', 'Malang', 'Bekasi', 'Majalengka', 'Pontianak', 'Rancaekek', 'Kediri', 'Ngapak', 'Cilengsi', 'Nganjuk', 'Lampung', 'Batam', 'Depok', 'Bogor', 'Riau Utara', 'Sambas', 'Tokyo'];

const getRandomData = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const data = {
  labels,
  datasets: [
    {
      data: labels.map(() => getRandomData(100, 1000)),
      backgroundColor: 'rgba(2, 144, 226, 1)',
    },
  ],
};

function App() {
  return (
    <div className="container mx-auto w-[1118px] p-4 rounded-[10px] shadow-lg bg-white">
      <Bar options={options} data={data} />
    </div>
  );
}

export default App;
