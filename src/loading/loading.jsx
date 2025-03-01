


import React from "react";
import "./loading.css";

const StylishLoading = ({text} ) => {
  return (
    <div className="loading-wrapper">
      <div className="loading-overlay">
        <div className="loading-container">
          <div className="loading-text">
            <p className="textcolor"> {text} </p>
            <div className="loading-dots">
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylishLoading;