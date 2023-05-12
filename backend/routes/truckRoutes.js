const express = require('express');

const Truck = require('../models/truck');
const truckRouter = express.Router();

truckRouter.route('/')
.get((req, res, next) => {
    Truck.find()
    .then(trucks => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(trucks);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Truck.create(req.body)
    .then(truck => {
        console.log('Truck Created ', truck);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(truck);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})
.delete((req, res, next) => {
    Truck.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

truckRouter.route('/:truckId')
.get((req, res, next) => {
    Truck.findById(req.params.truckId)
    .then(truck => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(truck);
    })
    .catch(err => next(err));
})
// .post((req, res) => {
//     res.statusCode = 403;
//     res.end(`POST operation not supported on /trucks/${req.params.truckId}`);
// })
.put((req, res, next) => {
    Truck.findByIdAndUpdate(req.params.truckId, {
        $set: req.body
    }, { new: true })
    .then(truck => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(truck);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Truck.findByIdAndDelete(req.params.truckId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = truckRouter