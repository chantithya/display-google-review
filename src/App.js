import React, { useState } from 'react';
import './App.css';
import Star from "./components/Star";
import Percentagebar from "./components/Percentagebar";
import TotalWrap from "./components/TotalWrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Barchart from './components/Barchart';
import Piechart from './components/Piechart';

import CustomDataTable from './components/CustomDataTable';

import FormScrap from "./components/FormScrap";


export default function App() {

  const handleFormSubmit = (data) => {
    console.log("Form submitted with data:", data);
  };


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





  const [tableData] = useState([
    {
      name: 'Tiger Nixon',
      position: 'System Architect',
      office: 'Edinburgh',
      extn: '5421',
      startDate: '2011-04-25',
      salary: '$320,800',
    },
    {
      name: 'Garrett Winters',
      position: 'Accountant',
      office: 'Tokyo',
      extn: '8422',
      startDate: '2011-07-25',
      salary: '$170,750',
    },
    {
      name: 'Ashton Cox',
      position: 'Junior Technical Author',
      office: 'San Francisco',
      extn: '1562',
      startDate: '2009-01-12',
      salary: '$86,000',
    },
    {
      name: 'Cedric Kelly',
      position: 'Senior Javascript Developer',
      office: 'Edinburgh',
      extn: '6224',
      startDate: '2012-03-29',
      salary: '$433,060',
    },
  ]);

  return (
    <div className="App">
      <Header /> {/* Add Header component */}

      {/* form */}
      <div className="App-container">
        <FormScrap onSubmit={handleFormSubmit} />
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


      <div>
        <CustomDataTable />
      </div>

      <Footer /> {/* Add Footer component */}
    </div>
  );
}
