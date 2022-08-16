const express = require("express");
const app = express();
const Firestore = require("@google-cloud/firestore");
const cors = require("cors");

const PROJECT_ID = "serverless-bnb-356519";
const COLLECTION_NAME = "users-auth";

const db = new Firestore({
  projectId: PROJECT_ID,
  timestampsInSnapshots: true,
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("Getting from Firestore works!!");
});

// Reference - https://git.cs.dal.ca/sjdas/csci5410_b00911733_saurabh_das/-/blob/main/assignment-2/Part-A/registration-backend-login/app.js
app.get("/:emailId", async (req, res) => {
  const { emailId } = req.params;
  console.log("Email", emailId);
  const coll = db.collection(COLLECTION_NAME);

  try {
    const users = await coll.get();
    let userDetails = {};

    for (let i = 0; i < users.docs.length; i++) {
      if (users.docs[i].data().emailId == emailId) {
        userDetails = users.docs[i].data();
        console.log("User details:", userDetails);
        break;
      }
    }

    if (userDetails.emailId) {
      res.status(200).send({
        message: "User details found",
        userData: { ...userDetails },
      });
    } else {
      res.status(404).send({
        message: "Could not retrieve user details",
      });
    }
  } catch (error) {
    console.log("Error occurred!!");
    console.log(error);
    res.status(404).send({
      message: "Error occurred!!",
      error: error.message,
    });
  }
});

exports.app = app;
