import React, { useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, defaults } from 'chart.js';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import './Barchart.css'; // Import CSS file

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "#323357";

export default function Barchart() {
  const chartRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const data = {
    labels: ["Excellent", "Very Good", "Average", "Poor", "Terrible"],
    datasets: [
      {
        label: "Revenue",
        data: [500, 400, 350, 300, 100],
        backgroundColor: [
          "rgba(0, 0, 255, 0.6)",
          "rgba(255, 0, 255, 0.6)",
          "rgba(255, 195, 0, 0.6)",
          "rgba(0, 255, 255, 0.6)",
          "rgba(0, 255, 0, 0.6)",
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
      // Background color
      beforeDraw: (chart) => {
        const ctx = chart.canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'white'; // Set background color to white
        ctx.fillRect(0, 0, chart.width, chart.height); // Draw white background
        ctx.restore();
      },
    },
  };

  // Function to download the chart as PNG with white background
  const downloadPNG = () => {
    const chart = chartRef.current;
    if (chart) {
      const a = document.createElement('a');
      a.href = chart.toBase64Image();
      a.download = 'chart.png';
      a.click();
    }
  };

  // Function to download the data as CSV
  const downloadCSV = () => {
    const csvData = [
      ["Label", "Revenue"],
      ...data.labels.map((label, index) => [label, data.datasets[0].data[index]]),
    ]
      .map(row => row.join(","))
      .join("\n");

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chart-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Handle format selection
  const handleSelectFormat = (format) => {
    setIsDropdownOpen(false); // Close the dropdown first
    if (format === 'png') {
      downloadPNG(); // Directly download PNG
    } else if (format === 'csv') {
      downloadCSV(); // Directly download CSV
    }
  };

  return (
    <div style={{ height: '350px', position: 'relative' }}>
      {/* Menu for Download Options */}
      <div className="menu">
        <div className="dropdown">
          <div className="iconButton" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <i className="fa-solid fa-bars icon"></i>
          </div>
          {isDropdownOpen && (
            <div className="options">
              <div className="option" onClick={() => handleSelectFormat('png')}>
                Download PNG
              </div>
              <div className="option" onClick={() => handleSelectFormat('csv')}>
                Download CSV
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bar Chart */}
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
}
