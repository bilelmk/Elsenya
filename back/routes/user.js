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
        agriculture:req.body.agriculture,
        governorate : req.body.governorate,
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
});

router.get("/stat", (req, res, next) => {
    let stats = [
                {governorate : "أريانة" , number : 0} , {governorate : "باجة" , number : 0} ,
                {governorate : "بنزرت" , number : 0} , {governorate : "بن عروس" , number : 0} ,
                {governorate : "تطاوين" , number : 0} , {governorate : "تونس" , number : 0} ,
                {governorate : "جندوبة" , number : 0} , {governorate : "توزر" , number : 0} ,
                {governorate : "سليانة" , number : 0} , {governorate : "زغوان" , number : 0} ,
                {governorate : "سوسة" , number : 0} , {governorate : "صفاقس" , number : 0} ,
                {governorate : "سيدي بوزيد" , number : 0} , {governorate : "قبلي" , number : 0} ,
                {governorate : "قابس" , number : 0} , {governorate : "القصرين" , number : 0} ,
                {governorate : "المنستير" , number : 0} , {governorate : "قفصة" , number : 0} ,
                {governorate : "منوبة" , number : 0} , {governorate : "القيروان" , number : 0} ,
                {governorate : "المهدية" , number : 0} , {governorate : "الكاف" , number : 0} ,
                {governorate : "نابل" , number : 0} , {governorate : "مدنين" , number : 0}
                ] ;
    User.findAll()
        .then(
            users => {
                users.map(user => {
                    stats.map( stat => {
                        if(user.governorate === stat.governorate){
                            stat.number ++
                        }
                    })
                });
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({stats : stats , number : users.length });
            },
            err => next(err)
        )
        .catch(err => next(err));
});


module.exports = router;
