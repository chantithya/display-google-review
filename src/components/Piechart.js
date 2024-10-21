import React, { useRef, useState, useEffect } from "react";
import Chart from "react-apexcharts";
import './Piechart.css'; // Import your CSS file

export default function Piechart() {
  const chartRef = useRef(null); // Reference for the chart instance
  const [showMenu, setShowMenu] = useState(false); // State to toggle the menu
  const [chartData, setChartData] = useState({
    labels: ["Excellent", "Very Good", "Average", "Poor", "Terrible"],
    series: [500, 400, 350, 300, 100],
  });

  // Function to download the chart as PNG
  const handleDownloadPNG = () => {
    if (chartRef.current) {
      chartRef.current.chart.dataURI().then(({ imgURI }) => {
        const link = document.createElement('a');
        link.href = imgURI;
        link.download = 'piechart-export.png';
        link.click();
      }).catch((error) => {
        console.error("Error generating PNG:", error);
      });
    }
  };

  // Function to download the chart data as CSV
  const handleDownloadCSV = () => {
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,Rating,Count\n";
    chartData.labels.forEach((label, index) => {
      csvContent += `${label},${chartData.series[index]}\n`;
    });

    // Create a download link and trigger the download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "piechart-data.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
  };

  // Toggle menu visibility
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="piechart-container">
      {/* Download Menu Icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        <i className="fa-solid fa-bars icon"></i>
      </div>

      {/* Dropdown menu */}
      {showMenu && (
        <div className="menu-dropdown">
          <button onClick={handleDownloadPNG}>📷 Download PNG</button>
          <button onClick={handleDownloadCSV}>📊 Download CSV</button>
        </div>
      )}

      {/* Chart title */}
      <div className="piechart-title">Percentage of Each Rating</div>

      {/* Pie chart */}
      <div className="piechart-chart">
        <Chart
          ref={chartRef} // Attach ref to the chart instance
          id="piechart" // Add id for the chart
          type="pie"
          series={chartData.series} // Use dynamic data series
          options={{
            labels: chartData.labels, // Use dynamic data labels
            fill: {
              colors: [
                "rgba(0, 0, 255, 0.6)",    // Excellent
                "rgba(255, 0, 255, 0.6)",  // Very Good
                "rgba(255, 195, 0, 0.6)",  // Average
                "rgba(0, 255, 255, 0.6)",  // Poor
                "rgba(0, 255, 0, 0.6)"     // Terrible
              ]
            },
            legend: {
              position: 'bottom',
              horizontalAlign: 'center',
            },
            plotOptions: {
              pie: {
                expandOnClick: true,
              }
            },
            responsive: [
              {
                breakpoint: 768, // For tablet and smaller screens
                options: {
                  chart: {
                    width: '100%',
                  },
                  legend: {
                    position: 'bottom',
                  },
                },
              },
              {
                breakpoint: 480, // For mobile phones
                options: {
                  chart: {
                    width: '100%',
                  },
                  legend: {
                    position: 'bottom',
                    fontSize: '12px',
                  },
                },
              }
            ]
          }}
        />
      </div>
    </div>
  );
}
