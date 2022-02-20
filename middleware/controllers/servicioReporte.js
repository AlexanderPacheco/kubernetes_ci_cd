//BACKEND:
//la puerta para el MICRO/SERVICIO aqui sale o entra la info
var express = require('express');
var router = express.Router()
const apiAdapter = require('../routes/apiAdapter')

const BASE_URL = process.env.API_SERVICIOREPORTES //'http://localhost:3600'
const api = apiAdapter(BASE_URL)

//http://localhost:3000/listareporte/reporte/logs
router.get('/reporte/logs', (req, res) => {
    api.get(req.path).then(resp => {
        res.send(resp.data)
    })
})


module.exports = router