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
  res.send("Storing to Firestore works!!");
});

app.post("/", (req, res) => {
  const { emailId, secQues1, secAns1, secQues2, secAns2, caesarPlain } =
    req.body;
  return db
    .collection(COLLECTION_NAME)
    .add({ emailId, secQues1, secAns1, secQues2, secAns2, caesarPlain })
    .then(doc => {
      console.info("stored new doc id#", doc.id);
      return res.status(200).send(doc);
    })
    .catch(err => {
      console.error(err);
      return res.status(404).send({
        error: "unable to store",
        err,
      });
    });
});

exports.app = app;
