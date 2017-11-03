'use strict'

var mongoose = require('mongoose')

function emptyBodyMidd(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        res.status(422).send({ message: 'Empty application/json header' })
    } else {
        try {
            req.body = JSON.parse(req.body)
            next()
        } catch (error) {
            res.status(422).send({ message: "Invalid JSON" })
        }
    }
}

function verifyMongooseIdMidd(req, res, next) {
    if (!req.params.id) {
        res.status(409).send({ message: 'Empty params id' });
    } else if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(422).send({message:'Invalid params id'});
        return
    } else {
        next()
    }
}

module.exports = {
    emptyBodyMidd,
    verifyMongooseIdMidd
}