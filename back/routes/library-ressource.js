const express = require("express");
const router = express.Router();
const multer = require('multer') ;
const MIME_TYPE_MAP = require('../util/mime-type') ;
const LibraryRessource = require("../models/library-ressource");
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

router.route("/")
    .get((req, res, next) => {
        LibraryRessource.findAll()
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

    // .post(multer({ storage: storage }).single("content") ,(req, res, next) => {
    //     const url = req.protocol + "://" + req.get("host");
    //     LibraryRessource.create({
    //         title: req.body.title,
    //         content:  url + "/data/" + req.file.filename ,
    //         type: req.body.type ,
    //         // informationId : req.body.informationId
    //     })
    //         .then(
    //             resource => {
    //                 res.statusCode = 200;
    //                 res.setHeader("Content-Type", "application/json");
    //                 res.json(resource);
    //             },
    //             err => next(err)
    //         )
    //         .catch(err => next(err));
    // })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operation not supported on /library-ressources");
    })

    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end("DELETE operation not supported on /library-ressources");
    });

// router.route('/:Id')
//     .get((req, res, next) => {
//         LibraryRessource.findAll({ where : { informationId : req.params.Id }})
//             .then(
//                 resources => {
//                     res.statusCode = 200;
//                     res.setHeader("Content-Type", "application/json");
//                     res.json(resources);
//                 },
//                 err => next(err)
//             )
//             .catch(err => next(err));
//     });

module.exports = router;
