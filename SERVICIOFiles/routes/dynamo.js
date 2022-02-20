'use strict'
const AWS = require('aws-sdk');
require('dotenv').config();
//
const fs = require('fs');
const { Console } = require('console');
const ACCESS_KEY_ID = "AKIAWXVVL4U56Z7GZCXL";
const SECRET_ACCESS_KEY = "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";
const BUCKET_NAME = "ayd2-files";
const REGION="us-east-2";


AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const  dynamoClient = new AWS.DynamoDB.DocumentClient();
const doc = new AWS.DynamoDB();
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

const removeItem = (arr, item) => {
    var i = arr.indexOf(item);

    if(i !== -1){
        arr.splice(i,1);
    }
    return arr;
};

// validacion de existencia de usuario
const getLog = async (nickname1) => {
     // console.log(nickname1,contrasena1,carpeta1,archivo1);
     //Conceguire la cantidad de a
     let Busqueda=await doc.executeStatement({
         Statement : `SELECT * FROM ${TABLE_NAME} WHERE "nickname" ='${nickname1}'  and "contrasena" = '${contrasena1}' `
      }).promise();
      let cont =Busqueda.Items.length;
      if(cont>0){
             return Busqueda
      }
    return 0;
};

//Descargar Archivo
const ObtenerLinkArchivo = async (nickname1,contrasena1,carpeta1,archivo1) => {

    if(archivo1!='' || archivo1!=undefined || archivo1!=null){
        if(carpeta1=='Root'){
            console.log('Root');
            let idArc= await BuscarIndexArchivo(nickname1,contrasena1,-1,archivo1);
            //Aaqui realizo el Update
                                                        /*UPDATE Music SET AwardDetail.BillBoard=[2020] */
            let Busqueda1 =await doc.executeStatement({
                       Statement : `SELECT workspace.archivos[${idArc}].link FROM ${TABLE_NAME} WHERE "nickname" ='${nickname1}' and "contrasena" = '${contrasena1}' and workspace.archivos[${idArc}].nombre='${archivo1}' `
                      // Statement : `SELECT workspace.archivos[${idArc}].nombre, workspace.archivos[${idArc}].extension FROM ${TABLE_NAME} WHERE "nickname" ='${nickname1}' and "contrasena" = '${contrasena1}' and workspace.archivos[${idArc}].nombre='${archivo1}' `
                    }).promise();
                    //si la consulta retorna datos
                    if(Busqueda1.Items.length>0){
                        return Busqueda1
                    }

        }else 
        {
            console.log(carpeta1);
            let idCar = await BuscarIndexCarpeta(nickname1,contrasena1,carpeta1);
            console.log(idCar);
            
            let idArc= await BuscarIndexArchivo(nickname1,contrasena1,idCar,archivo1);
            console.log(idArc);


            let Busqueda1 =await doc.executeStatement({
                Statement : `SELECT workspace.carpetas[${idCar}].archivos[${idArc}].link FROM ${TABLE_NAME} WHERE "nickname" ='${nickname1}'  and workspace.carpetas[${idCar}].archivos[${idArc}].nombre='${archivo1}' `
               // Statement : `SELECT workspace.carpetas[${idCar}].archivos[${idArc}].nombre, workspace.carpetas[${idCar}].archivos[${idArc}].extension FROM ${TABLE_NAME} WHERE "nickname" ='${nickname1}' and "contrasena" = '${contrasena1}' and workspace.carpetas[${idCar}].archivos[${idArc}].nombre='${archivo1}' `
            }).promise();
            //si la consulta retorna datos
            if(Busqueda1.Items.length>0){
                return Busqueda1
            }

        }
    }else{
        //archivo vacio
    }

        return 0;
    
    
};
// Eliminar Archivo -> solamente cambiar de estado
const putArchivo = async (nickname1,contrasena1,carpeta1,archivo1,snEliminado) => {

    if(archivo1!='' || archivo1!=undefined || archivo1!=null){
        if(carpeta1=='Root'){
            console.log('Root');
            let idArc= await BuscarIndexArchivo(nickname1,contrasena1,-1,archivo1);
            console.log(idArc);
            //Aaqui realizo el Update
                                                        /*UPDATE Music SET AwardDetail.BillBoard=[2020] */
            let Busqueda1 =await doc.executeStatement({
                        Statement : `UPDATE ${TABLE_NAME} SET workspace.archivos[${idArc}].eliminado=${snEliminado}  WHERE "nickname" ='${nickname1}'  and workspace.archivos[${idArc}].nombre='${archivo1}' `
                    }).promise();

            Busqueda1 =await doc.executeStatement({
                       Statement : `SELECT workspace.archivos[${idArc}] FROM ${TABLE_NAME} WHERE "nickname" ='${nickname1}'  and workspace.archivos[${idArc}].nombre='${archivo1}' `
                    }).promise();
                    //si la consulta retorna datos
                    if(Busqueda1.Items.length>0){
                        return Busqueda1
                    }

        }else 
        {
            console.log(carpeta1);
            let idCar = await BuscarIndexCarpeta(nickname1,contrasena1,carpeta1);
            console.log(idCar);
            
            let idArc= await BuscarIndexArchivo(nickname1,contrasena1,idCar,archivo1);
            console.log(idArc);

            let Busqueda1 =await doc.executeStatement({
                Statement : `UPDATE ${TABLE_NAME} SET workspace.carpetas[${idCar}].archivos[${idArc}].eliminado=${snEliminado}  WHERE "nickname" ='${nickname1}'  and workspace.carpetas[${idCar}].archivos[${idArc}].nombre='${archivo1}' `
            }).promise();

             Busqueda1 =await doc.executeStatement({
                Statement : `SELECT workspace.carpetas[${idCar}].archivos[${idArc}] FROM ${TABLE_NAME} WHERE "nickname" ='${nickname1}'  and workspace.carpetas[${idCar}].archivos[${idArc}].nombre='${archivo1}' `
            }).promise();
            //si la consulta retorna datos
            if(Busqueda1.Items.length>0){
                return Busqueda1
            }

        }
    }else{
        //archivo vacio
    }

        return 0;
    
    
};

