import React, { useState, useEffect } from "react";
import "./MyBooking.css";
import MaterialTable from "material-table";
import axios from "axios";
import { getUserFromLocalStorage } from "../../services/getUserFromLocalStorage";
import Header from "../Header/Header";

const API_URL =
  "https://uqgeutbaab.execute-api.us-east-1.amazonaws.com/bookings/";

function MyBooking({ logoutOfBnB }) {
  const user = getUserFromLocalStorage();
  const [data, setData] = useState();
  const [fetchAgain, setFetchAgain] = useState(false);

  let email = user.emailId;
  const deleteBooking = (bookingID) => {
    console.log(bookingID);
    axios
      .delete(`${API_URL}/${bookingID}`)
      .then((response) => {
        if (response.data) {
          window.location.reload(true);
        }
      })
      .catch((err) => {
        console.log("Something went wrong");
      });
    setFetchAgain((prev) => !prev);
  };
  useEffect(() => {
    axios
      .get(`${API_URL}/${email}`)
      .then((response) => {
        setData(response.data.bookings);
        console.log(response.data.bookings);
      })
      .catch((err) => {
        setData({});
        console.log("Something went wrong");
      });
  }, []);

  //       *************** FETCH DATA FROM DATABASE AND DISPLAY ON TABLE **************

  //       *************** CREATE COLUMNS AND APPLY VALIDATION ON EACH OPERATION  **************
  const columns = [
    {
      title: "Booking ID",
      field: "id",
    },
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Start Date",
      field: "startdate",
    },
    {
      title: "End Date",
      field: "enddate",
    },
    {
      title: "Adults",
      field: "adults",
    },
    {
      title: "Children",
      field: "children",
    },
    {
      title: "Phone",
      field: "phone",
    },
    {
      title: "Address",
      field: "address",
    },
  ];

  //       *************** CALL POST API FOR ADDING DATA  **************

  //       *************** CALL PUT API FOR UPDATING DATA  **************

  //       *************** CALL DELETE API FOR DELETING DATA  **************

  return (
    <div className="App">
      <Header logoutOfBnB={logoutOfBnB} />
      <h1 align="center" style={{ marginTop: "20px" }}>
        My Bookings{" "}
      </h1>
      <h4 align="center"></h4>
      <div className="container-table">
        <MaterialTable
          style={{
            zIndex: "0",
            fontWeight: "bold",
            boxShadow: "5px 5px 15px -5px black",
          }}
          title=""
          data={data}
          columns={columns}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                deleteBooking(oldData.id);
              }),
            // onRowUpdate: (newData, oldData) =>
            //   new Promise((resolve) => {

            //   })
          }}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
          }}
        />
      </div>
    </div>
  );
}

export default MyBooking;
