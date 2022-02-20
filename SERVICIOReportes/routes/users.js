var express = require('express');
const cors = require('cors');
var router = express.Router();
router.use(cors());

const {
  getCharacters,
} = require('./dynamo');


/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
});

router.get('/logs', async (req, res) => {
  try {
    const characters = await getCharacters();
    res.json(characters.Items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});


module.exports = router;
