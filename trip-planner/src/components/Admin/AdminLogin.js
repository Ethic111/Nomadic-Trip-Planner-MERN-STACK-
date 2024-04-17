import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import {  toast } from 'react-toastify';

// require('dotenv').config();

import "./AdminLogin.css";

function AdminLogin() {

  // const username = process.env.VARIABLE1;
  // const password = process.env.VARIABLE2;

  const username = "admin12";
  const password = "admin@123";

  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');


  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      
      if (enteredUsername!=="" && enteredPassword!=="" && enteredUsername === username && enteredPassword === password) {
        navigate("/admin/dashboard");
      } 
      else{
        alert("Wrong username or password");
        setEnteredUsername("");
        setEnteredPassword("");
      }
    } catch (e) {
      
      alert.error(e.message)
    }
    
  };

  return (
    <>
      <div class="adminloginbody">
        <div class="adminlogincontainer">
          <div class="adminloginscreen">
            <div class="adminloginscreen__content">
              <form class="adminlogin" onSubmit={handleSubmit}>
                <div class="adminlogin__field">
                  <i class="login__icon fas fa-user"></i>
                  <input
                    type="text"
                    class="adminlogin__input"
                    name="username"
                    value={enteredUsername} 
                    onChange={(e) => {
                      setEnteredUsername(e.target.value)
                    }}
                    placeholder="Username"
                    required
                  />
                </div>
                <div class="adminlogin__field">
                  <i class="login__icon fas fa-lock"></i>
                  <input
                    type="password"
                    class="adminlogin__input"
                    name="password"
                    value={enteredPassword} 
                    onChange={(e) => {
                      setEnteredPassword(e.target.value)
                    }}
                    placeholder="Password"
                    required
                  />
                </div>
                <button class="adminloginbutton adminlogin__submit">
                  <span class="adminloginbutton__text">Log In Now </span>
                  <i class="button__icon fas fa-chevron-right"></i>
                </button>
              </form>
              
            </div>
            <div class="adminloginscreen__background">
              <span class="adminloginscreen__background__shape adminloginscreen__background__shape4"></span>
              <span class="adminloginscreen__background__shape adminloginscreen__background__shape3"></span>
              <span class="adminloginscreen__background__shape adminloginscreen__background__shape2"></span>
              <span class="adminloginscreen__background__shape adminloginscreen__background__shape1"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
