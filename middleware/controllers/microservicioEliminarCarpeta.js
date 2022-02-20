//BACKEND:
//la puerta para el MICRO/SERVICIO aqui sale o entra la info
var express = require('express');
var router = express.Router()
const apiAdapter = require('../routes/apiAdapter')
var uuid = require('uuid-random');

const {
    addOrUpdateCharacter,
} = require('../routes/dynamo');

const BASE_URL = process.env.API_MICROSERVICIOELIMINARCARPETA //'http://localhost:3100'
const api = apiAdapter(BASE_URL)

const log = {
    "id" : "q31kl213l1k23",
    "metodoMiddleware" : "/usuario",
    "entrada" : "{\"campo1\":\"valor\", \"campo1\":\"valor\"}",
    "salida" : "{\"salida1\":\"valor\", \"salida2\":\"valor\"}",
    "esError" : "no",
    "fechaHora" : "01/08/2021 18:50:12"
}

//get==get
//post==post
//http://localhost:3000/eliminarCarpeta/api/v1/eliminarCarpeta/:nickname/:folder
router.get('/api/v1/eliminarCarpeta/:nickname/:folder', (req, res) => {
    api.get(req.path).then(resp => {

        try{
            const log = {
                id : uuid(),
                metodoMiddleware : req.path,
                entrada : req.body,
                salida : res.body, //res.body
                esError : res.body.esError, //res.atributo  //si //no
                fechaHora : fecha()
            }
            res.send(resp.data)
        }catch (err){
            res.status(500).json({ err: 'Something went wrong' });
        }finally {
            guardarLog(log)
        }
    })
})

//para guardar en la bd
async function guardarLog(log) {
    // try {
    //     console.log(log)
    //     const newCharacter = await addOrUpdateCharacter(log);
    //     console.log(newCharacter);
    // } catch (err) {
    //     console.error(err);
    //     console.log({err: 'Something went wrong'});
    // }
}
function fecha() {
    let date_ob = new Date();
    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current hours
    let hours = date_ob.getHours();
    // current minutes
    let minutes = date_ob.getMinutes();
    // current seconds
    let seconds = date_ob.getSeconds();
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    let datenow = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    return datenow;
}

module.exports = router