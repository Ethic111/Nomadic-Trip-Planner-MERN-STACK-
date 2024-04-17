import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Alert.css";

const Alert = ({ message, type }) => {
  const [showAlert, setShowAlert] = useState(true);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return showAlert ? (
    // <div className='alertContainer'>
    // <div className={`custom-alert ${type}`}>
    //   <p>{message}</p>
    //   <button onClick={handleCloseAlert}>Close</button>
    // </div>
    // </div>
    <>
      <div>
        <div id="alertContainer">
          <div id="error-box">
            <div class="dot"></div>
            <div class="dot two"></div>
            <div class="face2">
              <div class="eye"></div>
              <div class="eye right"></div>
              <div class="mouth sad"></div>
            </div>
            <div class="shadow move"></div>
            <div class="message">
              <h1 class="alert">{message}</h1>
            </div>
            <button class="button-box">
              <Link to="/login"><h2 class="red">Login</h2></Link>
            </button>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default Alert;
