var express = require('express');
const cors = require('cors');
var router = express.Router();
router.use(cors());
const Speakeasy = require("speakeasy");
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

// ------------------------ SON PARA ENVIAR CORREOS ELECTRONICOS-----------------

/*const transport = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:"oriamnut09@gmail.com",
    pass:"ingemario",
  },
  tls:{
    rejectUnauthorized:false,
  }
});*/
/*const transport = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 465,
  secure: true,
  apiKey: process.env.SENDGRID_API_KEY
});*/

//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

const {
  addOrUpdateCharacter,
  getCharacters,
  deleteCharacter,
  getCharacterById,
  getLog,
  existeusuario,
  agregar_columna,
} = require('./dynamo');
const { SecretsManager } = require('aws-sdk');
/////******************************************** */


const usuario1 = {
  "nickname": "usuario2",
  "correo": "asfasdf@gmail.com",
  "fechaNacimiento": "11-3-2021",
  "contrasena": "asdfqw$$@@$%@@$%%$#$@#@#@@@@@@",
  "workspace": {
    "carpetas": [
      {
        "nombre": "carpeta1",
        "fechaCreacion": "21-02-21",
        "eliminado": 0,
        "archivos": [
          {
            "nombre": "archivoA",
            "extension": ".jpg",
            "link": "https://aws.asldkfqe322etc",
            "fechaSubida": "11-12-21",
            "eliminado": 0
          },
          {
            "nombre": "archivoB",
            "extension": ".jpg",
            "link": "https://aws.asldkfqe322etc",
            "fechaSubida": "11-12-21",
            "eliminado": 1
          }
        ]
      },
      {
        "nombre": "carpeta2",
        "fechaCreacion": "21-02-21",
        "eliminado": 0,
        "archivos": [
          {
            "nombre": "archivoA",
            "extension": ".jpg",
            "link": "https://aws.asldkfqe322etc",
            "fechaSubida": "11-12-21",
            "eliminado": 0
          },
          {
            "nombre": "archivoB",
            "extension": ".jpg",
            "link": "https://aws.asldkfqe322etc",
            "fechaSubida": "11-12-21",
            "eliminado": 1
          }
        ]
      }
    ],
    "archivos": [
      {
        "nombre": "archivo1",
        "extension": ".jpg",
        "link": "https://aws.asldkfqe322etc",
        "fechaSubida": "11-12-21",
        "eliminado": 0
      },
      {
        "nombre": "archivo2",
        "extension": ".jpg",
        "link": "https://aws.asldkfqe322etc",
        "fechaSubida": "11-12-21",
        "eliminado": 1
      }
    ]
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('soy el users del microservicio eliminar carpeta');
  //getCharacter();
  //addOrUpdateCharacter(usuario1);
});

// Logueo del usuario

