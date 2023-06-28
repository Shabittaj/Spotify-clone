const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    artist: {
        type: String,
        require: true
    },
    src: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    genre: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('album', albumSchema)