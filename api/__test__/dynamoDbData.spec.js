const { scanAndFilterData } = require("../dynamoDbData");

jest.mock("@aws-sdk/client-dynamodb", () => {
  return {
    DynamoDB: jest.fn().mockReturnValue({
      scan: jest.fn().mockReturnValue({ Items: ["item1", "item2"] }),
    }),
  };
});

jest.mock("@aws-sdk/util-dynamodb", () => {
  return {
    unmarshall: jest.fn().mockReturnValue("test"),
  };
});

describe("scanAndFilterData", () => {
  it("should scan the dynamoDB table and unmarshall the returned records", async () => {
    const mockedDynamoDBInstance = require("@aws-sdk/client-dynamodb").DynamoDB;
    const params = "test";
    const result = await scanAndFilterData(params);
    expect(
      mockedDynamoDBInstance.mock.results[0].value.scan
    ).toHaveBeenCalledWith(params);
    const mockedUnmarshall = require("@aws-sdk/util-dynamodb").unmarshall;
    expect(mockedUnmarshall).toHaveBeenNthCalledWith(1, "item1");
    expect(mockedUnmarshall).toHaveBeenNthCalledWith(2, "item2");

    expect(result).toEqual(["test", "test"]);
  });
});
