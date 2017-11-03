
//Importamos body-parser y express
var bodyParser = require('body-parser'),
    path = require('path'),
    express = require('express');

//Configuracion
var config = require('./config')
//importamos las rutas del recurso para autos
var auto = require('./routes/auto')
//Declaramos la variable app como instancia de express
var app = express()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text({ type: 'application/json' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
    //Puede ser consumida desde cualquier lugar
    res.header('Access-Control-Allow-Origin','*');
    //Cabeceras permitidas
    res.header('Access-Control-Allow-Headers','X-API-KEY,Origin,X-Requested-With,Content-Type, Accept, Access-Control-Request-Method');
    //Metodos Permitidos
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.header('Allow','GET,POST,PUT,DELETE');
    next();
});

//URL de la API
app.use('/api',auto);

/*Manejador de errores*/
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = err
    res.status(err.status);
    if (err.status == 404) {
        res.render('notfound');
    } else {
        res.render('error')
    }
});

//Para utilizarlo en otros ficheros e importar
module.exports = app;