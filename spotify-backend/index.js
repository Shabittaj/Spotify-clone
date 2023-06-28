const express = require('express');
const app = express()
const path = require("path");
const cors = require('cors');
const db = require('./config/db');
const auth = require('./controllers/auth')
const album = require('./controllers/album')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/album', album)
app.use('/auth', auth)

app.get("/", (req, res) => {
    res.json({ "message": "working" });
})



const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`listening on port: http://localhost:${port}`);
})