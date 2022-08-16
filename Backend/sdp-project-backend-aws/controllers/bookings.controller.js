const AWS = require("aws-sdk");

var uuid = require("uuid");
var lambda = new AWS.Lambda();

const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = "room-bookings";

const getAllBookings = async (req, res) => {
  const allBookings = await dynamo.scan({ TableName: TableName }).promise();

  res.json({ message: "Getting all the bookings!", allBookings });
};

// const getBookingById = async (req, res) => {
//   const { id } = req.params;

//   const booking = await dynamo
//     .get({
//       TableName: TableName,
//       Key: {
//         id: id,
//       },
//     })
//     .promise();
//   res.json({ message: `Getting the booking! ${id}`, booking });
// };

const getBookingByEmail = async (req, res) => {
  const { email } = req.params;

  const allBookings = await dynamo.scan({ TableName: TableName }).promise();
  let bookings = allBookings.Items.filter((e) => {
    return e.email == email;
  });
  res.json({ message: `Getting bookings! ${email}`, bookings });
};

const addBooking = async (req, res) => {
  const {
    name,
    customerNo,
    email,
    roomType,
    price,
    startdate,
    enddate,
    noOfDays,
    adults,
    children,
    phone,
    address,
  } = req.body;
  let id = uuid.v1();
  const duration = enddate - startdate;
  const params = {
    FunctionName: "logBooking", // the lambda function we are going to invoke
    InvocationType: "Event",
    Payload: JSON.stringify({
      customerId: customerNo,
      startdate: startdate,
      noOfDays: noOfDays.toString(),
      price: noOfDays * price,
      end_date: enddate,
      roomType: roomType,
    }),
  };
  const resFromAddBooking = await dynamo
    .put({
      TableName: TableName,
      Item: {
        id: id,
        name: name,
        customerNo: customerNo,
        email: email,
        roomType: roomType,
        price: price,
        startdate: startdate,
        noOfDays: noOfDays,
        enddate: enddate,
        adults: adults,
        children: children,
        address: address,
        phone: phone,
      },
    })
    .promise();
  await lambda.invoke(params).promise();

  res.json({
    message: `Creating a new booking with the ID - ${id}`,
  });
};

const modifyBooking = async (req, res) => {
  const { id } = req.params;
  const { name, startdate, enddate, adults, children, phone, address } =
    req.body;

  const resFromModifyBooking = await dynamo
    .put({
      TableName: TableName,
      Item: {
        id: id,
        name: name,
        startdate: startdate,
        enddate: enddate,
        adults: adults,
        children: children,
        address: address,
        phone: phone,
      },
    })
    .promise();
  res.json({
    message: `Modifying a booking! ${id}`,
  });
};

const deleteBooking = async (req, res) => {
  const { id } = req.params;

  const resFromDeleteBooking = await dynamo
    .delete({
      TableName: TableName,
      Key: {
        id: id,
      },
    })
    .promise();
  res.json({
    message: `Deleting a booking! ${id}`,
  });
};

module.exports = {
  getAllBookings,
  //getBookingById,
  getBookingByEmail,
  addBooking,
  deleteBooking,
  modifyBooking,
};
