const mongoose = require("mongoose");

const User = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        private: true,
    },
    lastname: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    LikedSongs: {
        type: String,
        default: "",
    },
    Likedplaylist: {
        type: String,
        default: "",
    },
    suscribedArtist: {
        type: String,
        default: "",
    }

});

const Usermodel = mongoose.model("User", User);

module.exports = Usermodel;