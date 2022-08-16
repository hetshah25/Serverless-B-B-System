const axios = require("axios");

exports.handler = async (event) => {
    
    console.log(event)
    
    const {
        email,
        item,
        quantity,
        price
    } = event;
    
    try{
        await axios({
        method: 'post',
        url: 'https://us-central1-serverless-bnb-356519.cloudfunctions.net/bigquery/api/food',
        data: {
            email,
            item,
            quantity,
            price
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