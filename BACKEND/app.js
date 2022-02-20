var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors')
const corsOptions = {
  origin: '*', //origin: ['*','http://35.232.188.235:80', 'http://34.66.150.145:2300'],
  optionsSuccessStatus: 200
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/files');
var eliminarCarpetaRouter = require('./routes/eliminarCarpeta');
var editarCarpetaRouter = require('./routes/editarCarpeta');
var listarCarpetaRouter = require('./routes/listarCarpeta');
var reportesRouter = require('./routes/reportes');
var usuarioRouter = require('./routes/usuario');

var crearCarpetaRouter = require('./app/routers/s3.router.js');
var filesRouter = require('./app/routers/s3two.router.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors(corsOptions))

app.use('/', indexRouter);
app.use('/users', usersRouter);

//--------------------------------EDITAR CARPETA----------------------------
app.use('/editarCarpeta', editarCarpetaRouter);
//--------------------------------ELIMINAR CARPETA----------------------------
app.use('/eliminarCarpeta', eliminarCarpetaRouter);
//--------------------------------LISTAR CARPETA----------------------------
app.use('/listarCarpeta', listarCarpetaRouter);
//-----------------------------------REPORTES--------------------------------
app.use('/reportes', reportesRouter);
//-----------------------------------USUARIO--------------------------------
app.use('/usuario', usuarioRouter); // usuario/
//-----------------------------------CREAR CARPETA--------------------------------
app.use('/crearCarpeta',crearCarpetaRouter);
//-----------------------------------FILES--------------------------------
app.use('/api/v1', indexRouter);
app.use('/files', usersRouter);
//app.use('/filesmas',filesRouter);
app.use('/filesmas',crearCarpetaRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
