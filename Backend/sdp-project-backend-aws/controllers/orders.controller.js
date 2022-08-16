const AWS = require("aws-sdk");

var uuid = require("uuid");
var lambda = new AWS.Lambda();

const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = "food-order";

const getAllOrders = async (req, res) => {
  const allOrders = await dynamo.scan({ TableName: TableName }).promise();

  res.json({ message: "Getting all the orders!", allOrders });
};

// const getOrderById = async (req, res) => {
//   const { id } = req.params;

//   const order = await dynamo
//     .get({
//       TableName: TableName,
//       Key: {
//         id: id,
//       },
//     })
//     .promise();
//   res.json({ message: `Getting the order! ${id}`, order });
// };

const addOrder = async (req, res) => {
  const { item, price, qty, email, roomnumber, address, phone, instructions } =
    req.body;
  let id = uuid.v1();
  const params = {
    FunctionName: "logorder", // the lambda function we are going to invoke
    InvocationType: "Event",
    Payload: JSON.stringify({
      email: email,
      item: item,
      quantity: Number(qty),
      price: Number(price),
    }),
  };
  const resFromAddOrder = await dynamo
    .put({
      TableName: TableName,
      Item: {
        id: id,
        item: item,
        email: email,
        price: price,
        qty: qty,
        roomnumber: roomnumber,
        address: address,
        phone: phone,
        instructions: instructions,
      },
    })
    .promise();
  await lambda.invoke(params).promise();

  res.json({
    message: `Adding a new order! ${id}`,
  });
};

const modifyOrder = async (req, res) => {
  const { id } = req.params;
  const { item, qty, roomnumber, address, phone, instructions } = req.body;

  const resFromModifyOrder = await dynamo
    .put({
      TableName: TableName,
      Item: {
        id: id,
        item: item,
        qty: qty,
        roomnumber: roomnumber,
        address: address,
        phone: phone,
        instructions: instructions,
      },
    })
    .promise();
  res.json({
    message: `Modifying an order! ${id}`,
  });
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  const resFromDeleteOrder = await dynamo
    .delete({
      TableName: TableName,
      Key: {
        id: id,
      },
    })
    .promise();
  res.json({
    message: `Deleting an order! ${id}`,
  });
};

const getOrderByEmail = async (req, res) => {
  const { email } = req.params;

  const orders = await dynamo.scan({ TableName: TableName }).promise();
  let myOrders = orders.Items.filter((e) => {
    return e.email == email;
  });
  res.json({ message: `Getting orders! ${email}`, myOrders });
};

module.exports = {
  getAllOrders,

  addOrder,
  modifyOrder,
  deleteOrder,
  getOrderByEmail,
};
