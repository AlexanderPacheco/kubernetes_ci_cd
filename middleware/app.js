var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var eliminarCarpetaRouter = require('./routes/eliminarCarpeta');
var filesEdit = require('./routes/editarFiles');
var usuarioRouter = require('./routes/usuario');

var listarCarpeta=require('./routes/microsListarCarpeta');
var editarCarpeta=require('./routes/microsEditarCarpeta');
var listarReporte=require('./routes/servicioReporteLogs');

var deleteFiles = require('./routes/deleteFiles');
var CrearCarpetas=require('./routes/CrearCarpetas');
var ListaArchivos=require('./routes/ListaArchivos');
var SubirArchivos=require('./routes/SubirArchivos');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//todos los endpoints de nuestro backend por servicio o microservicio nada mas
//combinar todos los endpoints de los micro/servicios
app.use('/microservicioEliminarCarpeta', indexRouter);
app.use('/usersMiddleware', usersRouter);

app.use('/eliminarCarpeta', eliminarCarpetaRouter); //servicio eliminar carpeta
app.use('/servicioFiles', filesEdit); //servicio editar nombre de archivo y mover archivo
app.use('/usuario', usuarioRouter); // servicio usuario

app.use('/listarcarpeta',listarCarpeta);//servicio de listar las carpetas
app.use('/editarcarpeta',editarCarpeta);//servicio para editar una carpeta
app.use('/listareporte',listarReporte);//servicio para listar el reporte

app.use('/Servicefiles',deleteFiles);

app.use('/CrearCarpetas',CrearCarpetas);
app.use('/ListaArchivos',ListaArchivos);
app.use('/SubirArchivos',SubirArchivos);

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