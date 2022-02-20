var express = require('express');
var router = express.Router();

var uuid = require('uuid-random');

const AWS = require('aws-sdk');
require('dotenv').config();


AWS.config.update({
	region: process.env.AWS_DEFAULT_REGION,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const  dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "AyDrive";


exports.ccarpeta = async (req, res) => {

	const { nickname, carpeta } = req.params;
	
	let date = new Date()
	let day = date.getDate()
	let month = date.getMonth() + 1
	let year = date.getFullYear()

	var fechaCreacion = "";

	if (month < 10) {
		fechaCreacion = `${day}-0${month}-${year}`;
	} else {
		fechaCreacion = `${day}-${month}-${year}`;
	}

/** Split para validar la cantidad de carpetas */
		/*
			Ruta minima
				Root.NewCarpeta
		*/
		
		var PathFull = carpeta;
		var divisiones = PathFull.split(".");
		var cont = divisiones.length;
		if(cont==2){// La carpeta se creara en la carpeta principal
						console.log(divisiones[1].toString())
						let esquema = {
							"fechaCreacion":fechaCreacion,
							"eliminado":0,
							"archivos":[],
							"carpetas":[],//ALejandro Marín 
							"nombre":divisiones[1].toString()//carpeta
						}
					
						try {
					
							const params2 = {
								TableName: TABLE_NAME,
								Key: {
									nickname,
								},
							};
							result = await dynamoClient.get(params2).promise()
							//console.log(result.Item.workspace.carpetas);
					
						} catch (error) {
							console.error(error);
							res.status(500).json({ err: err, esError: 'si' });
						}
					
						console.log("A----------------------------------------------");
					
						for(var i = 0; i < result.Item.workspace.carpetas.length; i++){
							if((result.Item.workspace.carpetas[i].nombre===divisiones[1].toString())&&
								(result.Item.workspace.carpetas[i].eliminado === 0)){
								res.send("ERROR: No se pudo crear la carpeta. DETALLE: La carpeta ya existe.") ;
								
							}
						}
					
						result.Item.workspace.carpetas.push(esquema);

					
						const params3 = {
							TableName: TABLE_NAME,
							Item: result.Item,
							Key: {
								nickname,
							},
						}
						resutadoFinal = dynamoClient.put(params3).promise();
					
						//console.log("Se creo carpeta exitosamente");
						console.log("B----------------------------------------------");
						//res.status(200).send({ message: "CORRECTO: La carpeta fue creada exitosamente" });
						//return response.status(201).send("CORRECTO: La carpeta fue creada exitosamente");
						res.send("CORRECTO: La carpeta fue creada exitosamente");
						console.log("C----------------------------------------------");

		}else{// La carpeta se creara dentro de otra carpeta

			/** Obtener el objeto en base al nickname */
			try {
				const params2 = {
					TableName: TABLE_NAME,
					Key: {
						nickname,
					},
				};
				result = await dynamoClient.get(params2).promise()
			} catch (error) {
				console.error(error);
				res.status(500).json({ err: err, esError: 'si' });
			}
		
			/**Split para obtener el nombre de la carpeta en el primer nivel */

			/**	Se arma el squema con los conjuntos de carpetas recursivo */
			try {

				CrearCarpeta(result.Item.workspace,PathFull,1,divisiones[1],divisiones[divisiones.length-1],fechaCreacion);
				// if(){
				// 	console.log('---- 1 ----')
				// 	res.send("CORRECTO: La carpeta fue creada exitosamente");
				// }else{
				// 	console.log('---- 2 ----')
				// 	res.send("Error: Error al crear la carpeta ya existe en esta ruta.");
				// }	

				/** Fin de armado */
			
				const params3 = {
					TableName: TABLE_NAME,
					Item: result.Item,
					Key: {
						nickname,
					},
				}
				resutadoFinal = dynamoClient.put(params3).promise();
			
				//console.log("Se creo carpeta exitosamente");
				console.log("B----------------------------------------------");
				//res.status(200).send({ message: "CORRECTO: La carpeta fue creada exitosamente" });
				//return response.status(201).send("CORRECTO: La carpeta fue creada exitosamente");
				res.send("CORRECTO: La carpeta fue creada exitosamente");
				console.log("C----------------------------------------------");

			} catch (error) {
				console.error(error);
				res.status(500).json({ err: err, esError: 'Fallo. 146.' });
			}


		}


/*********************Fin Split */




}




// Alejandro - 20211013

const CrearCarpeta = async (ConjuntoCarpetas,FullPath,IndexPath,CarpetaContenedor,CarpetaNueva,fechaCreacion) => {
	//Realiziaremos un split papra desarmar PathContenedor
		/*
		Esto va en el metodo donde es llamado este
		*/
		var PathFull = FullPath;
		var divisiones = PathFull.split(".");
		var cont =divisiones.length-2;// "-2" porque sabemos que debe ser un nivel antes del ultimo la carpeta contenedora

		/** Se recorren las carpetas validando cual es la contenedora */
		for(var i = 0; i < ConjuntoCarpetas.carpetas.length; i++){
							if((ConjuntoCarpetas.carpetas[i].nombre===CarpetaContenedor)&&//Que sea la carpeta contenedora
								(ConjuntoCarpetas.carpetas[i].eliminado === 0)){//Que la carpeta no este eliminada
									
									if(IndexPath==cont){//Valida si la carpeta es la que contendra la nueva carpeta
										/** Se realiza la verificacion de que no exista una carpeta con el mismo nombre */
										var Exist = false;
										for(var j = 0; j < ConjuntoCarpetas.carpetas[i].carpetas.length; j++){
											if((ConjuntoCarpetas.carpetas[i].carpetas[j].nombre===CarpetaNueva)&&
												(ConjuntoCarpetas.carpetas[i].carpetas[j].eliminado === 0)){
													Exist=true;
												
												}
										}

										if(!Exist){// Si no existe lo insertamos en el modelo
											let esquema = {
												"fechaCreacion":fechaCreacion,
												"eliminado":0,
												"archivos":[],
												"carpetas":[],
												"nombre":CarpetaNueva
											}
											ConjuntoCarpetas.carpetas[i].carpetas.push(esquema);
											
										}

									}else{//Se genera la recursividad
										//
											CrearCarpeta(ConjuntoCarpetas.carpetas[i],PathFull,IndexPath+1,divisiones[IndexPath+1],divisiones[divisiones.length-1],fechaCreacion)
									}
								
							}
						}

	//

};





