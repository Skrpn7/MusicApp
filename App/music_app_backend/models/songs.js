const mongoose = require("mongoose");

const Song = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    Thumbnail: {
        type: String,
        required: true,
    },
    track: {
        type: String,
        required: true,
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },

});

const Songmodel = mongoose.model("Song", Song);

module.exports = Songmodel;