//FRONTEND:
//el archivo para enrutar la peticion al micro/servicio
//la puerta para el FRONTEND aqui entra o sale la info
var express = require('express');
var router = express.Router();
var eliminarCarpetaController = require('../controllers/microservicioEliminarCarpeta');

//listar todos los endpoints pera para este micro/servicio en especifico

//Autenticacion
router.use((req, res, next) => {
    console.log("Called: ", req.path)
    // TODO: mi logica de autenticacion
    next()
})


router.use(eliminarCarpetaController)

module.exports = router;