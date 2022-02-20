var express = require('express');
var router = express.Router();

var uuid = require('uuid-random');

const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = require('../config/s3.config.js');
const env2 = require('../config/s3.env.js');

const {
	addOrUpdateCharacter,
	getCharacters,
	deleteCharacter,
	getCharacterById,
} = require('./dynamo');




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


///MANEJO DE ARCHIVOS


exports.doUpload = async (req, res) => {

	const { nickname, carpeta } = req.params;
	//console.log(nickname,carpeta)

	var nombre = uuid();
	var ruta = req.file.originalname;
	var nr = ruta.split(".");
	var nombrecompleto = nombre + "." + nr[1];

	let date = new Date()
	let day = date.getDate()
	let month = date.getMonth() + 1
	let year = date.getFullYear()

	//var nickname = "usuario2";
	//var carpeta = "carpeta3";

	var fechaCreacion = "";

	if (month < 10) {
		fechaCreacion = `${day}-0${month}-${year}`;
	} else {
		fechaCreacion = `${day}-${month}-${year}`;
	}

	let esquema = {
		"link": "https://ayd2-files.s3.us-east-2.amazonaws.com/" + nombrecompleto,
		"extension": nr[1],
		"fechaSubida": fechaCreacion,
		"eliminado":0,
		"nombre": nr[0]
	}

	const params = {
		Bucket: env2.Bucket,
		Key: nombrecompleto,
		Body: req.file.buffer,
		ACL: 'public-read',
		Object: 'public-read',
	}



	var up = 0;

	try {

		const params2 = {
			TableName: TABLE_NAME,
			Key: {
				nickname,
			},
		};
		result = await dynamoClient.get(params2).promise()
		//console.log(result.Item.workspace);

		/**Alejandro Marín Inicio */
		var PathFull = carpeta;
		var divisiones = PathFull.split(".");
		var cont = divisiones.length;
		/**Alejandro Marín Fin */
		//cont=2: Root.NewFile
		console.log('294 uoload')
		console.log(cont)
		if(cont<2){//carpeta=="root"
			for(var i = 0; i < result.Item.workspace.archivos.length; i++){
				if((result.Item.workspace.archivos[i].nombre===nr[0])&&(result.Item.workspace.archivos[i].extension===nr[1])&&
					(result.Item.workspace.archivos[i].eliminado === 0)){
					//console.log("Error el archivo ya existe");
					res.send("ERRO: No ser guardo archivo. DETALLE: El archivo ya existe") ;
					return;
				}
			}
			result.Item.workspace.archivos.push(esquema);up++;
		}else{
			/*for(var i = 0; i < result.Item.workspace.carpetas.length; i++){
				if(result.Item.workspace.carpetas[i].nombre===carpeta){
					for(var j = 0; j < result.Item.workspace.carpetas[i].archivos.length; j++){
						if((result.Item.workspace.carpetas[i].archivos[j].nombre===nr[0])&&(result.Item.workspace.carpetas[i].archivos[j].extension===nr[1])&&
							(result.Item.workspace.carpetas[i].archivos[j].eliminado===0)){
							//console.log("Error el archivo ya existe en las carpetas");
							res.send("ERRO: No ser guardo archivo. DETALLE: El archivo ya existe") ;
							return;
						}
					}
					result.Item.workspace.carpetas[i].archivos.push(esquema);up++;
				}
			}*/ 
			console.log('Aqui estoy upload 318');
			ArchivoCarpeta(result.Item.workspace,PathFull,1,divisiones[1],nombre,nr[1],esquema)

		}

		if(up!=0){
			s3.upload(params, (err, data) => {
				if (err) {
					res.status(500).send("Error -> " + err);
				}
				//res.send("Archivo almacenado -> keyname = " + req.file.originalname);
				//console.log(esquema);
				//res.send(esquema);
			});
		}

		//console.log(result.Item.workspace);


		const params3 = {
			TableName: TABLE_NAME,
			Item: result.Item,
			Key: {
				nickname,
			},
		}
		resutadoFinal = dynamoClient.put(params3).promise();
		//console.log("Se guardo archivo exitosamente");
		res.send("CORRECTO: Se guardo archivo exitosamente");



		//console.log(JSON.stringify(archivos));
		//console.log(JSON.stringify(result));
	} catch (error) {
		console.error(error);
	}

	//console.log(res.status(500));
}



