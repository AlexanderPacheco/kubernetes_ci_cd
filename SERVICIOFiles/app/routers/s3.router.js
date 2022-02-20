const cors = require('cors');

let express = require('express');
let router = express.Router();

router.use(cors());
 
let upload = require('../config/multer.config.js');

const awsWorker = require('../controllers/s3.controller.js');
 
router.post('/upload/:nickname/:carpeta', upload.single("file"), awsWorker.doUpload);
router.get('/all/:nickname/:carpeta', awsWorker.listKeyNames);
router.get('/eliminados/:nickname/:carpeta', awsWorker.listKeyNamesEliminadas);
router.get('/eliminaciondef/:nickname/:linkUnico', awsWorker.eliminacionDefinitiva);
router.get('/restaurar/:nickname/:linkUnico', awsWorker.restore);
router.get('/:filename', awsWorker.doDownload);
 
module.exports = router;
