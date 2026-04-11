import React from "react";
import "./PublicNavbar.css";
import { Link } from "react-router-dom";
import Logo from '../../assets/creators.png'

function PublicNavbar(){
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
        <Link to='/login'>
        <button className="nav-btn1">LOGIN</button>
        </Link>
        <Link to ='/register'>
        <button className="nav-btn2">REGISTER</button>
        </Link>
      </div>
    </nav>
  );
};

export default PublicNavbar;
