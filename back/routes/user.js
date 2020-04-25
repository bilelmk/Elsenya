const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

router.post("/signup", (req, res, next) => {

  bcrypt.hash(req.body.password, 10).then(hash => {
    User.create({
        email: req.body.email,
        password: hash ,
        username :req.body.username,
        firstname :req.body.firstname,
        lastname :req.body.lastname,
        place : req.body.place,
        longitude :req.body.longitude,
        latitude : req.body.latitude,
        comment: req.body.comment,
        agriculture:req.body.agriculture
      })
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

router.get("/", (req, res, next) => {
  User.findAll()
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


module.exports = router;
