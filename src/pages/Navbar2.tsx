import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logo from '../assets/creators.png'

function Navbar2(){
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src={ Logo }
          className="navbar-logo"
          alt="creators logo"
        />      
        </div>

      <div className="navbar-right">

      </div>
    </nav>
  );
};

export default Navbar2;