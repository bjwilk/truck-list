const express = require("express");
const cors = require('./cors');
const authenticate = require('../authenticate');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = require('../utils/multerConfig');
const fs = require("fs")

const Truck = require("../models/truck");
const User = require("../models/user")
const truckRouter = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET
});

truckRouter.route("/userTrucks/:id")
.get(authenticate.authenticateToken, (req, res) => {
let id = req.user.id;
Truck.find({userId: id})
})


truckRouter.route("/search").get((req, res) => {
    const {make, model, body} = req.query;
    console.log("model: ", model)
    const myquery = {}
    if (make) {
        myquery.make = { $regex: `${make}`, $options: 'i' }
    }

    if (model ) {
        myquery.model = { $regex: `${model}`, $options: 'i' }
    }

    if (body ) {
        myquery.body = { $regex: `${body}`, $options: 'i' }
    }
    
    Truck.find(myquery).then((result) => {
      console.log(result);
      res.json(result);
    });
  });

truckRouter
  .route("/")
  .get((req, res, next) => {
    Truck.find()
      .then((trucks) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(trucks);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.authenticateToken, upload.single("image"), async (req, res, next) => {
    req.body.userId = req.user.id;
    console.log(req.body)
    console.log(req.file)
    const imageResult = await cloudinary.uploader.upload(req.file.path)
    console.log(imageResult)
    req.body.url = imageResult.secure_url
    req.body.image = req.file.originalname
    // res.json({response: 'still testing'})
    const temporaryFilePath = req.file.path;
        fs.unlink(temporaryFilePath, (err) => {
            if (err) {
                console.error('Error removing file:', err);
            } else {
                console.log('File removed successfully');
            }
        });
    Truck.create(req.body)
      .then((truck) => {
        console.log("Truck Created ", truck);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(truck);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /trucks");
  })
  .delete((req, res, next) => {
    Truck.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });



truckRouter
  .route("/:truckId")
  .get((req, res, next) => {
    Truck.findById(req.params.truckId)
      .then((truck) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(truck);
      })
      .catch((err) => next(err));
  })
  // .post((req, res) => {
  //     res.statusCode = 403;
  //     res.end(`POST operation not supported on /trucks/${req.params.truckId}`);
  // })
  .put((req, res, next) => {
    Truck.findByIdAndUpdate(
      req.params.truckId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((truck) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(truck);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Truck.findByIdAndDelete(req.params.truckId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });



module.exports = truckRouter;
