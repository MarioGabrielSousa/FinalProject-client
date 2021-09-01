import React from "react";
import "./Styles/home.css";

function Home() {
  return (
    <div className="home-page">
      <div className="left">
        <img src="/images/home-img.png" alt="home-img" />
      </div>
      <div className="right">
        <h1>DAILY DOSE</h1>
        <p>DIGITAL NOTEBOOK FOR YOUR WORKOUT ROUTINES</p>
      </div>
    </div>
  );
}

export default Home;
