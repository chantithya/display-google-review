import React, { Component } from "react";
import Chart from "react-apexcharts";

export default function Piechart() {
  return (

    <div style={{ height: '350px', position: 'relative' }}>
      <Chart
              type="pie"
              series= {[500, 400, 350, 300, 100]}
              options={{
                  title: { text: "Percentage of Each Rating"},
                  labels: ["Exellent", "Very Good", "Average", "Poor", "Teribble"],
                  fill: {
                      colors: [
                        "rgba(0, 0, 255, 0.6)", // Exellent
                        "rgba(255, 0, 255,0.6)", // Very Good
                        "rgba(255, 195, 0,0.6)", // Average
                        "rgba(0, 255, 255,0.6)", // Poor
                        "rgba(0, 255, 0,0.6)"  // Terrible
                      ]
                    },
              }}
          />
    </div>
  )
}
