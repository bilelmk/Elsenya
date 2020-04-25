const express = require("express");
const Resource = require("../models/resource");
const router = express.Router();

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

  .post((req, res, next) => {
    Resource.create({
      title: req.body.title,
      content: req.body.content,
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
