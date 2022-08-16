const axios = require('axios');
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

var natural = require('natural');
var Analyzer = natural.SentimentAnalyzer;
var stemmer = natural.PorterStemmer;
var analyzer = new Analyzer("English", stemmer, "afinn");

app.use(cors());

const sendSentimentToVisualization = async (sentiment) => {
  try{
    console.log("ajdhaskjhfkjnasdf");
    await axios({
    url: "https://us-central1-serverless-bnb-356519.cloudfunctions.net/bigquery/api/feedback",
    method: "post",
    data: {
      sentiment,
    },
    headers: { 
    'Content-Type': 'application/json'
    },
  });
  }catch(e){console.error("ERROR", e)}
  
}

const sentimentAnalysis = (reviewData) => {
   const array = reviewData.split(" ");
   var feedbackSentiment;
   var sentimentScore;
   sentimentScore = analyzer.getSentiment(array);
   console.log("Sentiment Score is: " + sentimentScore);
   if(sentimentScore < 0)
    {
      feedbackSentiment = "Negative";
    }
   else if(sentimentScore == 0)
    {
      feedbackSentiment = "Nutural";
      }
  else{
      feedbackSentiment = "Positive";
      }
    return feedbackSentiment;
    }


app.get("/", (req, res) => {
  res.send("Storing to Firestore works!!");
});

app.post("/", async (req, res) => {
  const { username, review, days} =
    req.body;
  var sentiment = sentimentAnalysis(review);
  await sendSentimentToVisualization(sentiment);
  return db
    .collection(COLLECTION_NAME)
    .add({ username, review, days, sentiment })
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

