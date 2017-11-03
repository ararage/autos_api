'use strict'

//Importamos express
var express = require('express')
//Importamos el controlador
var autoController = require('../controllers/auto')
//Middleware
var Utils = require('../middlewares/utils')
//Instanciamos un objeto Roter
var api = express.Router();

api.get('/autos/', autoController.list);
api.get('/autos/:id?', Utils.verifyMongooseIdMidd, autoController.show);
api.post('/autos', Utils.emptyBodyMidd,autoController.save);
api.put('/autos/:id?', 
    Utils.verifyMongooseIdMidd,
    Utils.emptyBodyMidd,
    autoController.update);
api.delete('/autos/:id?', Utils.verifyMongooseIdMidd,autoController.delete_);

//Para utilizarlo en otros ficheros e importar
module.exports = api;