const BuscarIndexCarpeta = async (nickname1,contrasena1,carpeta1) => {
    console.log('IndexCarpeta');
    //Conceguire la cantidad de a
    let Busqueda=await doc.executeStatement({
        Statement : `SELECT workspace.carpetas FROM ${TABLE_NAME} WHERE "nickname" ='${nickname1}'   `
    }).promise();
    //let cont =Busqueda.Items.length;
    let cont =100;

    for(let i=0; i<=cont;i++){
        let Busqueda1 =await doc.executeStatement({
            Statement : `SELECT workspace.carpetas[${i}] FROM ${TABLE_NAME} WHERE "nickname" ='${nickname1}' and  workspace.carpetas[${i}].nombre='${carpeta1}' `
        }).promise();
        let cant =  Busqueda1.Items.length;
        //si la consulta retorna datos
        if(cant>0){
            return  i//, Busqueda1
        }
    }
        return  -1;
};

const BuscarIndexArchivo = async (nickname1,contrasena1,carpeta1,archivo1) => {
    //Conceguire la cantidad de a
    if(carpeta1==-1){
        console.log('IndexArchivo12 '+nickname1+' , '+contrasena1);
        
        let Busqueda=await doc.executeStatement({
            Statement : `SELECT * FROM ${TABLE_NAME} WHERE "nickname" ='${nickname1}'  `
        }).promise();
        console.log('<-->');
        console.log(Busqueda);

        //let cont =  Busqueda.Items.length;
        let cont =  100;
        
        for(let i=0; i<=cont;i++){
            let Busqueda1 =await doc.executeStatement({
                Statement : `SELECT workspace.archivos[${i}] FROM ${TABLE_NAME} WHERE "nickname" ='${nickname1}' and workspace.archivos[${i}].nombre='${archivo1}' `
            }).promise();
            
            //si la consulta retorna datos
            let cant =  Busqueda1.Items.length;
            if(cant>0){
                return  i
            }
        }
    }else{
        console.log('IndexArchivoCarpeta');
        let Busqueda=await doc.executeStatement({
            Statement : `SELECT workspace.carpetas[${carpeta1}].archivos FROM ${TABLE_NAME} WHERE "nickname" ='${nickname1}' `
        }).promise();
        let cont =  50;
    
        for(let i=0; i<=cont;i++){
            let Busqueda1 =await doc.executeStatement({
                Statement : `SELECT workspace.carpetas[${carpeta1}].archivos[${i}] FROM ${TABLE_NAME} WHERE "nickname" ='${nickname1}' and workspace.carpetas[${carpeta1}].archivos[${i}].nombre='${archivo1}' `
            }).promise();
            //si la consulta retorna datos
            let cant =  Busqueda1.Items.length;
            if(cant>0){
                return  i
            }
        }

    }
    
        return  -1;

};

const download= async(filename)=>{
    var s3 = new AWS.S3({
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
        region:REGION,
        endpoint: new AWS.Endpoint("https://s3.pilw.io")
    })
    
    var params = {
        Key: filename,
        Bucket: BUCKET_NAME
    }
    
    s3.getObject(params, function(err, data) {
        if (err) {
            console.log('>>>>>>>>>>>> ',err)
            throw err
        }
        fs.writeFileSync( './'+filename, data.Body)
        console.log('file downloaded successfully')
    })
    return 1
};

//Retorna true sino existe
const noDetectFile = (usser, folder_after, name, ext) => {
    //Obtengo el objeto file donde este
    let archivos;
    let carpetas;
    let archivo;

    if (folder_after === "/") {
        // Root
        archivos = usser.Item.workspace.archivos;
        archivo = archivos.find(archivo => (archivo.nombre === name) && (archivo.extension === ext));
        console.log("Resultado /root: " + archivo);
        if(archivo === undefined || archivo === null){
            return 1;
        }
    }
    else 
    {
        // Carpeta
        carpetas = usser.Item.workspace.carpetas;
        archivo = carpetas.find(carpeta => carpeta.nombre === folder_after).archivos.find(archivo => (archivo.nombre === name) && (archivo.extension === ext));
        console.log("Resultado /carpeta: " + archivo);
        if(archivo === undefined || archivo === null){
            return 1;
        }
    }
    return 0;
};



module.exports = {
    dynamoClient,
    getCharacters,
    getCharacterById,
    addOrUpdateCharacter,
    deleteCharacter,
    removeItem,
    getLog,
    putArchivo,
    ObtenerLinkArchivo,
    download,
    noDetectFile,
};