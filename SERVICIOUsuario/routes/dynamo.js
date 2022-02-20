const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const  dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "AyDrive";

const getCharacters = async() => {
    const params = {
        TableName: TABLE_NAME
    };
    const characters = await dynamoClient.scan(params).promise();
    console.log(characters);
    return characters;
}

const getCharacterById = async (nickname) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            nickname,
        },
    };
    return await dynamoClient.get(params).promise();
};

const addOrUpdateCharacter = async (character) =>{

    console.log(character)
    const params = {
        TableName: TABLE_NAME,
        Item: character
    }
    return await  dynamoClient.put(params).promise();
};

const deleteCharacter = async (nickname) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            nickname,
        },
    };
    return await dynamoClient.delete(params).promise();
};
// validacion de existencia de usuario
const getLog = async (nickname1) => {
    const params = {
        TableName: TABLE_NAME,
        ProjectionExpression: "#nk, correo, fechaNacimiento,contrasena",
    FilterExpression: "#nk = :nickname1 ",
    ExpressionAttributeNames: {
        "#nk": "nickname"
    },
    ExpressionAttributeValues: {
         ":nickname1": nickname1
    },
    };
    return await dynamoClient.scan(params).promise();
};


//para validad si existe el usuario al momento de registrar
const existeusuario = async (nicknameusu) => {
    //console.log(nicknameusu,correousu);
    const params = {
        TableName: TABLE_NAME,
        //ProjectionExpression, especifica los atributos que desea en el resultado de la exploración.
        ProjectionExpression: "#nickn,#email",
        //FilterExpression, especifica una condición y devuelve los elementos que satisfacen lacondición
        FilterExpression: "#nickn = :nicknameusu",
        ExpressionAttributeNames: {
            "#nickn": "nickname",
            "#email": "correo",
        },
        ExpressionAttributeValues: {
            ":nicknameusu": nicknameusu,
           // ":correousu": correousu 
        },
    };
    return await dynamoClient.scan(params).promise();
};

const agregar_columna = async(nickname,secret,activado) => {
    
    const params = {
        TableName:TABLE_NAME,
        Key:{
            "nickname":nickname
        },
        UpdateExpression: "set secret = :sec, twofactor= :tf",
        ExpressionAttributeValues:{
            ":sec":secret,
            ":tf":activado
        }
    };
    await dynamoClient.update(params).promise();
}


module.exports = {
    dynamoClient,
    getCharacters,
    getCharacterById,
    addOrUpdateCharacter,
    deleteCharacter,
    getLog,
    existeusuario,
    agregar_columna
};