exports.listKeyNames = async (req, res) => {

	var keys = [];
	const { nickname, carpeta } = req.params;
	//var nickname = req.param('usuario');
	//var carpeta = "imagenes";
	var result = "";
	var archivos = [];

	try {
		const params2 = {
			TableName: TABLE_NAME,
			Key: {
				nickname,
			},
		};
		result = await dynamoClient.get(params2).promise()

		var PathFull = carpeta;
		var divisiones = PathFull.split(".");
		var cont = divisiones.length;
		console.log('si estoy')
		if(cont===1){
			console.log('ROOT')
			for(var i = 0; i < result.Item.workspace.archivos.length; i++){
				//console.log(result.Item.workspace.archivos[i].nombre);
				if(result.Item.workspace.archivos[i].eliminado<1){
					let esquema = {
						"link": result.Item.workspace.archivos[i].link,
						"extension": result.Item.workspace.archivos[i].extension,
						"fechaSubida": result.Item.workspace.archivos[i].fechaSubida,
						"eliminado": result.Item.workspace.archivos[i].eliminado,
						"nombre": result.Item.workspace.archivos[i].nombre
					}
					archivos.push(esquema);
				}
				
			}
		}else{
			/*for(var i = 0; i < result.Item.workspace.carpetas.length; i++){
				if(result.Item.workspace.carpetas[i].nombre==carpeta){
					for(var j = 0; j < result.Item.workspace.carpetas[i].archivos.length; j++){
						//console.log(result.Item.workspace.carpetas[i].archivos[j].nombre);
						if(result.Item.workspace.carpetas[i].archivos[j].eliminado<1){
							let esquema = {
								"link": result.Item.workspace.carpetas[i].archivos[j].link,
								"extension": result.Item.workspace.carpetas[i].archivos[j].extension,
								"fechaSubida": result.Item.workspace.carpetas[i].archivos[j].fechaSubida,
								"eliminado":result.Item.workspace.carpetas[i].archivos[j].eliminado,
								"nombre": result.Item.workspace.carpetas[i].archivos[j].nombre
							}
							archivos.push(esquema);
						}
						
					}
				}
			}*/
			console.log('CARPETA ',divisiones[1])
			archivos=await ListarArchivo(result.Item.workspace,PathFull,1,divisiones[1])
		}
		//console.log(JSON.stringify(archivos));
		//console.log(JSON.stringify(result));
	} catch (error) {
		console.error(error);
	}

	/*
	const params = {
		Bucket: env2.Bucket
	}

	s3.listObjectsV2(params, (err, data) => {
		if (err) {
			console.log(err, err.stack); // an error occurred
			res.send("error -> " + err);
		} else {
			//keys = [1,2,3,4];
			var contents = data.Contents;
			contents.forEach(function (content) {
				keys.push(content.Key);
			});
			//res.send(keys);
			//res.send(archivos);
		}
	});
	*/

	console.log("-----------------------------------------------------------------------");

	res.send(archivos);
}

exports.eliminacionDefinitiva = async (req, res) => {

	const { nickname, linkUnico } = req.params;
	var result = "";
	var elimino = 0;

	try {
		const character = await getCharacterById(nickname); //parser a json

		let carpetas;

		carpetas = character.Item.workspace.carpetas;
		console.log(carpetas.length);
		for(var i = 0; i < carpetas.length; i++){
			const archivos = carpetas[i].archivos;
			console.log(archivos.length);
			for(var j = 0; j < archivos.length; j++){
				const archivo = archivos[j];
				if(archivo.eliminado == 1){
					console.log(archivo.nombre);

					try {
						const elemento = character.Item.workspace.carpetas[i].archivos[j].eliminado = 3;
						elimino = 1;

						const newCh = character.Item;
						//console.log(newCh)
						const newCharacter = await addOrUpdateCharacter(newCh);
						res.json({newCharacter, esError: 'no'});

					} catch (err) {
						console.error(err);
						res.status(500).json({ err: err, esError: 'si' });
					}
				}
			}
			console.log("----------------------------------------------------------------------")
		}

	} catch (err) {
		console.error(err);
		res.status(500).json({ err: err, esError: 'si' });
	}

	if(elimino == 0){
		try {
			const character = await getCharacterById(nickname); //parser a json
			const archivos = character.Item.workspace.archivos;
			let archivo = archivos.find(archivo => archivo.nombre === linkUnico).eliminado = 3;

			const newCh = character.Item;
			//console.log(newCh)
			const newCharacter = await addOrUpdateCharacter(newCh);
			res.json({newCharacter, esError: 'no'});

		} catch (err) {
			console.error(err);
			res.status(500).json({ err: err, esError: 'si' });
		}
	}

	console.log(result);
}

