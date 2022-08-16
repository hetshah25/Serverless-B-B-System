const { BigQuery } = require('@google-cloud/bigquery');
const express = require('express');
const cors = require('cors');
const projectId = 'serverless-bnb-356519';
const app = express();
const bigquery = new BigQuery({
  keyFilename: './serverless-bnb-356519-be0251f21861.json',
});
const datasetId = 'bnb';
const bookingTableId = 'UserBooking';
const orderFoodTableId = 'FoodOrder';
const feedbackTableId = 'UserFeedback';
const userLoginTableId = 'UserLogin';

app.use(cors());
app.use(express.json());

app.post('/api/booking/', async (req, res) => {
  const {
    roomType,
    price,
    numberOfDays,
    bookingDate = new Date().toISOString().split('Z')[0],
    startDate,
    endDate,
  } = req.body;
  try {
    await bigquery.dataset(datasetId).table(bookingTableId).insert({
      roomType,
      price,
      numberOfDays,
      bookingDate,
      startDate,
      endDate,
    });
    return res.status(200).send();
  } catch (error) {
    return res.status(500).send();
  }
});
app.post('/api/feedback/', async (req, res) => {
  const { sentiment } = req.body;
  try {
    await bigquery.dataset(datasetId).table(feedbackTableId).insert({
      sentiment,
    });
    return res.status(200).send();
  } catch (error) {
    console.log('ERROR', error.response.insertErrors[0]);
    return res.status(500).send();
  }
});
app.post('/api/food/', async (req, res) => {
  const {
    item,
    quantity,
    orderDate = new Date().toISOString().split('Z')[0],
    price,
  } = req.body;
  try {
    await bigquery.dataset(datasetId).table(orderFoodTableId).insert({
      item,
      quantity,
      orderDate,
      price,
    });
    return res.status(200).send();
  } catch (error) {
    console.log('ERROR', error.response.insertErrors[0]);
    return res.status(500).send();
  }
});
app.post('/api/user/', async (req, res) => {
  const { loginTime = new Date().toISOString().split('Z')[0], email } =
    req.body;
  try {
    await bigquery.dataset(datasetId).table(userLoginTableId).insert({
      loginTime,
      email,
    });
    return res.status(200).send();
  } catch (error) {
    console.log('ERROR', error.response.insertErrors[0]);
    return res.status(500).send();
  }
});
app.listen(80);
// exports.app = app;
//https://github.com/googleapis/nodejs-pubsub/blob/main/samples/synchronousPullWithDeliveryAttempts.js
