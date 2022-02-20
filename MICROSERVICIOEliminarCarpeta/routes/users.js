var express = require('express');
var router = express.Router();

const {
  addOrUpdateCharacter,
  getCharacters,
  deleteCharacter,
  getCharacterById,
} = require('./dynamo');

const usuario1 = {
  "nickname": "usuarioEd",
  "correo": "asfasdf@gmail.com",
  "fechaNacimiento": "11-3-2021",
  "contrasena": "asdfqw$$@@$%@@$%%$#$@#@#@@@@@@",
  "workspace": {
    "carpetas": [
      {
        "nombre": "carpeta1",
        "fechaCreacion": "21-02-21",
        "eliminado": 0,
        "archivos": [
          {
            "nombre": "archivoA",
            "extension": ".jpg",
            "link": "https://aws.asldkfqe322etc",
            "fechaSubida": "11-12-21",
            "eliminado": 0
          },
          {
            "nombre": "archivoB",
            "extension": ".jpg",
            "link": "https://aws.asldkfqe322etc",
            "fechaSubida": "11-12-21",
            "eliminado": 1
          }
        ]
      },
      {
        "nombre": "carpeta2",
        "fechaCreacion": "21-02-21",
        "eliminado": 0,
        "archivos": [
          {
            "nombre": "archivoA",
            "extension": ".jpg",
            "link": "https://aws.asldkfqe322etc",
            "fechaSubida": "11-12-21",
            "eliminado": 0
          },
          {
            "nombre": "archivoB",
            "extension": ".jpg",
            "link": "https://aws.asldkfqe322etc",
            "fechaSubida": "11-12-21",
            "eliminado": 1
          }
        ]
      }
    ],
    "archivos": [
      {
        "nombre": "archivo1",
        "extension": ".jpg",
        "link": "https://aws.asldkfqe322etc",
        "fechaSubida": "11-12-21",
        "eliminado": 0
      },
      {
        "nombre": "archivo2",
        "extension": ".jpg",
        "link": "https://aws.asldkfqe322etc",
        "fechaSubida": "11-12-21",
        "eliminado": 1
      }
    ]
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('soy el users del microservicio eliminar carpeta');
  //getCharacter();
  //addOrUpdateCharacter(usuario1);
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

router.get('/usuarios/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const character = await getCharacterById(id);
    res.json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

//para actualizar CARPETA
router.get('/eliminarCarpeta/:nickname/:folder', async (req, res) => {
/*
  const { nickname, folder } = req.params;


  try {
    const character = await getCharacterById(nickname); //parser a json
    const carpetas = character.Item.workspace.carpetas;
    let carpeta = carpetas.find(carpeta => carpeta.nombre === folder).eliminado = 1

    const newCh = character.Item;
    //console.log(newCh)
    const newCharacter = await addOrUpdateCharacter(newCh);
    res.json({newCharacter, esError: 'no'});

  } catch (err) {
    console.error(err);
    res.status(500).json({ err: err, esError: 'si' });
  }
*/
  const { nickname, folder } = req.params;
  var result = "";
  var elimino = 0;

  try {
    const character = await getCharacterById(nickname); //parser a json

    let carpetas;

    carpetas = character.Item.workspace.carpetas;
    for(var i = 0; i < carpetas.length; i++){

      if(carpetas[i].nombre == folder){
        if(carpetas[i].eliminado == 0){
          try {
            const elemento = character.Item.workspace.carpetas[i].eliminado = 1;

            const newCh = character.Item;
            //console.log(newCh)
            const newCharacter = await addOrUpdateCharacter(newCh);
            res.send("CORRECTO: La carpeta fue eliminada exitosamente");
            res.json({newCharacter, esError: 'no'});

          } catch (err) {
            console.error(err);
            res.status(500).json({ err: err, esError: 'si' });
          }
        }
      }

    }

    res.send("ERROR: No se pudo eliminar la carpeta. DETALLE: La carpeta no existe.") ;

  } catch (err) {
    console.error(err);
    res.status(500).json({ err: err, esError: 'si' });
  }
});

//para crear
router.post('/usuarios', async (req, res) => {
  const character = req.body;
  console.log(character)
  try {
    const newCharacter = await addOrUpdateCharacter(character);
    res.json(newCharacter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

//para actualizar
router.put('/usuarios/:nickname', async (req, res) => {
  const character = req.body;
  const { nickname } = req.params;
  character.nickname = nickname;
  try {
    const newCharacter = await addOrUpdateCharacter(character);
    res.json(newCharacter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

router.delete('/usuarios/:nickname', async (req, res) => {
  const { nickname } = req.params;
  try {
    res.json(await deleteCharacter(nickname));
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

module.exports = router;