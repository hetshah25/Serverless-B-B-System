import Header from "../Header/Header";
import React, { useState, useEffect } from "react";
import Testing from "./DisplayFeedback";
import { storeFeedbackSentimentToFireBase } from "../../services/sentiment";
import { getUserFromLocalStorage } from "../../services/getUserFromLocalStorage";
import { toast } from "react-toastify";

export default function Feedback({ logoutOfBnB }) {
  const [feedbackData, updateFeedbackData] = useState([]);

  const onChange = e => {
    updateFeedbackData({
      ...feedbackData,
      [e.target.name]: e.target.value,
    });
  };

  //On submit call the function to store the data
  const onSubmit = async e => {
    e.preventDefault();
    try {
      var userName = feedbackData.username;
      var userReview = feedbackData.review;
      var userDay = feedbackData.days;

      if (!userName || !userReview || !userDay) {
        toast.error("Please fill up all the fields!!");
        return;
      }

      if (parseInt(userDay) <= 0) {
        toast.error("Days cannot be negative!!");
        return;
      }

      // Call GCP Cloud function to store details in Firestore
      const res = await storeFeedbackSentimentToFireBase(
        userName,
        userReview,
        userDay,
      );
      if (res) {
        alert("Feedback Registered");
      }
    } catch (error) {
      console.log(error);
      alert("Eroor");
    }
  };

  return (
    <div>
      <Header logoutOfBnB={logoutOfBnB} />{" "}
      <h1 align="center" style={{ marginTop: "20px" }}>
        Feedbacks 📖{" "}
      </h1>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-4 row-cols-xl-7">
        <Testing />
        {getUserFromLocalStorage() != null &&
        getUserFromLocalStorage().isAdmin === "no" ? (
          <div className="text-center mt-5">
            <form
              onSubmit={onSubmit}
              style={{ marginLeft: "200px", marginTop: "130px" }}
            >
              <p>Enter your feedback:</p>
              <lable>Name: </lable>
              <input
                type="text"
                name="username"
                id="username"
                value={feedbackData.username}
                onChange={onChange}
              />{" "}
              <br />
              <br />
              <lable>Number of Days </lable>
              <input
                type="number"
                name="days"
                id="days"
                value={feedbackData.days}
                onChange={onChange}
              />
              <br /> <br />
              <label>Feedback</label>
              <input
                type="text"
                name="review"
                id="review"
                value={feedbackData.review}
                onChange={onChange}
              />{" "}
              <br /> <br />
              <button
                type="submit"
                className="btn btn-primary"
                placeholder="submit"
              >
                Feedback
              </button>
            </form>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
