const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const docClient = new AWS.DynamoDB.DocumentClient();

/* docClient.get({
    TableName: "td_notes",
    Key: {
        user_id: "user_id_001",
        timestamp: 541815006
    }
}, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
}); */


//  Con query solo se pueden obtener items de una unica particion

/* docClient.query({
    TableName: "td_notes",
    KeyConditionExpression: "user_id = :uid" ,
    ExpressionAttributeValues: {
        ":uid": "user_id_001"
    }
}, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
}); */


// Con scan se obtienen items de todas las particiones
/* docClient.scan({
    TableName: "td_notes",
    FilterExpression: "cat = :cat",
    ExpressionAttributeValues: {
        ":cat": "administrador"
    }
}, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
}); */


docClient.batchGet({
    RequestItems: {
        "td_notes": {
            Keys: [
                {
                    user_id: "user_id_003",
                    timestamp: 364190949
                },
                {
                    user_id: "user_id_001",
                    timestamp: 541815006
                }
            ]
        },
        "td_notes_sdk": {
            Keys: [
                {
                    user_id: "ABC",
                    timestamp: 1
                },
                {
                    user_id: "22",
                    timestamp: 2
                }
            ]
        }        
    }
}, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
});