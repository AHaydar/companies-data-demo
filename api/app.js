const { scanAndFilterData } = require("./dynamoDbData");

exports.lambdaHandler = async (event, context) => {
  try {
    console.log("here is the event received", event);
    const params = {
      TableName: "companies",
    };

    // if no query parameter was passed to the function, then update the dynamodb params to query all companies
    if (!event.queryStringParameters) {
      params.ExpressionAttributeValues = {
        ":companyType": {
          S: "PUBLIC",
        },
      };
      params.FilterExpression = "CompanyType = :companyType";
    }
    // if the companyId query paramater was passed, then update the dynamodb params to filter according that company exactly
    else {
      params.ExpressionAttributeValues = {
        ":companyId": {
          S: `COMPANY#${event.queryStringParameters.companyId}`,
        },
      };
      params.FilterExpression = "CompanyId = :companyId";
    }

    const results = await scanAndFilterData(params);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(results),
    };
  } catch (e) {
    console.error("something went wrong", e);
    return {
      statusCode: 500,
      body: "Something has gone wrong, please contact the support team",
    };
  }
};
