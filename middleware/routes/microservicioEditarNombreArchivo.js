//BACKEND:
//la puerta para el MICRO/SERVICIO aqui sale o entra la info
var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')

const BASE_URL = 'http://localhost:3500'
const api = apiAdapter(BASE_URL)

//get==get
//post==post

router.get('/test', (req, res) => {
    api.get(req.path).then(resp => {
        res.send(resp.data)
    })
})

module.exports = router