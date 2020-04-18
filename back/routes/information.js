const express = require('express') ;
const Information = require('../models/information');
const router = express.Router() ;


router.route('/')
    .get( (req, res, next) => {
        Information.findAll()
            .then(informations => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(informations);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post( (req, res, next) => {
        Information.create({
            content : req.body.content
        })
            .then((information) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(information);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /informations');
    })

    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /informations');
    });



module.exports = router ;
