const axios = require("axios");

exports.handler = async (event) => {
    
    const {
        customerId: customerNo,
        roomType,
        price,
        noOfDays: numberOfDays,
        startdate: startDate,
        end_date: endDate
    } = event;
    
    try{
        await axios({
        method: 'post',
        url: 'https://us-central1-serverless-bnb-356519.cloudfunctions.net/bigquery/api/booking',
        data: {
            roomType,
            numberOfDays,
            price,
            startDate,
            endDate
        }
     });
    }catch(e){
        
    }
    
    try{
       await axios({
        method: 'post',
        url: 'https://us-central1-serverless-bnb-356519.cloudfunctions.net/bigquery/api/booking',
        data: {
        message: {
            message: 'Your booking on ${startDate} is received.',
            category: "booking",
            data: {}
        },
         userNotificationToken: customerNo,
        }
     }); 
    }catch(e){
        
    }
       
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};