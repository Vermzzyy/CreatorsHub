import React from "react";
import "./AuthNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/creators.png'

function AuthNavbar(){

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInEmail");
    navigate("/login");
  };

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
        <button className="nav-btn4" onClick={handleLogout}>LOGOUT</button>
      </div>
    </nav>
  );
};

export default AuthNavbar;