exports.restore = async (req, res) => {

	const { nickname, linkUnico } = req.params;
	var result = "";
	var elimino = 0;

	try {
		const character = await getCharacterById(nickname); //parser a json

		let carpetas;

		carpetas = character.Item.workspace.carpetas;
		console.log(carpetas.length);
		for(var i = 0; i < carpetas.length; i++){
			const archivos = carpetas[i].archivos;
			console.log(archivos.length);
			for(var j = 0; j < archivos.length; j++){
				const archivo = archivos[j];
				if(archivo.eliminado == 1){
					console.log(archivo.nombre);

					try {
						const elemento = character.Item.workspace.carpetas[i].archivos[j].eliminado = 0;
						elimino = 1;

						const newCh = character.Item;
						//console.log(newCh)
						const newCharacter = await addOrUpdateCharacter(newCh);
						res.json({newCharacter, esError: 'no'});

					} catch (err) {
						console.error(err);
						res.status(500).json({ err: err, esError: 'si' });
					}
				}
			}
			console.log("----------------------------------------------------------------------")
		}

	} catch (err) {
		console.error(err);
		res.status(500).json({ err: err, esError: 'si' });
	}

	if(elimino == 0){
		try {
			const character = await getCharacterById(nickname); //parser a json
			const archivos = character.Item.workspace.archivos;
			let archivo = archivos.find(archivo => archivo.nombre === linkUnico).eliminado = 0;

			const newCh = character.Item;
			//console.log(newCh)
			const newCharacter = await addOrUpdateCharacter(newCh);
			res.json({newCharacter, esError: 'no'});

		} catch (err) {
			console.error(err);
			res.status(500).json({ err: err, esError: 'si' });
		}
	}

	console.log(result);
}

exports.listKeyNamesEliminadas = async (req, res) => {

	var keys = [];
	const { nickname, carpeta } = req.params;
	//var nickname = req.param('usuario');
	//var carpeta = "imagenes";
	var result = "";
	var archivos = [];

	try {
		const params2 = {
			TableName: TABLE_NAME,
			Key: {
				nickname,
			},
		};
		result = await dynamoClient.get(params2).promise()

		console.log(result.Item.workspace);
		for(var i = 0; i < result.Item.workspace.archivos.length; i++){
			//console.log(result.Item.workspace.archivos[i].nombre);
			if(result.Item.workspace.archivos[i].eliminado==1){
				let esquema = {
					"link": result.Item.workspace.archivos[i].link,
					"extension": result.Item.workspace.archivos[i].extension,
					"fechaSubida": result.Item.workspace.archivos[i].fechaSubida,
					"eliminado": result.Item.workspace.archivos[i].eliminado,
					"nombre": result.Item.workspace.archivos[i].nombre
				}
				archivos.push(esquema);
			}

		}
		for(var i = 0; i < result.Item.workspace.carpetas.length; i++){
			for(var j = 0; j < result.Item.workspace.carpetas[i].archivos.length; j++){
				//console.log(result.Item.workspace.carpetas[i].archivos[j].nombre);
				if(result.Item.workspace.carpetas[i].archivos[j].eliminado==1){
					let esquema = {
						"link": result.Item.workspace.carpetas[i].archivos[j].link,
						"extension": result.Item.workspace.carpetas[i].archivos[j].extension,
						"fechaSubida": result.Item.workspace.carpetas[i].archivos[j].fechaSubida,
						"eliminado":result.Item.workspace.carpetas[i].archivos[j].eliminado,
						"nombre": result.Item.workspace.carpetas[i].archivos[j].nombre
					}
					archivos.push(esquema);
				}

			}
		}
		//console.log(JSON.stringify(archivos));
		//console.log(JSON.stringify(result));
	} catch (error) {
		console.error(error);
	}


	console.log("-----------------------------------------------------------------------");

	res.send(archivos);
}

