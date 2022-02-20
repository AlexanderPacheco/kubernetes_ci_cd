//FRONTEND:
//el archivo para enrutar la peticion al micro/servicio
//la puerta para el FRONTEND aqui entra o sale la info
var express = require('express');
var router = express.Router();
var reporteLogsController = require('../controllers/servicioReporte');

//listar todos los endpoints pera para este micro/servicio en especifico

//Autenticacion
router.use((req, res, next) => {
    console.log("Called: ", req.path)
    // TODO: mi logica de autenticacion

    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Accept, Authorization,X-Custom-Header,Access-Control-Allow-Origin");
    next()
})


router.use(reporteLogsController)

module.exports = router;