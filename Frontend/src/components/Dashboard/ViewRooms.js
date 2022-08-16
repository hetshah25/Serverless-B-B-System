import React from "react";
import roomStandard from "../../assets/images/room-standard.jpg";
import roomDeluxe from "../../assets/images/room-deluxe.jpg";
import roomSuite from "../../assets/images/room-suite.jpg";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

import "./dashboard.css";
const ViewRooms = ({ logoutOfBnB }) => {
  return (
    <div className="body">
      <Header logoutOfBnB={logoutOfBnB} />
      <h1 className="welcome" style={{ marginTop: "3rem" }}>
        Welcome <span>🏨</span>
      </h1>
      <div>
        <div
          className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-4 row-cols-xl-7"
          style={{
            justifyContent: "center",
            alignContent: "center",
            marginTop: "20px",
          }}
        >
          <div className="col mb-7">
            <div className="card">
              <img src={roomStandard} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Standard Room</h5>
                <p className="card-text">$ 99 / night</p>
              </div>
            </div>
          </div>
          <div className="col mb-7">
            <div className="card">
              <img src={roomDeluxe} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Deluxe Room</h5>
                <p className="card-text">$ 199 / night</p>
              </div>
            </div>
          </div>
          <div className="col mb-6" onClick={console.log("Pressed")}>
            <div className="card">
              <img src={roomSuite} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Suite Room</h5>
                <p className="card-text">$ 249 / night</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-4 row-cols-xl-7"
        style={{
          justifyContent: "center",
          alignContent: "center",
          marginTop: "20px",
          position: "absolute",
          bottom: "5rem",
          left: "50%",
        }}
      >
        <Button variant="outlined" size="large">
          <Link to="/bookroom">Book Room</Link>
        </Button>
      </div>
    </div>
  );
};

export default ViewRooms;
