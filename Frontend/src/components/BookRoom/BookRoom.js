import React, { useState } from "react";
import Header from "../Header/Header";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import { getUserFromLocalStorage } from "../../services/getUserFromLocalStorage";
import moment from "moment";
import { toast } from "react-toastify";

const BookRoom = ({ logoutOfBnB }) => {
  const user = getUserFromLocalStorage();
  const defaultValues = {
    name: user.firstName + " " + user.lastName,
    customerNo: user.customerNo,
    email: "",
    roomType: "",
    startdate: "",
    enddate: "",
    adults: "",
    children: "",
    phone: "",
    address: "",
  };
  const [formValues, setFormValues] = useState(defaultValues);
  const API_URL =
    "https://uqgeutbaab.execute-api.us-east-1.amazonaws.com/bookings/";
  const history = useHistory();
  const handleInputChange = e => {
    const { id, value } = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };
  function getPrice(param) {
    switch (param) {
      case "Standard":
        return "99";
      case "Deluxe":
        return "199";
      case "Suite":
        return "249";
      default:
        return "0";
    }
  }
  function handleSubmit(event) {
    // checks
    const stDate = new Date(moment(formValues.startdate).format("YYYY-MM-DD"));
    const edDate = new Date(moment(formValues.enddate).format("YYYY-MM-DD"));

    console.log("stDate", stDate);
    console.log("edDate", edDate);

    if (stDate > edDate) {
      console.log("Error date");
      toast.error("Dates invalid!!");
      event.preventDefault();
      return;
    }

    event.preventDefault();
    const body = {
      name: formValues.name,
      //   From local storage
      customerNo: user.customerNo,
      email: user.emailId,
      roomType: formValues.roomType,
      price: getPrice(formValues.roomType),
      startdate: moment(formValues.startdate).format("YYYY-MM-DD"),
      enddate: moment(formValues.enddate).format("YYYY-MM-DD"),
      noOfDays: moment(formValues.enddate).diff(
        moment(formValues.startdate),
        "days",
      ),
      adults: formValues.adults,
      children: formValues.children,
      phone: formValues.phone,
      address: formValues.address,
    };
    console.log(body);
    axios({
      method: "put",
      url: API_URL,
      data: body,
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then(res => {
      if (res.status == 200) {
        alert("Booking Confirmed!");
        history.push("/user-dashboard");
      } else {
        alert("Some error");
      }
    });
  }
  return (
    <div>
      <Header logoutOfBnB={logoutOfBnB} />
      <div className="text-center m-5-auto">
        <h2>Welcome!</h2>
        <h5>Please fill up details for Room Booking</h5>
        <div
          className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-4 row-cols-xl-7"
          style={{
            justifyContent: "center",
            alignContent: "center",
            marginTop: "20px",
          }}
        >
          <div className="col mb-6">
            <form onSubmit={handleSubmit} style={{ width: "700px" }}>
              <p>
                <label>Customer Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formValues.name}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <label>Room Type</label>
                {/* <input type="text" id='roomType' name="roomType" required onChange={handleInputChange} /> */}
                <select
                  name="roomType"
                  id="roomType"
                  onChange={handleInputChange}
                >
                  <option value="Standard">Standard</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Suite">Suite</option>
                </select>
              </p>
              <p>
                <label>Start Date</label>
                <input
                  type="date"
                  name="startdate"
                  id="startdate"
                  required
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <label>End Date</label>
                <input
                  type="date"
                  name="enddate"
                  id="enddate"
                  required
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <label>Number of Adults</label>
                <input
                  type="number"
                  id="adults"
                  name="adults"
                  min="0"
                  max="100"
                  required
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <label>Number of Children</label>
                <input
                  type="number"
                  id="children"
                  name="children"
                  min="0"
                  max="100"
                  required
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <label>Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  required
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <label>Address:</label> <t />
                <textarea
                  type="text"
                  name="Address"
                  id="address"
                  rows="4"
                  cols="30"
                  required
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <button id="sub_btn" type="submit">
                  Book
                </button>
              </p>
            </form>
          </div>
          <div className="col mb-6">
            <div className="card">
              <img
                src="https://image-tc.galaxy.tf/wijpeg-3zkucfkrdkvgv677gtzp6jd1w/file.jpg?width=860"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">The Barrington Hotel</h5>
                <p className="card-text">
                  1875 Barrington Street, Downtown Halifax, B3J 3L6
                </p>
                <a href="/order-food">
                  <button
                    className={"button"}
                    style={{
                      backgroundColor: "rgb(42, 82, 190)",
                      color: "#ffffff",
                      border: "rgb(42, 82, 190)",
                      padding: "5px",
                    }}
                  >
                    Order food with us 👉
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookRoom;
