const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const  dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Logs";

const addOrUpdateCharacter = async (character) =>{
    const params = {
        TableName: TABLE_NAME,
        Item: character
    }
    return await  dynamoClient.put(params).promise();
};

const getCharacters = async() => {
    const params = {
        TableName: TABLE_NAME
    };
    const characters = await dynamoClient.scan(params).promise();
    console.log(characters);
    return characters;
}


module.exports = {
    dynamoClient,
    addOrUpdateCharacter,
    getCharacters
};