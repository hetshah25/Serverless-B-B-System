import React from "react";
import Header from "../Header/Header";

function AdminDashboard({ logoutOfBnB }) {
  return (
    <div>
      <Header logoutOfBnB={logoutOfBnB} />
      <center>
        <div>
          {/* Report - Feedbacks */}
          <h1>Visualization of feedbacks </h1>
          <iframe
            width="1200"
            height="600"
            src="https://datastudio.google.com/embed/reporting/a321a318-7c6f-46fd-98cb-79414bea769a/page/tEnnC"
            frameborder="1"
            style={{ border: "0" }}
            allowfullscreen
          ></iframe>
        </div>
        <br />
        <div>
          {/* Report - Login statistics */}
          <h1>Report of user login statistics</h1>
          <iframe
            width="1200"
            height="600"
            src="https://datastudio.google.com/embed/reporting/4cf46411-92d5-4c0d-9ff9-d8a4f319edfc/page/tEnnC"
            frameborder="1"
            style={{ border: "0" }}
            allowfullscreen
          ></iframe>
        </div>
        <br />
        <div>
          {/* Report - User bookings */}
          <h1>Visualization of user bookings</h1>
          <iframe
            width="600"
            height="450"
            src="https://datastudio.google.com/embed/reporting/eaa2e6a9-39e0-48b4-8bd5-c81a5ce74303/page/tEnnC"
            frameborder="1"
            style={{ border: "0" }}
            allowfullscreen
          ></iframe>
        </div>
        <br />
        <div>
          {/* Report - Food order */}
          <h1>Visualization of food orders</h1>
          <iframe
            width="600"
            height="450"
            src="https://datastudio.google.com/embed/reporting/118900d0-f59e-4931-ba62-f6a2de434910/page/tEnnC"
            frameborder="1"
            style={{ border: "0" }}
            allowfullscreen
          ></iframe>
        </div>
      </center>
    </div>
  );
}

export default AdminDashboard;
