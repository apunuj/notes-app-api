import * as dynamoDbLib from './libs/dynamodb-lib.js';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {

    const params = {

        TableName: "notes",
        //'Key' defines the partition key and sort key of the item to be retrieved

        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    try {

        const result = await dynamoDbLib.call("get", params);
        if (result.Item) {

            callback(null, success(result.Item));

        }

        else {

            callback(null, failure({ status: false, error: 'Item not found.' }));

        }

    }

    catch (e) {
        
        callback(null, failure({ status: false }));

    }
    
}