'use strict'

var Auto = require('../models/Auto')

function show(req, res) {
    //Buscaremos un documento por el Id Proporcionado
    Auto.findById(req.params.id,function(err,data){
        if(err){
            res.status(500).send({message:'Internal server error'});
        }else{
            if(!data){
                res.status(404).send({message:'A car with the provided ID does not exist'});
            }else{
                res.status(200).send({data:data})
            }
        }
    });
}

function list(req, res) {
    //Auto.find({},function(arr,autos){
    //Para ordenar de manera descendente agregar -anio
    Auto.find({}).sort('anio').exec(function(err,data){
          if(err){
            res.status(500).send({message:'Internal server error'});
          }else{   
            res.status(200).send({data:data})
          }
    });
}

function save(req, res) {
    //Definimos el objeto que se guardara como documento
    var auto = new Auto(req.body);
    auto.save(function(err,data){
        if(err){
            if(err && err.name == 'ValidationError'){
                res.status(422).send({message:err.message})
            }else{
                res.status(500).send({message:'Internal server error'});
            }
        }else{
            res.status(200).send({data:data})
        }
    });
};

function update(req,res) {
    //Utilizamos la función findByIdAndUpdate, busca un documento por id y lo actualiza
    Auto.findByIdAndUpdate(req.params.id,req.body,{new:true},function(err,data){
        if(err){
            res.status(500).send({message:'Internal server error'});
            return
        }else{
            if(!data){
                res.status(404).send({message:'A car with the provided ID does not exist'});
                return
            }else{
                res.status(200).send({data:data});return
            }
        }
    });
}

function delete_(req, res) {
    Auto.findByIdAndRemove(req.params.id,function(err,data){
        if(err){
            res.status(500).send({message:'Internal server error'});
        }else{
            if(!data){
                res.status(404).send({message:'A car with the provided ID does not exist'});
            }else{
                res.status(200).send({message:'Car deleted successfully'});
            }
        }
    })
}

//Definimos los métodos que pueden ser alcanzables
module.exports = {
    show,
    list,
    save,
    update,
    delete_
}