router.get('/login/:nickname', async (req, res) => {
  // const nickname = req.body.nickname;
  // const contrasena = req.body.contrasena;

  const nickname = req.params.nickname;
  try {
    const character = await getLog(nickname);
    res.json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});



router.get('/usuarios', async (req, res) => {
  try {
    const characters = await getCharacters();
    res.json(characters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

router.get('/usuario/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const character = await getCharacterById(id);
    res.json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});


//METODO PARA VALIDAD SI EXISTE UN USUARIO
router.get('/validar/:nickname', async (req, res) => {
  
  const nickname = req.params.nickname;
  //const correo = req.params.correo;
  //const correo = req.body.correo;
  //console.log("-----"+correo.correo);
  
  try {
    const validar = await existeusuario(nickname);
    //console.log("validacion: "+validar)
    //console.log("validacion22: "+validar.Items[0])
    //console.log("validacion33: "+validar.Items[0].nickname)
    /*if (validar.Count==1){
      res.json({status:"El usuario ya esta registrado.",message:validar});

    }else{
      res.json({status:"Se ha registrado con exito",message:validar});
    }*/
    res.json(validar);

  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});


//METODO PARA INSERTAR UN USUARIO A LA TABLA
router.post('/usuarios', async (req, res) => {
  
  const character = req.body;
  try {
   
    const newCharacter = await addOrUpdateCharacter(character);
    res.json(
      {
        status:"Resistro de usuario con exito",
        message:newCharacter
      }
      );

  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});


router.put('/usuarios/:nickname', async (req, res) => {
  const character = req.body;
  const { nickname } = req.params;
  character.nickname = nickname;
  try {
    const newCharacter = await addOrUpdateCharacter(character);
    res.json(newCharacter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

router.delete('/usuarios/:nickname', async (req, res) => {
  const { nickname } = req.params;
  try {
    res.json(await deleteCharacter(nickname));
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

/*------------------------------ AUTENTICACION DE DOS FASES ------------------------*/
router.post('/usuarios/activarkey',async(req,res)=>{
  /*Se tiene que agregar al usuario en la DB los campos de llave,telefono,2fa(1=activado o 0=desactivado),
   cuando el usuario presione el boton de activar autenticacion 
  {
	  "nickname":"rafa"
  }
*/
  
  try {
    const datos = req.body;
    var secret = Speakeasy.generateSecret({ length: 20 });
    agregar_columna(datos.nickname,secret.base32,'1')
    res.send({
      "TwoFactor":"true",
       "secret": secret.base32
       });

  } catch (error) {
    res.send({
      "TwoFactor":"false",
      "ErrorActivar":error
    });
  }

  

});

router.post('/usuarios/desactivarkey',async(req,res)=>{
  /*Se tiene que agregar al usuario en la DB los campos de llave,telefono,2fa(1=activado o 0=desactivado),
   cuando el usuario presione el boton de activar autenticacion */
  try {
    const datos = req.body;
    agregar_columna(datos.nickname,"nothing",'0');
    res.send({
      "TwoFactor":"true"
    });

  } catch (error) {
    res.send({
      "TwoFactor":"false",
      "ErrorDesactivar":error
    });
  }
   
  

});

router.post('/usuarios/generarkey', async (req, res, next) => {
  /*Se va a generar la clave de 6 digitos a partir de la llave secreta que se creo al
  momento que el usuario precione el boton de iniciar sesion*/
  /*let mailOptions={
    from:'oriamnut09@gmail.com',
    to: 'lidiatund6medicina@gmail.com',
    subject: 'Autenticacion login',
    html: '<h1>el nicolas se comio la comida</h1>'
  }
  transport.sendMail(mailOptions,function(err,success){
    if (err){
      console.log("Error Mail:"+err)
    }else{
      console.log("SE ENVIO EL CORREO CORRECTAMENTE")
    }
  });*/
  /*
  {
    "secret":"fsaskojpf45894m4c" o "nickname":"usuario1"
  }
  */
  const datos=req.body
  const usuario= await getCharacterById(datos.nickname);
  //var secrett = Speakeasy.generateSecret({ length: 20 });
  //sendCorreo(datos.correo,datos.secret.base32);
  //console.log("llave 6 digitos: "+datos.secret);
  //console.log("GENERAR: name--> "+datos.nickname+" secret--> "+usuario.Item.secret);
  res.send({
      "token": Speakeasy.totp({
          //secret: datos.secret,
          secret: usuario.Item.secret,
          //secret: secrett.base32,
          encoding: "base32"
      }),
      "remaining": (180 - Math.floor((new Date()).getTime() / 1000.0 % 180)),
      "datos": usuario.Item.secret
  });
});

router.post('/usuarios/validarkey', async (req, res, next) => {
  /*Es para ver si todavia esta activo la llave o clave que se mando por correo o por mensaje de texto ,
  ya que solo cuenta con 3min de validodez al momento de que se presione el boton de la confirmacion */
  const datos=req.body
  const usuario= await getCharacterById(datos.nickname);
  console.log("VALIDAR: "+" secret-->"+usuario.Item.secret+" token-->"+datos.token)
  var tokenDelta=Speakeasy.totp.verify({
    secret: usuario.Item.secret,
    encoding: "base32",
    token: datos.token,
    window: 6
  }) 
  console.log("tokenDelta: "+tokenDelta)
    res.send({
        "valid": tokenDelta
    });
});

// ------------------------ SON PARA ENVIAR CORREOS ELECTRONICOS-----------------
const crearTrans = () =>{
  const transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: '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'
        //apiKey: process.env.SENDGRID_API_KEY
    })
  );
  return transport
}

router.post('/usuarios/sendemail',(req, res, next) => {

  const datos=req.body;
  //sendCorreo(datos.correo,datos.key);

  try {
    const transporter=crearTrans();
    transporter.sendMail({
      from:'oriamnut09@gmail.com',
      to: datos.correo,
      subject: 'Autenticacion login',
      html: `<html>
              <head>
                <title>Llave Autenticacion</title>
              </head>
              <body align="center">
                <div class="text-center">
                  <h1>AYDRIVE , gestor de archivos en la nube. </h1>
                  <p>Para mayor seguridad e integridad con sus datos le enviamos la siguente llave para
                  iniciar sesion.
                  <br>
                  <h2>${datos.key}</h2>
                </div>
              </body>
            </html>
      `

    },(err2)=>{
      if(err2){
        res.send({"CorreoEnviado":err2});
      }else{
        res.send({"CorreoEnviado":"true"});
      }
      
    });

  } catch (error) {
    res.send({
      "ErrorSendEmail":err
    });
  }

});

/*const sendCorreo = async (correo,llave) =>{
  const transporter=crearTrans()
  const informacion= await transporter.sendMail({
    from:'oriamnut09@gmail.com',
    to: correo,
    subject: 'Autenticacion login',
    html: `<h1>AYDRIVE_GUATEMALA</h1>
          <h3>La llave para iniciar sesion es: ${llave} </h3>`
  },
  function(err,success){
    if (err){
      console.log("Error Mail:"+err)
      //return err

    }else{
      console.log("SE ENVIO EL CORREO CORRECTAMENTE")
      //return "SE ENVIO EL CORREO CORRECTAMENTE"
    }
  });
  return
}*/


module.exports = router;
