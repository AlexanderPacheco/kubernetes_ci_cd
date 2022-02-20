var express = require('express');

var router = express.Router();

const {
  addOrUpdateCharacter,
  getCharacters,
  deleteCharacter,
  getCharacterById,
  removeItem,
  noDetectFile,
} = require('./dynamo');

/* GET home page. */
router.get('/test', function (req, res, next) {
  //console.log("entro");
  res.render('index', { title: 'Express' });
});


router.get('/folder/:nickname', async (req, res) => {
  const nickname = req.params.nickname;
  var folders = [];
  try {
    let usser = await getCharacterById(nickname);

    for(var i = 0; i < usser.Item.workspace.carpetas.length; i++)
    {
      let nombre = usser.Item.workspace.carpetas[i].nombre;
      if(usser.Item.workspace.carpetas[i].eliminado === 0)
      {
        folders.push(nombre);
        //console.log("carpeta: " + nombre);
      } 
    }
    res.json(folders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

/* Editar nombre archivo
req: {  folder, ==> "/" --> root, o especificando nombre "carpeta"
        oldname, 
        newname,
        ext
      }
*/
router.post('/editfile/:nickname', async (req, res) => {

  let { folder, oldname, newname, ext } = req.body;
  let { nickname } = req.params

  try {
    let character = await getCharacterById(nickname)
    //console.log(character);

    //Verificando que el archivo no exista al lugar donde se movera
    //Retorna true sino existe
    var info = noDetectFile(character, folder, newname, ext);
    //console.log("info: "+ info);

    if (info === 1) {
      if (folder === "/") {
        // Root
        let archivos = character.Item.workspace.archivos;
        let archivo = archivos.find(archivo => (archivo.nombre === oldname) && (archivo.extension === ext)).nombre = newname

        let newCh = character.Item;
        //console.log(newCh);
        let newCharacter = await addOrUpdateCharacter(newCh);

        res.json({ newCharacter });
      }
      else {
        // Carpeta
        let carpetas = character.Item.workspace.carpetas;
        let carpeta = carpetas.find(carpeta => carpeta.nombre === folder).archivos.find(archivo => (archivo.nombre === oldname) && (archivo.extension === ext)).nombre = newname

        let newCh = character.Item;
        //console.log(newCh);
        let newCharacter = await addOrUpdateCharacter(newCh);

        res.status(200).json({ newCharacter });
      }
    }
    else {
      res.status(200).json({ msg: 'Ya existe un archivo con ese nombre' });
    }
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

/* Mover archivo
req: {  folder_before, ==> "/" --> root, o especificando "nombre carpeta"
        folder_after, ==> "/" --> root, o especificando "nombre carpeta"
        name, 
        ext
      }
*/
router.post('/movefile/:nickname', async (req, res) => {
  let { folder_before, folder_after, name, ext } = req.body;
  let { nickname } = req.params

  try {
    if (folder_before !== folder_after) {
      //console.log("Requiere mover");
      //Obtengo el usuario
      let usser = await getCharacterById(nickname)

      //Obtengo el objeto file donde este
      let archivos;
      let carpetas;
      let archivo;

      if (folder_before === "/") {
        // Root
        archivos = usser.Item.workspace.archivos;
        archivo = archivos.find(archivo => (archivo.nombre === name) && (archivo.extension === ext));

        //Elimino el objeto file donde este
        archivos = removeItem(archivos, archivo);
        //console.log('Requiere mover en archivos');
      }
      else {
        // Carpeta
        carpetas = usser.Item.workspace.carpetas;
        archivo = carpetas.find(carpeta => carpeta.nombre === folder_before).archivos.find(archivo => (archivo.nombre === name) && (archivo.extension === ext));

        //Elimino el objeto file donde este
        var lstFilesByFolder = carpetas.find(carpeta => carpeta.nombre === folder_before).archivos;
        carpetas = removeItem(lstFilesByFolder, archivo);
        //console.log('Requiere mover en carpeta');
      }

      //Verificando que el archivo no exista al lugar donde se movera
      //Retorna true sino existe
      var info = noDetectFile(usser, folder_after, name, ext);
      //console.log("info: "+ info);
      if (info === 1) {
        //Muevo y guardo el objeto file en el folder 
        if (folder_after === "/") {
          // Root
          let archivos2 = usser.Item.workspace.archivos.push(archivo);

          //Guardo el objeto
          let newUsser = usser.Item;
          //console.log(newCh);
          let newUsser2 = await addOrUpdateCharacter(newUsser);

          res.status(200).json({ newUsser2 });
        }
        else {
          // Carpeta
          carpetas = usser.Item.workspace.carpetas.find(carpeta => carpeta.nombre === folder_after).archivos.push(archivo);

          //Guardo el objeto
          let newUsser = usser.Item;
          //console.log(newCh);
          let newUsser2 = await addOrUpdateCharacter(newUsser);

          res.status(200).json({ newUsser2 });
        }
      }
      else {
        res.status(200).json({ msg: 'Archivo existente en destino' });
      }
    }
    //res.status(200).json({ msg: 'No requiere mover' });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

router.get('/usuarios', async (req, res) => {
  try {
    const characters = await getCharacters();
    res.json(characters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

module.exports = router;