exports.doDownload = (req, res) => {
	const params = {
		Bucket: env2.Bucket,
		Key: req.params.filename
	}

	res.setHeader('Content-Disposition', 'attachment');

	s3.getObject(params)
		.createReadStream()
			.on('error', function(err){
				res.status(500).json({error:"Error -> " + err});
		}).pipe(res);
}


//Alejandro Marín
const ArchivoCarpeta = async (ConjuntoCarpetas,FullPath,IndexPath,CarpetaContenedor,nameArchivo,extension,newArchivo) => {
	//Realiziaremos un split papra desarmar PathContenedor
		/*
		Esto va en el metodo donde es llamado este
		*/
		var PathFull = FullPath;
		var divisiones = PathFull.split(".");
		var cont =divisiones.length-1;// "-2" porque sabemos que debe ser un nivel antes del ultimo la carpeta contenedora
console.log('Nuevo archivo 667',CarpetaContenedor);
		/** Se recorren las carpetas validando cual es la contenedora */
		for(var i = 0; i < ConjuntoCarpetas.carpetas.length; i++){
							if((ConjuntoCarpetas.carpetas[i].nombre===CarpetaContenedor)&&//Que sea la carpeta contenedora
								(ConjuntoCarpetas.carpetas[i].eliminado === 0)){//Que la carpeta no este eliminada
									
									if(IndexPath==cont){//Valida si la carpeta es la que contendra la nueva carpeta
										/** Se realiza la verificacion de que no exista una carpeta con el mismo nombre */
										console.log('match 677')
										var Exist = false;
										for(var j = 0; j < ConjuntoCarpetas.carpetas[i].archivos.length; j++){
											if((ConjuntoCarpetas.carpetas[i].archivos[j].nombre===nameArchivo)&&
												(ConjuntoCarpetas.carpetas[i].archivos[j].eliminado === 0)){
													Exist=true;
												
												}
										}

										if(!Exist){// Si no existe lo insertamos en el modelo
											console.log('PUSH ',newArchivo );
											ConjuntoCarpetas.carpetas[i].archivos.push(newArchivo);
										}

									}else{//Se genera la recursividad
										//
										ArchivoCarpeta(ConjuntoCarpetas.carpetas[i],PathFull,IndexPath+1,divisiones[IndexPath+1],nameArchivo,extension,newArchivo)
									}
								
							}
						}

	//

};

const ListarArchivo = async (ConjuntoCarpetas,FullPath,IndexPath,Carpeta) => {
	//Realiziaremos un split papra desarmar PathContenedor
		/*
		Esto va en el metodo donde es llamado este
		*/
		console.log(' ->',Carpeta);
		var PathFull = FullPath;
		var divisiones = PathFull.split(".");
		var cont =divisiones.length-1;// "-2" porque sabemos que debe ser un nivel antes del ultimo la carpeta contenedora
		var archivos = [];
		/** Se recorren las carpetas validando cual es la contenedora */
		for(var i = 0; i < ConjuntoCarpetas.carpetas.length; i++){
 
							if((ConjuntoCarpetas.carpetas[i].nombre===Carpeta)&&//Que sea la carpeta contenedora
								(ConjuntoCarpetas.carpetas[i].eliminado === 0)){//Que la carpeta no este eliminada
									
									if(IndexPath==cont){//Valida si la carpeta es la que contendra la nueva carpeta
									console.log('aqui 721');
										/** Validacion de que no este eliminado */
										for (var j=0;j<ConjuntoCarpetas.carpetas[i].archivos.length;j++){
											
											if(ConjuntoCarpetas.carpetas[i].archivos[j].eliminado === 0){
												
												let esquema = {
													"link": ConjuntoCarpetas.carpetas[i].archivos[j].link,
													"extension": ConjuntoCarpetas.carpetas[i].archivos[j].extension,
													"fechaSubida": ConjuntoCarpetas.carpetas[i].archivos[j].fechaSubida,
													"eliminado":ConjuntoCarpetas.carpetas[i].archivos[j].eliminado,
													"nombre": ConjuntoCarpetas.carpetas[i].archivos[j].nombre
												}
												archivos.push(esquema);	
												
											}
										}
										

									return archivos//ConjuntoCarpetas.carpetas[i].archivos
										
									}else{//Se genera la recursividad

										return	ListarArchivo(ConjuntoCarpetas.carpetas[i],PathFull,IndexPath+1,divisiones[IndexPath+1])
									}	
							}
						}
	//

};







