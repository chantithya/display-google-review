import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, defaults } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";


export default function Barchart() {
  const data = {
    labels: ["Exellent", "Very Good", "Average", "Poor", "Teribble"],
    datasets: [
      {
        label: "Revenue",
        data: [500, 400, 350, 300, 100],
        backgroundColor: [
            "rgba(0, 0, 255,0.6)", 
            "rgba(255, 0, 255,0.6)",
            "rgba(255, 195, 0,0.6)",
            "rgba(0, 255, 255,0.6)",
            "rgba(0, 255, 0,0.6)",
            
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Bar Chart',
      },
    },
  };

  return (
      <Bar data={data} options={options} />
  );
}
