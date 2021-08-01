const { DynamoDB } = require('@aws-sdk/client-dynamodb'); // importing library from aws-sdk that allows the interaction with dynamodb
const { unmarshall } = require('@aws-sdk/util-dynamodb'); // importing unmarshall function, which converts a DynamoDB record into a JavaScript object

exports.lambdaHandler = async (event, context) => {
  try {
    console.log('here is the event received', event);
    const dynamodb = new DynamoDB({ region: 'us-east-1' }); // creating a new instance of DynamoDB
    const params = {
      TableName: 'companies',
    };

    // if no query parameter was passed to the function, then update the dynamodb params to query all companies
    if (!event.queryStringParameters) {
      params.ExpressionAttributeValues = {
        ':companyType': {
          S: 'PUBLIC',
        },
      };
      params.FilterExpression = 'CompanyType = :companyType';
    }
    // if the companyId query paramater was passed, then update the dynamodb params to filter according that company exactly
    else {
      params.ExpressionAttributeValues = {
        ':companyId': {
          S: `COMPANY#${event.queryStringParameters.companyId}`,
        },
      };
      params.FilterExpression = 'CompanyId = :companyId';
    }

    const results = await dynamodb.scan(params); // get the results from dynamodb according to the previously set params
    console.log('results', results);
    let unmarshalledResults = [];

    // unmarshall every record returned (convert it into a JS object)
    for (const item of results.Items) {
      const unmarshalledRecord = unmarshall(item);
      unmarshalledResults.push(unmarshalledRecord);
    }

    console.log('unmarshalled results', unmarshalledResults);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(unmarshalledResults),
    };
  } catch (e) {
    console.error('something went wrong', e);
    return {
      statusCode: 500,
      body: 'Something has gone wrong, please contact the support team',
    };
  }
};
