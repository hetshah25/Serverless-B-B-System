const express = require("express");
const app = express();
const Firestore = require("@google-cloud/firestore");
const cors = require("cors");
const axios = require("axios");
const PROJECT_ID = "finalproject-356523";
const COLLECTION_NAME = "packages-offerred";

const db = new Firestore({
  projectId: PROJECT_ID,
  timestampsInSnapshots: true,
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("Getting from Firestore works!!");
});

app.get("/getTours", async (req, res) => {
  const coll = db.collection(COLLECTION_NAME);

  try {
    const packages = await coll.get();
    let packageList = [];

    for (let i = 0; i < packages.docs.length; i++) {
      packageList.push(packages.docs[i].data());
    }
    if (packageList.length > 0) {
      res.status(200).send({
        message: "Package list retrieved successfully",
        packageData: packageList,
      });
    } else {
      res.status(404).send({
        message: "Could not retrieve package details",
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

app.post("/bookTour", async (req, res) => {
  const { emailId, customerNumber, name, address, days, phone, package_name } =
    req.body;

  try {
    await db.collection("tour-bookings").add({
      emailId,
      customerNumber,
      name,
      address,
      days,
      phone,
      package_name,
    });
  } catch (error) {
    console.log("DB ERROR", error);
  }
  try {
    await axios({
      method: "post",
      url: "https://us-central1-serverless-bnb-356519.cloudfunctions.net/bnbpubsub/api/pubsub/topic",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        message: {
          message:
            "Your tour booking for package  '" +
            package_name +
            "'  is successful!",
          category: "tour",
          data: [],
        },
        userNotificationToken: customerNumber,
      },
    });
  } catch (error) {
    console.log("DB ERROR", error);
  }

  res.status(200).send();
});

exports.app = app;
