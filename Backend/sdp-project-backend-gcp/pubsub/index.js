const { PubSub, v1 } = require('@google-cloud/pubsub');
const express = require('express');
const cors = require('cors');
const projectId = 'serverless-bnb-356519';
const app = express();

const topicName = 'serverless-bnb-push-notification';
const pubsub = new PubSub({
  projectId,
});
const subscriberClient = new v1.SubscriberClient({
  projectId,
});
app.use(cors());
app.use(express.json());

app.post('/api/pubsub/topic', async (req, res) => {
  const { message, userNotificationToken } = req.body;
  try {
    await pubsub.topic(topicName).publishMessage({
      data: Buffer.from(JSON.stringify(message)),
      attributes: { userNotificationToken },
    });
    return res.status(200).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
});
app.get('/api/pubsub/topic', async (req, res) => {
  const { userNotificationToken } = req.query;
  const subscriptionName = `subscription-${userNotificationToken}`;
  try {
    await pubsub.topic(topicName).createSubscription(subscriptionName, {
      filter: `attributes.userNotificationToken="${userNotificationToken}"`,
    });
  } catch (error) {}
  try {
    const formattedSubscription = subscriberClient.subscriptionPath(
      projectId,
      subscriptionName,
    );
    const [response] = await subscriberClient.pull({
      subscription: formattedSubscription,
      maxMessages: 10,
    });
    const messages = [];
    const ackIds = [];
    for (const message of response.receivedMessages) {
      messages.push({
        ...JSON.parse(message.message.data.toString()),
        ackId: message.ackId,
      });
      ackIds.push(message.ackId);
    }
    const ackRequest = {
      subscription: formattedSubscription,
      ackIds: ackIds,
    };
    if (ackIds.length) await subscriberClient.acknowledge(ackRequest);
    return res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
});
// app.listen(80);
exports.app = app;
//https://github.com/googleapis/nodejs-pubsub/blob/main/samples/synchronousPullWithDeliveryAttempts.js
