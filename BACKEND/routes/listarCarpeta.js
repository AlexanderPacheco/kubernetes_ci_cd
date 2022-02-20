var express = require('express');
const cors = require('cors');
var router = express.Router();
router.use(cors());

const {
    addOrUpdateCharacter,
    getCharacters,
    deleteCharacter,
    getCharacterById,
} = require('./dynamo');


//LISTAR TODAS LAS CARPETAR DEL USUARIO QUE INICIO SESION
router.get('/listarcarpetas/:nickname/:Ruta', async (req, res) => {

    const { nickname, Ruta } = req.params;

    try {

        var PathFull = Ruta;
        var divisiones = PathFull.split(".");


        const character = await getCharacterById(nickname); //parser a json
        let carpetas = {
            "fechaCreacion":'',
            "eliminado":0,
            "archivos":[],
            "carpetas":[],
            "nombre":''
        }
        if(divisiones.length==1){
            carpetas= character.Item.workspace.carpetas
        }else{//Root.Carpeta
            carpetas = await ListarCarpeta(character.Item.workspace,Ruta,1,divisiones[1]);
        }

        console.log(carpetas)
        console.log('Linea 40')
//ConjuntoCarpetas,FullPath,IndexPath,Carpeta

        // const archivos = character.Item.workspace.archivos;

        CarpetasUsuario = [];
        let numero;

        for (var valor of carpetas){//recorrer carpetas existentes(eliminado=0).

            if(valor.eliminado==0){
                // console.log("----> "+valor.nombre);
                numero=0;
                for(var file of valor.archivos){//contar los archivos existentes(eliminado=0) de una carpeta.
                    if(file.eliminado==0){
                        numero=numero+1;
                    }
                }


                let esquema={
                    "nombre":valor.nombre,
                    "fechaCreacion":valor.fechaCreacion,
                    "numeroarchivos":numero
                }
                CarpetasUsuario.push(esquema);

            }//fin del if

        }//fin del for

        res.json(CarpetasUsuario);


    } catch (err) {
        //console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});


const ListarCarpeta = async (ConjuntoCarpetas,FullPath,IndexPath,Carpeta) => {
    //Realiziaremos un split papra desarmar PathContenedor
    /*
    Esto va en el metodo donde es llamado este
    */
    var PathFull = FullPath;
    var divisiones = PathFull.split(".");
    var cont =divisiones.length-1;// "-2" porque sabemos que debe ser un nivel antes del ultimo la carpeta contenedora
    console.log('--- aqui');
    /** Se recorren las carpetas validando cual es la contenedora */
    for(var i = 0; i < ConjuntoCarpetas.carpetas.length; i++){
        console.log(' ** for ');
        if((ConjuntoCarpetas.carpetas[i].nombre===Carpeta)&&//Que sea la carpeta contenedora
            (ConjuntoCarpetas.carpetas[i].eliminado === 0)){//Que la carpeta no este eliminada

            if(IndexPath==cont){//Valida si la carpeta es la que contendra la nueva carpeta
                return ConjuntoCarpetas.carpetas[i].carpetas

            }else{//Se genera la recursividad
                console.log(' inicia recursividad')

                return	ListarCarpeta(ConjuntoCarpetas.carpetas[i],PathFull,IndexPath+1,divisiones[IndexPath+1])
            }
        }
    }
    //

};

module.exports = router;
