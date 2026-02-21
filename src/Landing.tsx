import React from "react";
import Navbar from "./pages/Navbar"
import "./Landing.css";

function Landing() {
  return (
    <div className="landing-container">
      <Navbar />

      <section className="hero">
        <div className="hero-left">
          <h2>HERO SECTION</h2>
          <p>MESSAGE</p>
          <button className="primary-btn">GET STARTED</button>
        </div>

        <div className="hero-right">
          <div className="placeholder-box">IMAGE</div>
        </div>
      </section>

      <section className="faq">
        <h3>Frequently Asked Questions</h3>

        <div className="faq-item">FAQ 1</div>
        <div className="faq-item">FAQ 2</div>
        <div className="faq-item">FAQ 3</div>
        <div className="faq-item">FAQ 4</div>
      </section>

      <section className="content-section">
        <div className="content-left">
          <div className="placeholder-box">IMAGE</div>
        </div>

        <div className="content-right">
          <div className="line"></div>
          <div className="line short"></div>
          <button className="secondary-btn">BUTTON</button>
        </div>
      </section>

      <footer className="footer">
        <h3>FOOTER</h3>
      </footer>
    </div>
  );
};

export default Landing;