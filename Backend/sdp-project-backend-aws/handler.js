const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const {
  usersRoute,
  ordersRoute,
  bookingsRoute,
  caesarRoute,
} = require("./routes/index.js");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRoute);
app.use("/orders", ordersRoute);
app.use("/bookings", bookingsRoute);
app.use("/caesar", caesarRoute);

app.get("/", async (req, res) => {
  res.json("Fallback route");
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
