import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { getUserFromLocalStorage } from "../../services/getUserFromLocalStorage";
import MaterialTable from "material-table";
import "./Order.css";
import { toast } from "react-toastify";

const API_URL = "https://uqgeutbaab.execute-api.us-east-1.amazonaws.com/orders";
const Order = ({ logoutOfBnB }) => {
  const user = getUserFromLocalStorage();
  const [data, setData] = useState();

  // let email = user.emailId;
  let email = "";

  // useEffect(() => {
  //   axios
  //     .get(`${API_URL}/${email}`)
  //     .then((response) => {
  //       setData(response.data.myOrders);
  //       console.log(response.data.myOrders);
  //     })
  //     .catch((err) => {
  //       setData({});
  //       console.log("Something went wrong");
  //     });
  // }, []);
  const defaultValues = {
    item: "",
    qty: "",
    email: "",
    roomnumber: "",
    phone: "",
    address: "",
    instructions: "",
  };
  const defaultEmail = {
    email: "",
  };

  const history = useHistory();
  const [formValues, setFormValues] = useState(defaultValues);
  const [useremail, setuserEmail] = useState(defaultEmail);
  const API_URL =
    "https://uqgeutbaab.execute-api.us-east-1.amazonaws.com/orders/";
  const handleEmailChange = e => {
    const { id, value } = e.target;
    setuserEmail(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleInputChange = e => {
    const { id, value } = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };
  const columns = [
    {
      title: "Booking ID",
      field: "id",
    },
    {
      title: "Item",
      field: "item",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Qty",
      field: "qty",
    },

    {
      title: "Phone",
      field: "phone",
    },
    {
      title: "Address",
      field: "address",
    },
    {
      title: "Instructions",
      field: "instructions",
    },
  ];

  const getMyOrders = param => {
    email = param["email"];
    axios
      .get(`${API_URL}/${email}`)
      .then(response => {
        setData(response.data.myOrders);
        console.log(response.data.myOrders);
      })
      .catch(err => {
        setData({});
        console.log("Something went wrong");
      });
  };
  function getPrice(param) {
    switch (param) {
      case "Pizza":
        return "15";
      case "Pasta":
        return "10";
      case "Burger":
        return "5";
      default:
        return "0";
    }
  }
  function handleSubmit(event) {
    if (
      formValues.item == "" ||
      formValues.qty == "" ||
      formValues.email == "" ||
      formValues.qty == "" ||
      formValues.roomnumber == "" ||
      formValues.phone == "" ||
      formValues.item == "" ||
      formValues.instructions == ""
    ) {
      toast.error("Please fill up all the fields!!");
      event.preventDefault();
      return;
    }

    event.preventDefault();
    const body = {
      item: formValues.item,
      qty: formValues.qty,
      email: formValues.email,
      price: getPrice(formValues.item) * parseInt(formValues.qty),
      roomnumber: formValues.roomnumber,
      phone: formValues.phone,
      address: formValues.address,
      instructions: formValues.instructions,
    };
    console.log(body);
    axios({
      method: "put",
      url: API_URL,
      data: body,
    }).then(res => {
      if (res.status == 200) {
        alert("Food order has been placed");
      } else {
        alert("Some error");
      }
    });
  }
  return (
    <div>
      {/* {!user ? "" : <Header />} */}
      <Header logoutOfBnB={logoutOfBnB} />

      <div className="text-center m-5-auto">
        <h2>Welcome!</h2>
        <h5>Please fill up the details for Food Order</h5>
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
                <label>Item:</label>
                <select name="item" id="item" onChange={handleInputChange}>
                  <option value="Pizza">Pizza</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Burger">Burger</option>
                </select>
              </p>
              <p>
                <label>Qty:</label>
                <input
                  type="number"
                  id="qty"
                  name="qty"
                  min="0"
                  max="100"
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <label>Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  required
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <label>Room Number:</label>
                <input
                  type="text"
                  id="roomnumber"
                  name="roomnumber"
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
                <label>Address: (If outside)</label> <t />
                <textarea
                  type="text"
                  name="Address"
                  id="address"
                  rows="4"
                  cols="30"
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <label>Special Instructions:</label>
                <input
                  type="text"
                  id="instructions"
                  name="instructions"
                  required
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <button id="sub_btn" type="submit">
                  Order
                </button>
              </p>
            </form>
          </div>
          <div className="col mb-6">
            <div className="card">
              <div className="card-head">
                <img
                  src="https://i.pinimg.com/originals/c9/3f/24/c93f245aa6c85b1b3bf5e2163c6b1405.jpg?width=660"
                  className="card-img-top"
                  alt="..."
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">Menu</h3>
                <p className="card-text">Pizza 15$ </p>
                <p className="card-text">Pasta 10$ </p>
                <p className="card-text">Burger 5$ </p>
              </div>
            </div>
          </div>
          <div className="col mb-6">
            <h2>My Orders</h2>
            <p>
              <label>Please enter your email:</label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={handleEmailChange}
              />
            </p>
            <p>
              <button
                id="sub_btn"
                style={{ width: "5rem" }}
                onClick={() => {
                  getMyOrders(useremail);
                }}
              >
                Submit
              </button>
            </p>
            <MaterialTable
              style={{
                zIndex: "0",
                fontWeight: "bold",
                boxShadow: "5px 5px 15px -5px black",
                margin: "2rem",
              }}
              title=""
              data={data}
              columns={columns}
              editable={
                {
                  // onRowDelete: (oldData) =>
                  //   new Promise((resolve) => {
                  //     deleteBooking(oldData.id);
                  //   }),
                  // onRowUpdate: (newData, oldData) =>
                  //   new Promise((resolve) => {
                  //   })
                }
              }
              options={{
                actionsColumnIndex: -1,
                addRowPosition: "first",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Order;
