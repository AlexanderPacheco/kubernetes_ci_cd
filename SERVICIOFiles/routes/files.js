var express = require('express');
const cors = require('cors');
var router = express.Router();
router.use(cors());
var fs = require('fs');
const {
  addOrUpdateCharacter,
  getCharacters,
  deleteCharacter,
  getCharacterById,
  getLog,
  putArchivo,
  ObtenerLinkArchivo,
  download,
  BuscarIndexArchivo,
} = require('./dynamo');

///******************************************** */

router.get('/', function(req, res, next){
  res.send('You did not say the magic word');
});


router.get('/download/:archivos/:extension', function(req, res, next){
  
  const archivos = req.params.archivos;
  const extension = req.params.extension;
  console.log(archivos,' <<<>>> ',extension);
  let filename=archivos.toString()+'.'+extension.trim().toString();
  console.log('*'+filename+'*');

  // download the file via aws s3 here
  var fileKey = filename;

  console.log('Trying to download file', fileKey);
  var AWS = require('aws-sdk');
  AWS.config.update(
    {
      accessKeyId: "AKIAWXVVL4U56Z7GZCXL",
      secretAccessKey: "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",
      region: 'us-east-2'
    }
  );
  var s3 = new AWS.S3();
  var options = {
      Bucket    : 'ayd2-files',
      Key    : fileKey,
  };

  res.attachment(fileKey);
  var fileStream = s3.getObject(options).createReadStream();
  fileStream.pipe(res)
});


//********************************************** */

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//Descargar
router.get('/ver/:nickname/:contrasena/:carpetas/:archivos', async (req, res) => {
  const nickname = req.params.nickname;
  const contrasena = req.params.contrasena;
  const carpetas = req.params.carpetas;
  const archivos = req.params.archivos;
  console.log('entre');
  try {
    const character = await ObtenerLinkArchivo(nickname,contrasena,carpetas,archivos);
    
    if(character==0){
      res.status(500).json({ warning: 'Archivo no encontrado' });
    }else{
      //let filename=character.Items[0].nombre.S+character.Items[0].extension.S
      //console.log(filename);
      console.log('>>>>> QQQQQ');
      console.log(character);
      res.json(character);
    }


  } catch (err) {
    console.error(err);
    res.status(500).json({ err: err });
  }
});
//ELIMINAR cambiar de estado archivo
///:nickname/:contrasena/:carpetas/:archivos/:eliminado
router.get('/delete/:nickname/:contrasena/:carpetas/:archivos/:eliminado', async (req, res) => {
//    const nickname = req.body.nickname;
//    const contrasena = req.body.contrasena;
//    const carpetas = req.body.carpetas;
//    const archivos = req.body.archivos;
//    const eliminado = req.body.eliminado;
//  console.log(eliminado);
  const nickname = req.params.nickname;
  const contrasena = req.params.contrasena;
  const carpetas = req.params.carpetas;
  const archivos = req.params.archivos;
  const eliminado = req.params.eliminado;

  try {
    const character = await putArchivo(nickname,contrasena,carpetas,archivos,eliminado);
    
    if(character==0){
      res.status(500).json({ warning: 'Archivo no encontrado' });
    }else{
      res.json(character);
    }


  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});
//BuscarIndexArchivo
router.get('/delete1', async (req, res) => {
  // const nickname = req.params.nickname;
  // const contrasena = req.params.contrasena;
  // const carpetas = req.params.carpetas;
  // const archivos = req.params.archivos;
  // const eliminado = req.params.eliminado;
  const nickname = req.body.nickname;
  const contrasena = req.body.contrasena;
  const carpetas = req.body.carpetas;
  const archivos = req.body.archivos;
  const eliminado = req.body.eliminado;



  try {
    const character = await BuscarIndexArchivo(nickname,contrasena,1,archivos);
    
    if(character==0){
      res.status(500).json({ warning: 'Archivo no encontrado' });
    }else{
      res.json(character);
    }


  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

module.exports = router;
