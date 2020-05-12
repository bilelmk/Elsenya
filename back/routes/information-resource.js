const express = require("express");
const multer = require('multer') ;
const uuid = require('uuid/v1') ;
const fs = require('fs') ;
const auth = require('../util/auth');

const MIME_TYPE_MAP = require('../util/mime-type') ;
const InformationResource = require("../models/information-resource");

const router = express.Router();

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

router.route("/")
  .get((req, res, next) => {
    InformationResource.findAll()
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

  .post(auth,multer({ storage: storage }).single("content") ,(req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    InformationResource.create({
      title: req.body.title,
      content:  url + "/data/" + req.file.filename ,
      type: req.body.type ,
      informationId : req.body.informationId
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
    res.end("PUT operation not supported on /information-resources");
  })

  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /information-resources");
  });

router.route('/:Id')
    // Get by information id
    .get((req, res, next) => {
        InformationResource.findAll({ where : { informationId : req.params.Id }})
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

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported on /information-resources/" + req.params.Id);
    })

    // Update
    .put(auth,(req, res, next) => {
        InformationResource.update(
            req.body, { where : { id : req.params.Id }})
            .then((resource) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resource);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    // Delete information by id
    .delete(auth,(req, res, next) => {
        InformationResource.destroy({ where: { id : req.params.Id }})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));

        fs.unlink(req.body.content.replace("http://localhost:3001/",""), err => {
            console.log(err)
        });
    });

module.exports = router;
