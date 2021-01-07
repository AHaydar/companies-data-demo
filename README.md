# companies-data-demo

This repository contains the source code of a demo serverless application that has one or more security defects. The appications is built using ReactJS and NodeJS, and uses AWS Lambda, API Gateway and DynamoDB.

The purpose of this app is to demo a security vulnerability.

## API

The api folder include the infrastructure code for the DyamoDB and Lambda, in addition to the lambda logic, which retrieves the list of companies from the DynamoDB.

### Deployment

- From your terminal connect to your AWS account
- Run the following command: `npm run deploy` - this will run sam build and sam deploy with a few options. The first time it's executed a few questions will be asked > respond with Y for all of them

## Front-End

The front-end folder contains the front end code, where we display the list of public companies and can select them, to see any available data for them.
