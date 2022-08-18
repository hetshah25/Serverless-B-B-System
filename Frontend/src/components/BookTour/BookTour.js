import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { getUserFromLocalStorage } from "../../services/getUserFromLocalStorage";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";

const BookTour = ({ logoutOfBnB }) => {
  const user = getUserFromLocalStorage();
  const [isLoading, setIsLoading] = useState(false);

  const [packageList, setPackageList] = useState();
  const [daysRequested, setDaysRequested] = useState(1);
  const [mostPreferredPackage, setMostPreferredPackage] = useState();
  const [packageBookingOptions, setPackageBookingOptions] = useState();
  const [selectedPackage, setSelectedPackage] = useState();
  const [tourBookingFormData, setTourBookingFormData] = useState({
    name: user.firstName + " " + user.lastName,
    email: user.emailId,
    customer_number: user.customerNo,
    phone: "",
    address: "",
    package_name: "",
    days: "",
  });

  const axios = require("axios");
  const GET_TOURS_CLOUD_FUNCTION_URI =
    "https://us-central1-finalproject-356523.cloudfunctions.net/getTourPackages";
  const GET_ALL_TOURS_CLOUD_FUNCTION_URI =
    "https://us-central1-finalproject-356523.cloudfunctions.net/TourManager/";

  useEffect(() => {
    var axios = require("axios");
    var config = {
      method: "get",
      url: GET_ALL_TOURS_CLOUD_FUNCTION_URI + "getTours",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer ",
      },
    };
    axios(config)
      .then(function (response) {
        let allTours = response.data.packageData;
        setPackageBookingOptions(allTours);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  function requestTour() {
    if (daysRequested == "") {
      toast.error("Days cannot be empty!!");
      return;
    }
    if (parseInt(daysRequested) <= 0) {
      toast.error("Number of days cannot be negative or zero");
      return;
    }
    setIsLoading(true);
    let days =
      parseInt(document.querySelector("#daysRequested").value) > 5
        ? Math.floor(Math.random() * 6).toString()
        : document.querySelector("#daysRequested").value;
    var data = JSON.stringify({
      days: days,
    });
    var config = {
      method: "POST",
      url: GET_TOURS_CLOUD_FUNCTION_URI,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjA3NGI5MjhlZGY2NWE2ZjQ3MGM3MWIwYTI0N2JkMGY3YTRjOWNjYmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA5NDY2OTQ5MTE4NjQ2NTQ3MjI2IiwiZW1haWwiOiJtZW5rc2FyZWVuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiWkwwbmNYa3FOc0hZUk82S0xVNXhjdyIsImlhdCI6MTY1ODUzNTE0MywiZXhwIjoxNjU4NTM4NzQzLCJqdGkiOiJkNTFlNzcwZThmNGMzM2JhN2MwMDc1YjI1N2I1NGZhZjNlNTczMjFiIn0.lPOjtS3LRTBws73tVsk_KN1QzHx2LpXEJohrZ_mF1OwtQR0dN7c8BAlkZu8SJ7CiBf4CDR6B9rv_rSGHuSD5INiaZRyeioACgJIV66M73ZAxjYlVZhNwnOP67cZk8PDkjkIK7vGnyXZqjr9qGo4HXnvRnHmUrntd_kXmSaGIXlePwTB2yffO7GCtlBTzx_IgQ3S4mPfI2Z6niteRVaYuyCyZnp1Ylwc2AUYB6wmJPAeIzoSIx1ymlrsDewPqmTMesmqgvD7zs9mAv7iRzC-2iCZTzaFFD5UQ4ZTbKzyFZbcjWzjinuDKORqwAAIJqWJS2gywS1GrJFnPVDVls3nkMA",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setPackageList(response.data.packages);
        setMostPreferredPackage(response.data.recommendation);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function bookingTour() {
    if (
      tourBookingFormData.phone == "" ||
      tourBookingFormData.package_name == "" ||
      tourBookingFormData.days == "" ||
      tourBookingFormData.address == ""
    ) {
      toast.error("All fields must be filled up!!");
      return;
    }
    if (tourBookingFormData.days == "") {
      toast.error("Days cannot be empty!!");
      return;
    }
    if (parseInt(tourBookingFormData.days) <= 0) {
      toast.error("Number of days cannot be negative or zero");
      return;
    }
    setIsLoading(true);
    tourBookingFormData.name = document.querySelector("#tourFormName").value;
    tourBookingFormData.phone = document.querySelector("#tourFormPhone").value;
    tourBookingFormData.email = document.querySelector("#tourFormEmail").value;
    tourBookingFormData.address =
      document.querySelector("#tourFormAddress").value;
    tourBookingFormData.package_name = document.querySelector(
      "#packageToursSelect",
    ).value;
    tourBookingFormData.days = document.querySelector("#tourFormDays").value;
    setTourBookingFormData({ ...tourBookingFormData });
    var data = JSON.stringify({
      emailId: tourBookingFormData.email,
      customerNumber: tourBookingFormData.customer_number,
      name: tourBookingFormData.name,
      address: tourBookingFormData.address,
      days: tourBookingFormData.days,
      phone: tourBookingFormData.phone,
      package_name: tourBookingFormData.package_name,
    });
    var config = {
      method: "POST",
      url: GET_ALL_TOURS_CLOUD_FUNCTION_URI + "bookTour",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjA3NGI5MjhlZGY2NWE2ZjQ3MGM3MWIwYTI0N2JkMGY3YTRjOWNjYmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA5NDY2OTQ5MTE4NjQ2NTQ3MjI2IiwiZW1haWwiOiJtZW5rc2FyZWVuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiWkwwbmNYa3FOc0hZUk82S0xVNXhjdyIsImlhdCI6MTY1ODUzNTE0MywiZXhwIjoxNjU4NTM4NzQzLCJqdGkiOiJkNTFlNzcwZThmNGMzM2JhN2MwMDc1YjI1N2I1NGZhZjNlNTczMjFiIn0.lPOjtS3LRTBws73tVsk_KN1QzHx2LpXEJohrZ_mF1OwtQR0dN7c8BAlkZu8SJ7CiBf4CDR6B9rv_rSGHuSD5INiaZRyeioACgJIV66M73ZAxjYlVZhNwnOP67cZk8PDkjkIK7vGnyXZqjr9qGo4HXnvRnHmUrntd_kXmSaGIXlePwTB2yffO7GCtlBTzx_IgQ3S4mPfI2Z6niteRVaYuyCyZnp1Ylwc2AUYB6wmJPAeIzoSIx1ymlrsDewPqmTMesmqgvD7zs9mAv7iRzC-2iCZTzaFFD5UQ4ZTbKzyFZbcjWzjinuDKORqwAAIJqWJS2gywS1GrJFnPVDVls3nkMA",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleFormChange(event) {
    tourBookingFormData[event.target.name] = event.target.value;
    setTourBookingFormData({ ...tourBookingFormData });
  }

  return (
    <>
      {!isLoading ? (
        <>
          <div>
            <Header logoutOfBnB={logoutOfBnB} />
          </div>
          <div className="text-center mb-3 m-5-auto">
            <h2>Bed and Breakfast tour request</h2>
            <form>
              <p>
                <label>Enter the number of days</label>
                <br />
                <input
                  id="daysRequested"
                  type="number"
                  name="number"
                  min="1"
                  onChange={event => {
                    setDaysRequested(event.target.value);
                  }}
                  value={daysRequested}
                  required
                />
              </p>
            </form>
            <center>
              <p>
                <button
                  id="sub_btn"
                  onClick={requestTour}
                  style={{ width: "15%" }}
                >
                  View Tailored Tour Packages
                </button>
              </p>
            </center>
            <br></br>
            <br></br>
            <h6>
              Based on the number of days you put, we will recommend what other
              customers have chosen in past.
            </h6>
            <br />
            <div
              className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-4 row-cols-xl-7"
              style={{
                justifyContent: "center",
                alignContent: "center",
                marginLeft: "20px",
              }}
            >
              {packageList &&
                packageList.map(row => {
                  return (
                    <div className="col text-center mb-7">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title"> {row.name}</h5>
                          <p className="card-text">{row.description}</p>
                          <h6 className="card-title">Price : $ {row.price}</h6>
                          <button
                            className={"button"}
                            style={{
                              backgroundColor: "black",
                              color: "#ffffff",
                              width: "60%",
                              border: "rgb(42, 82, 190)",
                            }}
                            onClick={() => {
                              tourBookingFormData.package_name = row.name;
                              setTourBookingFormData({
                                ...tourBookingFormData,
                              });
                              setSelectedPackage(row.name);
                            }}
                          >
                            Select Package
                          </button>
                          {row.name === mostPreferredPackage && (
                            <h5 style={{ color: "green" }}>
                              {" "}
                              Mostly Preferred by our Customers!
                            </h5>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              {packageList && packageList.length == 0 && (
                <h5 style={{ color: "Orange" }}>No Packages found!</h5>
              )}
            </div>
            <div className="text-center">
              <h2>Tour Request Form</h2>
              <form style={{ width: "700px" }}>
                <p>
                  <label> Name:</label>
                  <input
                    disabled
                    id="tourFormName"
                    type="text"
                    name="name"
                    value={tourBookingFormData.name}
                    required
                  />
                </p>
                <p>
                  <label>Email:</label>
                  <input
                    disabled
                    id="tourFormEmail"
                    type="text"
                    name="email"
                    value={tourBookingFormData.email}
                    required
                  />
                </p>
                <p>
                  <label>Phone Number:</label>
                  <input
                    onChange={handleFormChange}
                    type="text"
                    name="phone"
                    id="tourFormPhone"
                    value={tourBookingFormData.phone}
                    required
                  />
                </p>
                <p>
                  <label>Our Tours</label>
                  <select
                    id="packageToursSelect"
                    name="package_name"
                    onChange={handleFormChange}
                  >
                    {packageBookingOptions &&
                      packageBookingOptions.map(row => {
                        return (
                          <>
                            {row.name === selectedPackage && (
                              <option selected>{row.name}</option>
                            )}
                            {row.name !== selectedPackage && (
                              <option>{row.name}</option>
                            )}
                          </>
                        );
                      })}
                  </select>
                </p>
                <p>
                  <label>Number of days:</label>
                  <input
                    type="number"
                    id="tourFormDays"
                    value={tourBookingFormData.days}
                    name="days"
                    min="1"
                    onChange={handleFormChange}
                  />
                </p>
                <p>
                  <label>Address:</label> <t />
                  <textarea
                    id="tourFormAddress"
                    type="text"
                    name="address"
                    onChange={handleFormChange}
                    value={tourBookingFormData.address}
                    rows="4"
                    cols="30"
                    required
                  />
                </p>
              </form>
              <center>
                <p>
                  <button
                    id="sub_btn"
                    onClick={bookingTour}
                    style={{ width: "15%" }}
                  >
                    Book Tour
                  </button>
                </p>
              </center>
            </div>
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};
export default BookTour;
