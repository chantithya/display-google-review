// src/components/FormScrap.js
import React, { useState } from 'react';
import './FormScrap.css'; // Optional: You can create a CSS file for styling this component.

export default function FormScrap({ onSubmit }) {
  const [keyword, setKeyword] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ keyword, startDate, endDate });
  };

  return (
    <div className="form-app">
      <h1 className="form-title">Google Review Scraping</h1>
      <p className="form-description">Input a keyword and time range to scrape Google reviews.</p>

      <form onSubmit={handleSubmit} className="scraper-form">
        {/* Keyword Input */}
        <div className="form-group">
          <label htmlFor="keyword" className="form-label">Keyword</label>
          <input
            type="text"
            id="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keyword (e.g., 'cake shop')"
            required
            className="form-input"
          />
        </div>

        {/* Start Date Input */}
        <div className="form-group">
          <label htmlFor="startDate" className="form-label">Start Date</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="form-input"
          />
        </div>

        {/* End Date Input */}
        <div className="form-group">
          <label htmlFor="endDate" className="form-label">End Date</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="form-input"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Start Scraping</button>
      </form>
    </div>
  );
}
