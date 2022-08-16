const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  console.log("Uer added:", event);
  const tableName = "user-customers";

  if (event.request.userAttributes.sub) {
    const userData = event.request.userAttributes;
    const newCustomer = {
      Item: {
        emailId: userData.email,
        firstName: userData["custom:firstName"],
        lastName: userData["custom:lastName"],
        isAdmin: "no",
        customerNo: userData.sub,
      },
      TableName: tableName,
    };

    try {
      await db.put(newCustomer).promise();
      context.succeed(event);
    } catch (e) {
      console.log("Error", e);
      context.done(null, event);
    }
  }
};
