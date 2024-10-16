import React from "react";
import './PercentageBar.css'; // Ensure this path is correct

const PercentageBar = ({ starText, percentage }) => {
  return (
    <div className="progress-container">
      <span className="progress-text">{starText}</span>
      <div className="progress-middle">
        <div className="progress-wrap">
          <div
            className="progress-bar"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <span className="progress-percent-text">{percentage}%</span>
    </div>
  );
};

export default PercentageBar;
