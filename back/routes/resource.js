const express = require("express");
const Resource = require("../models/resource");
const router = express.Router();
const multer = require('multer') ;
const MIME_TYPE_MAP = require('../util/mime-type') ;
const uuid = require('uuid/v1') ;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "data");
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, uuid() + "." + ext);
    }
});

router
  .route("/")
  .get((req, res, next) => {
    Resource.findAll()
      .then(
        resources => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resources);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })

  .post(multer({ storage: storage }).single("content") ,(req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    Resource.create({
      title: req.body.title,
      content:  url + "/data/" + req.file.filename ,
      type: req.body.type
    })
      .then(
        resource => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resource);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /resources");
  })

  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /resources");
  });

module.exports = router;
