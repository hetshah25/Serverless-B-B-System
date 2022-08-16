import React from "react";
import { Link } from "react-router-dom";

import "../../App.css";
import BackgroundImage from "../../assets/images/homeimage_2.jpg";

export default function LandingPageLoggedIn() {
  return (
    <header style={HeaderStyle}>
      <h1 className="main-title text-center">Bed & Breakfast</h1>
      <p className="main-para text-center">join us now</p>
      <div className="buttons text-center">
        <Link to="/view-rooms">
          <button className="primary-button" id="viewRoom_btn">
            <span>View Rooms </span>
          </button>
        </Link>
        <Link to="/feedback">
          <button className="primary-button" id="feedBack_btn">
            <span>Feedback From Customer </span>
          </button>
        </Link>
        <Link to="/order-food">
          <button className="primary-button" id="order_btn">
            <span>Order food</span>
          </button>
        </Link>
        <Link to="/booktour">
          <button className="primary-button" id="tour_btn">
            <span>Book tour</span>
          </button>
        </Link>
        <Link to="/user-dashboard">
          <button className="primary-button" id="tour_btn">
            <span>View past bookings</span>
          </button>
        </Link>
      </div>
    </header>
  );
}

const HeaderStyle = {
  width: "100%",
  height: "100vh",
  background: `url(${BackgroundImage})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};
