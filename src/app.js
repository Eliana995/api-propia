var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
var logger = require('morgan');

//Ejecuto el llamado a mis rutas
const indexRouter = require('./routes/index');
const moviesRoutes = require('./routes/moviesRoutes');
const genresRoutes = require('./routes/genresRoutes');

//Aquí pueden colocar las rutas de las APIs
const genresRouterApi = require('./routes/api/genresRouterApi')
const moviesRouterApi = require('./routes/api/moviesRouterApi')
const actorsRouterApi = require('./routes/api/actorsRouterApi')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));

//Aquí estoy disponiendo la posibilidad para utilizar el seteo en los formularios para el usod e los metodos put ó delete
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use(moviesRoutes);
app.use(genresRoutes);
//Rutas de las APIS
app.use('/api/genres', genresRouterApi);
app.use('/api/movies', moviesRouterApi);
app.use('/api/actors', actorsRouterApi);

//Activando el servidor desde express
app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));

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
