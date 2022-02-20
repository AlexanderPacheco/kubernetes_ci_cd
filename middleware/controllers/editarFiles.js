//BACKEND:
//la puerta para el MICRO/SERVICIO aqui sale o entra la info
var express = require('express');
var router = express.Router();
const apiAdapter = require('../routes/apiAdapter');
var uuid = require('uuid-random');
require('dotenv').config();

const {
    addOrUpdateCharacter,
} = require('../routes/dynamo');

//const BASE_URL = 'http://localhost:3500'
const BASE_URL = process.env.API_SERVICIOFILES;
const api = apiAdapter(BASE_URL)

let log = {
    id: "",
    metodoMiddleware: "",
    entrada: "",
    salida: "",
    esError: "",
    fechaHora: ""
}

//get==get
//post==post
//http://localhost:3500/servicioFiles/test
router.get('/api/v1/test', (req, res) => {
    //res.status(500).json({ err: 'Something went amlisimo :V' });
    let pack = log;
    api.get(req.path).then(resp => {

        try {
            pack.id = uuid();
            pack.metodoMiddleware = req.path;
            pack.entrada = req.body;
            pack.fechaHora = fecha();

            pack.salida = resp.data;
            pack.esError = "no";
            res.send(resp.data);
        } catch (err) {
            console.error(err);
            pack.salida = err;
            pack.esError = "si";
            res.status(500).json({ err: 'Something went wrong' });
        }
        finally {
            //console.log("FINALLY DE TEST");
            //console.log(pack);
            guardarLog(pack);
        }
    });
});

//http://localhost:3500/servicioFiles/editfile/:nickname
router.get('/api/v1/folder/:nickname', (req, res) => {

    let pack = log;
    api.get(req.path).then(resp => {

        try {
            pack.id = uuid();
            pack.metodoMiddleware = req.path;
            pack.entrada = req.body;
            pack.fechaHora = fecha();
            pack.salida = resp.data;
            pack.esError = "no";
            res.send(resp.data);
        } catch (err) {
            console.error(err);
            pack.salida = err;
            pack.esError = "si";
            res.status(500).json({ err: 'Something went wrong' });
        }
        finally {
            //console.log("FINALLY DE FOLDER");
            //console.log(pack);
            guardarLog(pack);
        }
    });
});

//http://localhost:3500/servicioFiles/editfile/:nickname
router.post('/api/v1/editfile/:nickname', (req, res) => {

    let pack = log;
    api.post(req.path, req.body).then(resp => {

        try {
            pack.id = uuid();
            pack.metodoMiddleware = req.path;
            pack.entrada = req.body;
            pack.fechaHora = fecha();
            pack.salida = resp.data;
            pack.esError = "no";
            res.send(resp.data);
        } catch (err) {
            console.error(err);
            pack.salida = err;
            pack.esError = "si";
            res.status(500).json({ err: 'Something went wrong' });
        }
        finally {
            //console.log("FINALLY DE EDITFILE");
            //console.log(pack);
            guardarLog(pack);
        }
    });
});

//http://localhost:3500/servicioFiles/movefile/:nickname
router.post('/api/v1/movefile/:nickname', (req, res) => {

    let pack = log;

    api.post(req.path, req.body).then(resp => {

        try {
            pack.id = uuid();
            pack.metodoMiddleware = req.path;
            pack.entrada = req.body;
            pack.fechaHora = fecha();
            pack.salida = resp.data;
            pack.esError = "no";
            res.send(resp.data);
        } catch (err) {
            console.error(err);
            pack.salida = err;
            pack.esError = "si";
            res.status(500).json({ err: 'Something went wrong' });
        }
        finally {
            //console.log("FINALLY DE MOVEFILE");
            //console.log(pack);
            guardarLog(pack);
        }
    });
});

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

//para guardar en la bd
async function guardarLog(log) {
    // try {
    //     console.log(log)
    //     const newCharacter = await addOrUpdateCharacter(log);
    //     console.log(newCharacter);
    // } catch (err) {
    //     console.error(err);
    //     console.log({ err: 'Something went wrong' });
    // }
}

module.exports = router