import React from "react";
import './App.css';
import Star from "./components/Star";
import Percentagebar from "./components/Percentagebar";
import TotalWrap from "./components/TotalWrap";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="App">
      <Header /> {/* Add Header component */}
      <div className="container">
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
      <Footer /> {/* Add Footer component */}
    </div>
    
  );
}
