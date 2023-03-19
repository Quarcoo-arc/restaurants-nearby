import React from "react";
import spinnerGif from "../../assets/imgs/spinner.gif";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner">
      <img src={spinnerGif} alt="Loading" />
      <h2>Fetching restaurants near you!</h2>
    </div>
  );
};

export default Spinner;
