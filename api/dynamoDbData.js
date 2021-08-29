const { DynamoDB } = require('@aws-sdk/client-dynamodb'); // importing library from aws-sdk that allows the interaction with dynamodb
const { unmarshall } = require('@aws-sdk/util-dynamodb'); // importing unmarshall function, which converts a DynamoDB record into a JavaScript object

const dynamodb = new DynamoDB({ region: 'us-east-1' }); // creating a new instance of DynamoDB

const scanAndFilterData = async (params) => {
    const results = await dynamodb.scan(params); // get the results from dynamodb according to the previously set params
    let unmarshalledResults = [];

    // unmarshall every record returned (convert it into a JS object)
    for (const item of results.Items) {
      const unmarshalledRecord = unmarshall(item);
      unmarshalledResults.push(unmarshalledRecord);
    }

    return unmarshalledResults;
}

module.exports = { scanAndFilterData }