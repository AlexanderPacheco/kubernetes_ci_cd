
const cors = require('cors');
let express = require('express');
let router = express.Router();

router.use(cors());
 
let upload = require('../config/multer.config.js');

const awsWorker = require('../controllers/s3.controller.js');


router.post('/ccarpeta/:nickname/:carpeta', awsWorker.ccarpeta);
 
module.exports = router;
