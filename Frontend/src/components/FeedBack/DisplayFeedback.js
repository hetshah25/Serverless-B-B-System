import React, { useState, useEffect } from "react";
import "./Testing.css";
import MaterialTable from "material-table";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { getUserFeedbackFromFirebase } from "../../services/sentiment";

function DisplayFeedback({ logoutOfBnB }) {
  //Keep Updated the feedback data on change
  const [userfeedbackData, updateUserFeedbackData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Display feedback when page refreshed
  useEffect(() => {
    const getUserFeedback = async () => {
      setIsLoading(true);
      const res = await getUserFeedbackFromFirebase();
      const { userFeeedbackData: userFeedback } = await res.json();
      updateUserFeedbackData(userFeedback);
      setIsLoading(false);
    };

    // Get feedback from firestore database
    getUserFeedback();
  }, []);

  //       *************** CREATE COLUMNS AND APPLY VALIDATION ON EACH OPERATION  **************
  const columns = [
    {
      title: "Name",
      field: "username",
    },
    {
      title: "Feedback",
      field: "review",
    },
    {
      title: "Sentiment",
      field: "sentiment",
    },
  ];

  return (
    <>
      {!isLoading ? (
        <div className="App">
          <div className="container-table">
            <MaterialTable
              style={{
                zIndex: "0",
                fontWeight: "bold",
                boxShadow: "5px 5px 15px -5px black",
                width: "600px",
              }}
              title=""
              data={userfeedbackData}
              columns={columns}
            />
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

export default DisplayFeedback;
