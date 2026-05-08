import React, { useState } from "react";
import "./AuthNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/creators.png'

function AuthNavbar(){
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
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
          <Link to="/services">
            <button className="nav-btn3">SERVICES</button>
          </Link>
          <Link to="/settings">
            <button className="nav-btn3">SETTINGS</button>
          </Link>
        </div>

        <div className="navbar-right">
          <button className="nav-btn4" onClick={() => setShowLogoutModal(true)}>LOGOUT</button>
        </div>
      </nav>

      {showLogoutModal && (
        <div className="logout-modal-overlay">
          <div className="logout-modal-content">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out of your account?</p>
            <div className="logout-modal-actions">
              <button className="logout-cancel-btn" onClick={() => setShowLogoutModal(false)}>
                CANCEL
              </button>
              <button className="logout-confirm-btn" onClick={handleLogout}>
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthNavbar;
