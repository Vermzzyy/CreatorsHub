import { useState } from "react";
import Navbar from './pages/Navbar2'
import './Home.css'

function Home() {

  return (
    <div className="homecontainer">
      <Navbar />
      <h1 className="hometitle">HOME</h1>
    </div>
  );
};


export default Home;
