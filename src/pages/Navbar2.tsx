import React from "react";
import "./Navbar2.css";
import { Link } from "react-router-dom";
import Logo from '../assets/creators.png'

function Navbar2(){
  return (
    <nav className="navbar3">
      <div className="navbar-left">
        <img
          src={ Logo }
          className="navbar-logo"
          alt="creators logo"
        />      
        </div>

      <div className="navbar-center">
        <Link to="/home">
        <button className="nav-btn3">HOME</button>
        </Link>
        <button className="nav-btn3">SERVICES</button>
        <Link to="/settings">
        <button className="nav-btn3">SETTINGS</button>
        </Link>
      </div>

      <div className="navbar-right">
        <button className="nav-btn4">LOGOUT</button>
      </div>
    </nav>
  );
};

export default Navbar2;