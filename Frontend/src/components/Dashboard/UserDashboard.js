import React from "react";
import Header from "../Header/Header";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";
import MyBooking from "./MyBooking";

const UserDashboard = ({ logoutOfBnB }) => {
  // Get user so that then you can check if he / she is admin then show all the details or else show only some details
  return (
    <>
      <Header logoutOfBnB={logoutOfBnB} />
      <MyBooking />
      <div className="body">
        <h1
          className="welcome"
          style={{
            backgroundColor: "black",
            color: "white",
            width: "350px",
            textAlign: "center",
            marginLeft: "650px",
          }}
        >
          User Details <span>🤵</span>
        </h1>
        <div>
          <div
            className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-4 row-cols-xl-7"
            style={{
              justifyContent: "center",
              alignContent: "center",
              marginTop: "20px",
              marginLeft: "100px",
            }}
          >
            <div className="col mb-7">
              <div className="card" style={{ width: "600px" }}>
                <div className="card-body">
                  <h5 className="card-title">User Past login details</h5>
                </div>
              </div>
            </div>
            <div className="col mb-7">
              <div className="card" style={{ width: "600px" }}>
                <div className="card-body">
                  <h5 className="card-title">Customer Booking Graph</h5>
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
              marginLeft: "100px",
            }}
          >
            <div className="col mb-7">
              <div className="card" style={{ width: "600px" }}>
                <div className="card-body">
                  <h5 className="card-title">Cutomer Food Orders</h5>
                </div>
              </div>
            </div>
            <div className="col mb-7">
              <div className="card" style={{ width: "600px" }}>
                <div className="card-body">
                  <h5 className="card-title">Profit or Income Charts</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;

// export default function App() {
//   return (
//     <>
//       <MDBCard className='w-75'>
//         <MDBCardBody>
//           <MDBCardTitle>Card title</MDBCardTitle>
//           <MDBCardText>With supporting text below as a natural lead-in to additional content.</MDBCardText>
//           <MDBBtn href='#'>Button</MDBBtn>
//         </MDBCardBody>
//       </MDBCard>

//       <br />

//       <MDBCard className='w-50'>
//         <MDBCardBody>
//           <MDBCardTitle>Card title</MDBCardTitle>
//           <MDBCardText>With supporting text below as a natural lead-in to additional content.</MDBCardText>
//           <MDBBtn href='#'>Button</MDBBtn>
//         </MDBCardBody>
//       </MDBCard>
//     </>
//   );
// }
