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
        Information.create(req.body)
            .then((information) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(information);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .put((req, res, next) => {
        Information.update(
            req.body, { where : { id : req.body.id }})
            .then((information) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(information);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /informations');
    });

router.route('/:Id')
    .get((req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /informations/'+ req.params.Id );
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /informations/'+ req.params.Id );
    })

    // Update information
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /informations'+ req.params.Id );
    })

    // Delete information by id
    .delete((req, res, next) => {
        Information.destroy({ where: { id : req.params.Id }})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });



module.exports = router ;
