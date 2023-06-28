require("dotenv").config();
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const url = process.env.MongoDb_URL;


mongoose.connect(url, { useNewUrlParser: true })

const con = mongoose.connection;

con.on("open", () => {
    console.log("db connected...");
})

module.exports = router
