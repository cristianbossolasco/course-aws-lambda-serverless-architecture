const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const docClient = new AWS.DynamoDB.DocumentClient();

/* docClient.put({
    TableName: "td_notes_sdk",
    Item: {
        user_id: "bb",
        timestamp: 2,
        title: "Changes Notes",
        content: "Changes  content"
    }
}, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
}); */



/* docClient.update({
    TableName: "td_notes_sdk",
    Key: {
        user_id: "bb",
        timestamp: 1
    },
    UpdateExpression: 'set #x = :y',
    ExpressionAttributeNames: {
        '#x': 'title'
    },
    ExpressionAttributeValues: {
        ':y': 'Updated title'
    }
}, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
}); */


/* docClient.delete({
    TableName: "td_notes_sdk",
    Key: {
        user_id: "bb",
        timestamp: 1
    }
}, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
}); */


docClient.batchWrite({
    RequestItems: {
        "td_notes_sdk": [
            {
                DeleteRequest: {
                    Key: {
                        user_id: "bb",
                        timestamp: 2
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        user_id: "11",
                        timestamp: 1,
                        title: "title 11",
                        content: "content 11"
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        user_id: "22",
                        timestamp: 2,
                        title: "title 22",
                        content: "content 22"
                    }
                }
            },            
        ]

    }
}, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
});