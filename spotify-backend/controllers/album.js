const express = require('express')
const router = express.Router()
const album = require('../models/albumSchema')
const path = require('path')
// const upload = require('../controllers/uploads')
//const fs = require('fs')


//MULTER TO STORE IMAGE/FILES
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

// File upto only 20MB can be uploaded
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 * 2 },
});



router.get('/', async (req, res, next) => {
    try {
        const songs = await album.find()
        res.json({ "songs": songs });
    } catch (error) {
        res.json({ "error": error });
    }
    next()
})


router.get('/:id', async (req, res, next) => {
    try {
        const song = await album.findById(req.params.id)
        res.json({ song: song });

    } catch (error) {
        res.json({ "error": error });
    }
    next()
})




router.post('/', upload.fields([
    {
        name: 'src',
        maxCount: 1
    },
    {
        name: 'image',
        maxCount: 1
    }
]), async (req, res) => {
    const albums = new album({
        title: req.body.title,
        artist: req.body.artist,
        genre: req.body.genre,
        src: "http://" + req.hostname + ":8080" + "/static/" + req.files.src[0].path,
        image: "http://" + req.hostname + ":8080" + "/static/" + req.files.image[0].path,
    })

    try {
        const album = await albums.save()
        res.json(album);
    } catch (error) {
        res.send(error)
    }
})




/*
//POST METHOD
router.post('/', async (req, res) => {
    const albums = new album({
        songName: req.body.songName,
        authorName: req.body.authorName,
        songImage: req.body.songImage,
        songFile: req.body.songFile
    })

    try {
        const s1 = await albums.save()
        res.json(s1);
    } catch (error) {
        res.send(error)
    }
})

router.patch('/:id', async (req, res, next) => {
    console.log(req.body);
    try {
        const song = await album.findById(req.params.id)
        if (req.body.songName) {
            song.songName = req.body.songName
        }
        if (req.body.authorName) {
            song.authorName = req.body.authorName
        }
        if (req.body.songImage) {
            song.songImage = req.body.songImage
        }
        if (req.body.songFile) {
            song.songFile = req.body.songFile
        }
        const update = await song.save()
        res.json({ song: update })
        console.log(req.body);
    } catch (err) {
        res.send(err);
    }
    next()
})

*/


module.exports = router                                                        