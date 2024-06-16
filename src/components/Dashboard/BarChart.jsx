import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['Cimahi', 'Cibereum', 'Bandung', 'Surabaya', 'Malang', 'Bekasi', 'Majalengka', 'Pontianak', 'Rancaekek', 'Kediri', 'Ngapak', 'Cilengsi', 'Nganjuk', 'Lampung', 'Batam', 'Depok', 'Bogor', 'Riau Utara', 'Sambas', 'Tokyo'];

// Fungsi untuk membuat data acak antara min dan max
const getRandomData = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => getRandomData(100, 1000)),
      backgroundColor: 'rgba(2, 144, 226, 1)',
    },
  ],
};

function App() {
  return (
    <section className="bg-white rounded-[10px]">
      <Bar options={options} data={data} />
    </section>
  );
}

export default App;
