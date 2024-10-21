import React, { useState } from 'react';
import './App.css';
import Star from "./components/Star";
import Percentagebar from "./components/Percentagebar";
import TotalWrap from "./components/TotalWrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Barchart from './components/Barchart';
import Piechart from './components/Piechart';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => { 
    e.preventDefault();

    // Use this data to trigger scraping function
    console.log("Keyword:", keyword);
    console.log("StartDate:", startDate);
    console.log("EndDate:", endDate); 

    // Reset form fields to empty strings
    setKeyword('');
    setStartDate('');
    setEndDate('');
  }


  // barchart
  const chartData = [
    {
      label: "Excellent",
      values: [500, 0, 0, 0, 0], // Only for Excellent
      color: "rgba(0, 0, 255, 0.6)",
    },
    {
      label: "Very Good",
      values: [0, 400, 0, 0, 0], // Only for Very Good
      color: "rgba(255, 0, 255, 0.6)",
    },
    {
      label: "Average",
      values: [0, 0, 350, 0, 0], // Only for Average
      color: "rgba(255, 195, 0, 0.6)",
    },
    {
      label: "Poor",
      values: [0, 0, 0, 300, 0], // Only for Poor
      color: "rgba(0, 255, 255, 0.6)",
    },
    {
      label: "Terrible",
      values: [0, 0, 0, 0, 100], // Only for Terrible
      color: "rgba(0, 255, 0, 0.6)",
    },
  ];

  return (
    <div className="App">
      <Header /> {/* Add Header component */}

      {/* form */}
      <div className="App-container">
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
      </div>

      {/*  */}

      <div className="container">
        <div className='form-group'>
          <div className="review-container">
            
              <h1 className="title">Customer reviews</h1>
                <div>
                  <TotalWrap rating={4.7} />
                </div>
                <p className="amount-text">40 customer ratings</p>

                <div className="row">
                  <div className="spacer">
                    <Percentagebar starText="5 Stars" percentage={84} />
                  </div>
                  <div className="spacer">
                    <Percentagebar starText="4 Stars" percentage={9} />
                  </div>
                  <div className="spacer">
                    <Percentagebar starText="3 Stars" percentage={4} />
                  </div>
                  <div className="spacer">
                    <Percentagebar starText="2 Stars" percentage={2} />
                  </div>
                  <div className="spacer">
                    <Percentagebar starText="1 Stars" percentage={1} />
                  </div>
                </div>
          
              

          </div>
        </div>
        <div className='form-group'>
          <div className="review-container">
            <Barchart chartData={chartData} />
          </div>
        </div>
        <div className='form-group'>
          <div className="review-container">
            < Piechart/ >
          </div>
        </div>
        <div>&nbsp;</div>
      </div>

      <Footer /> {/* Add Footer component */}
    </div>
  );
}
