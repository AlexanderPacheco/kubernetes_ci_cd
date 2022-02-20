//BACKEND:
//la puerta para el MICRO/SERVICIO aqui sale o entra la info
var express = require('express');
var router = express.Router()
const apiAdapter = require('../routes/apiAdapter')
var uuid = require('uuid-random');

const {
    addOrUpdateCharacter,
} = require('../routes/dynamo');

const BASE_URL = process.env.API_MICROSERVICIOEDITARCARPETA //'http://localhost:3300'
const api = apiAdapter(BASE_URL)

let log = {
    id: "",
    metodoMiddleware: "",
    entrada: "",
    salida: "",
    esError: "",
    fechaHora: ""
}
//http://localhost:3000/listarcarpeta/func/g2/listarcarpetas/:nickname
router.post('/func/g2/editarcarpeta/:nickname/:carpeta', (req, res) => {
    let pack = log;
    api.post(req.path,req.body).then(resp => {
        
        try {
            pack.id = uuid();
            pack.metodoMiddleware = req.path;
            pack.entrada = "Nickname: "+req.params.nickname+"\nCarpeta: "+req.params.carpeta;
            pack.fechaHora = fecha();
            pack.salida = "Nuevo: "+resp.data;
            pack.esError = "no";
            res.send(resp.data);
        } catch (err) {
            console.error(err);
            pack.salida = err;
            pack.esError = "si";
            res.status(500).json({ err: 'Something went wrong' });
        }
        finally {
            guardarLog(pack);
        }
    })
})

//para guardar en la bd
async function guardarLog(log) {
    // try {
    //     //console.log(log)
    //     const newCharacter = await addOrUpdateCharacter(log);
    //     //console.log(newCharacter);
    // } catch (err) {
    //     console.error(err);
    //     console.log({ err: 'Something went wrong' });
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