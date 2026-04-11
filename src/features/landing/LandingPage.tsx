import React from "react";
import PublicNavbar from "../../shared/components/PublicNavbar"
import "./Landing.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-container">
      <PublicNavbar />

      <section className="hero">
        <div className="hero-left">

          <h2>
          Find the <span className="right">Right Creator</span> <br/>
          for Your Next Project.
        </h2>
          <p>Discover designers, developers, editors, and creators <br/>ready to bring your ideas to life.</p>
          <Link to='register'>
          <button className="primary-btn">GET STARTED</button>
          </Link>
        </div>

      </section>

      <section className="faq">
        <h3 className="faq-title">Frequently Asked Questions</h3>
        <p className="faq-subtitle">Not sure about something? Find quick answers to the most common questions below.</p>

        <div className="faq-item">
          <span>What is Creators Hub?</span>
          <span className="faq-icon">v</span>
        </div>
        <div className="faq-item">
          <span>How do I book a service?</span>
          <span className="faq-icon">v</span>
        </div>
        <div className="faq-item">
          <span>How can I track my orders?</span>
          <span className="faq-icon">v</span>
        </div>
      </section>

      <section className="cta-section">
        <h2 className="cta-title">Build, Create, and Collaborate</h2>
        <p className="cta-subtitle">
          Discover creative services from talented professionals and<br />
          turn your ideas into reality with Creators Hub.
        </p>
        <Link to='/home'>
          <button className="primary-btn center-btn">BROWSE SERVICES</button>
        </Link>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <h3 className="footer-logo">CREATORS HUB</h3>
            <p className="footer-tagline">
              Connecting talent and opportunity through a<br />seamless digital marketplace.
            </p>
          </div>
          <div className="footer-right">
            <h4>Contact</h4>
            <p>support@creatorshub.com</p>
            <p>+1 (555) 123-4567</p>
            <p>Education District, Learning City</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 CreatorsHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
