import axios from 'axios';
export default async function getAllMessage({ userNotificationToken }) {
  try {
    const { data } = await axios({
      method: 'get',
      url: `https://us-central1-serverless-bnb-356519.cloudfunctions.net/bnbpubsub/api/pubsub/topic/?userNotificationToken=${userNotificationToken}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.error('Something went wrong. Please try again.');
  }
}
