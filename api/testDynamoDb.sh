#!/bin/bash

# Insert a record into the dynamoDB table
aws dynamodb put-item \
 --table-name companies \
 --item '{
  "CompanyId": { "S": "COMPANY#4" },
  "CompanyType": { "S": "PRIVATE" },
  "Details": { "M": {
    "name": { "S": "Awesome Company" },
    "revenue": { "S": "1000000" }
    } }
  }' \
 --return-consumed-capacity TOTAL \
 --return-item-collection-metrics SIZE

 # Query the added record from the table
 RESULT=$(
 aws dynamodb get-item \
 --table-name companies \
 --key file://key.json \
 --return-consumed-capacity TOTAL
 )
 echo $RESULT
### OUTPUT ###
#  {
#   "Item": {
#     "Details": {
#       "M": { "name": { "S": "Awesome Company" }, "revenue": { "S": "1000000" } }
#     },
#     "CompanyType": { "S": "PRIVATE" },
#     "CompanyId": { "S": "COMPANY#4" }
#   },
#   "ConsumedCapacity": { "CapacityUnits": 0.5, "TableName": "companies" }
# }

# parse the name and verify it's correct
NAME=$(jq -r '.Item.Details.M.name.S' <<< "$RESULT")
echo $NAME

if [ "$NAME" = "Awesome Company" ]; then
    echo 'The item was retrieved correctly'
    exit 0
else
    echo 'Something went wrong double check the schema or the query'
    exit 1
fi


# Delete the added item
aws dynamodb delete-item \
--table-name companies \
--key file://key.json