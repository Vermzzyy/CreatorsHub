import { useState } from "react";
import './Register.css';

function Register() {

  return (
    <div className="login-container">
      <div className="left-panel">
        <h2>Create Your Account</h2>
        <p>Sign up to get started with CreatorsHub</p>
      </div>

      <div className="right-panel">
        <div className="login-box">
          <p className="backbtn">Back</p>
          <h3>REGISTER</h3>

          <input 
            type="text"
            placeholder=" First Name"
            className="input-field"
            />

          <input 
            type="text"
            placeholder=" Last Name"
            className="input-field"
            />
          <br/><br/>
          <input
            type="email"
            placeholder=" Email"
            className="input-field"
          />

          <input
            type="password"
            placeholder=" Password"
            className="input-field"
          />

                    <input
            type="password"
            placeholder=" Confirm Password"
            className="input-field"
          />

          <button className="login-btn">REGISTER</button>
                    
          <p className="login-link">
                    Already have an account?
                    <a href="" className="login">Login</a>
                </p>
        </div>
      </div>
    </div>
  );
};


export default Register;
