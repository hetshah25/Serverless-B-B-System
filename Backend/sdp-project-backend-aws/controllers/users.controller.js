const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "user-customers";

const getUser = async (req, res) => {
  const { emailId } = req.params;

  const user = await dynamo
    .get({
      TableName: TABLE_NAME,
      Key: {
        emailId: emailId,
      },
    })
    .promise();
  res.json({ message: `Getting the user! ${emailId}`, user: user});
};

module.exports = {
  getUser,
};
