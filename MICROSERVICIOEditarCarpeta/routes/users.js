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

/* GET users listing. */
router.get('/', function(req, res, next) {
 // res.send('respond with a resource');
});

router.post('/editarcarpeta/:nickname/:carpeta',async (req, res) =>{

  const { nickname, carpeta } = req.params;
  const { nuevo_nombre } = req.body;
  
  try {
    const character = await getCharacterById(nickname);
    const carpetas = character.Item.workspace.carpetas;
    let edicion = carpetas.find(folder => folder.nombre === carpeta).nombre = nuevo_nombre;

    const newCh = character.Item;
    //console.log(newCh)
    const newCharacter = await addOrUpdateCharacter(newCh);
    res.json(newCharacter);

  } catch (err) {
    //console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }


});

module.exports = router;
