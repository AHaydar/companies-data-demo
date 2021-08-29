const AWS = require("aws-sdk");
const axios = require("axios");
const codedeploy = new AWS.CodeDeploy({ apiVersion: "2014-10-06" });

exports.handler = (event, context, callback) => {
  console.log("Entering AfterAllowTestTraffic hook.");

  // Read the DeploymentId and LifecycleEventHookExecutionId from the event payload
  const deploymentId = event.DeploymentId;
  const lifecycleEventHookExecutionId = event.LifecycleEventHookExecutionId;
  let lambdaResult = "Failed";
  // Perform AfterAllowTestTraffic validation tests here. Set the test result
  // to "Succeeded" for this tutorial.
  axios
    .get(
      "https://nfc079xjo3.execute-api.us-east-1.amazonaws.com/Prod/companies"
    )
    .then(function (response) {
      if (response.data.length == 2) {
        lambdaResult = "Succeeded";
      }
    })
    .catch(function (error) {
      console.log("An error occured", error);
    })
    .then(function () {
      const params = {
        deploymentId: deploymentId,
        lifecycleEventHookExecutionId: lifecycleEventHookExecutionId,
        status: lambdaResult, // status can be 'Succeeded' or 'Failed'
      };
      // Pass CodeDeploy the prepared validation test results.
      codedeploy.putLifecycleEventHookExecutionStatus(
        params,
        function (err, data) {
          if (err) {
            // Validation failed.
            console.log("AfterAllowTestTraffic validation tests failed");
            console.log(err, err.stack);
            callback("CodeDeploy Status update failed");
          } else {
            // Validation succeeded.
            console.log("AfterAllowTestTraffic validation tests succeeded");
            callback(null, "AfterAllowTestTraffic validation tests succeeded");
          }
        }
      );
    });
};
