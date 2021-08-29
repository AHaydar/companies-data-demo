const { lambdaHandler } = require("../app");

jest.mock('../dynamoDbData', () => {
    return {
        scanAndFilterData: jest.fn()
    };
})

describe('lambda handler', () => {
    it('should only filter by compay type and return the result accordingly', async ()=> {
        const event = {}
        const result = await lambdaHandler(event);
        const mockedScanAndFilterData = require('../dynamoDbData').scanAndFilterData
        expect(mockedScanAndFilterData).toHaveBeenCalledWith({"ExpressionAttributeValues": {":companyType": {"S": "PUBLIC"}}, "FilterExpression": "CompanyType = :companyType", "TableName": "companies"});
    })
    it('should filter by passed company ID and return the result accordingly', async ()=> {
        const event = {queryStringParameters: {companyId: '1'}};
        const result = await lambdaHandler(event);
        const mockedScanAndFilterData = require('../dynamoDbData').scanAndFilterData
        expect(mockedScanAndFilterData).toHaveBeenCalledWith({"ExpressionAttributeValues": {":companyId": {"S": "COMPANY#1"}}, "FilterExpression": "CompanyId = :companyId", "TableName": "companies"});
    })
})
