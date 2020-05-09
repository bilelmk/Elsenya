const express = require('express') ;
const Library = require('../models/library');
const router = express.Router() ;


router.route('/')
    .get( (req, res, next) => {
        Library.findAll()
            .then(libraries => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(libraries);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post( (req, res, next) => {
        Library.create(req.body)
            .then((library) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(library);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .put((req, res, next) => {
        Library.update(
            req.body, { where : { id : req.body.id }})
            .then((library) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(library);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /libraries');
    });

router.route('/:Id')
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /libraries/'+ req.params.Id);
    })

    // Update library
    .put((req, res, next) => {
        Library.update(
            req.body, { where : { id : req.params.Id }})
            .then((library) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(library);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    // Delete library by id
    .delete((req, res, next) => {
        Library.destroy({ where: { id : req.params.Id }})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });



module.exports = router ;
