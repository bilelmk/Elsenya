const express = require("express");
const router = express.Router();
const multer = require('multer');
const MIME_TYPE_MAP = require('../util/mime-type');
const LibraryResource = require("../models/library-resource");
const uuid = require('uuid/v1');
const fs = require('fs') ;

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
        LibraryResource.findAll()
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

    .post(multer({storage: storage}).single("content"), (req, res, next) => {
        const url = req.protocol + "://" + req.get("host");
        LibraryResource.create({
            title: req.body.title,
            content: url + "/data/" + req.file.filename,
            type: req.body.type,
            libraryId: req.body.libraryId
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

    .put(multer({storage: storage}).single("content"), (req, res, next) => {
        const url = req.protocol + "://" + req.get("host");
        LibraryResource.update({
            title: req.body.title,
            content:req.file ? url + "/data/" + req.file.filename : req.body.content,
            type: req.body.type,
            libraryId: req.body.libraryId
        }, {where: {id: req.body.id}})
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

    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end("DELETE operation not supported on /library-ressources");
    });

router.route('/:Id')
    .get((req, res, next) => {
        LibraryResource.findAll({where: {libraryId: req.params.Id}})
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
    .delete((req, res, next) => {
        LibraryResource.destroy({ where: { id : req.params.Id }})
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
