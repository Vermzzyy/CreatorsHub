import React from "react";
import "./Navbar.css";

function Navbar(){
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <p className="title">CREATORS HUB</p>
      </div>

      <div className="navbar-right">
        <button className="nav-btn">LOGIN</button>
        <button className="nav-btn">REGISTER</button>
      </div>
    </nav>
  );
};

export default Navbar;