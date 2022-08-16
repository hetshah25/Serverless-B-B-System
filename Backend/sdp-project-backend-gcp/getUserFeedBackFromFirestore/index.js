const express = require("express");
const app = express();
const Firestore = require("@google-cloud/firestore");
const cors = require("cors");

const PROJECT_ID = "copper-diorama-356822";
const COLLECTION_NAME = "feedback";

const db = new Firestore({
    projectId: PROJECT_ID,
    timestampsInSnapshots: true,
});

app.use(cors());

app.get("/", (req, res) => {
    res.send("Getting from Firestore works!!");
});

// Reference - https://git.cs.dal.ca/sjdas/csci5410_b00911733_saurabh_das/-/blob/main/assignment-2/Part-A/registration-backend-login/app.js
app.get("/users", async (req, res) => {
    // const { emailId } = req.params;
    // console.log("Email", emailId);
    const coll = db.collection(COLLECTION_NAME);

    try {
        const feedbacks = await coll.get();
        var userFeedback = [];

        for (let i = 0; i < feedbacks.docs.length; i++) {
            let feedBack = {}
            feedBack = feedbacks.docs[i].data();
            // userFeedback.push(feedbacks.docs[i].data());
            userFeedback.push(feedBack);
            console.log("User details:", userFeedback);

        }
        res.status(200).send({
            message: "User details found",
            userFeeedbackData: userFeedback,
        });

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
