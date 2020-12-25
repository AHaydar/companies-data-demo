const { DynamoDB } = require('@aws-sdk/client-dynamodb');

exports.lambdaHandler = async (event, context) => {
  try {
    console.log('here is the event received', event);
    const dynamodb = new DynamoDB({ region: 'us-east-1' });
    const params = {
      TableName: 'companies',
    };

    if (!event.queryStringParameters) {
      params.ExpressionAttributeValues = {
        ':companyType': {
          S: 'PUBLIC',
        },
      };
      params.FilterExpression = 'CompanyType = :companyType';
    } else {
      params.ExpressionAttributeValues = {
        ':companyId': {
          S: `COMPANY#${event.queryStringParameters.companyId}`,
        },
      };
      params.FilterExpression = 'CompanyId = :companyId';
    }

    const results = await dynamodb.scan(params);
    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } catch (e) {
    console.error('something went wrong', e);
    return {
      statusCode: 500,
      body: 'Something has gone wrong, please contact the support team',
    };
  }
};
