const express = require("express");
const passport = require("passport")
const router = express.Router();
const User = require("../models/user");
const Song = require("../models/songs");
const Playlist = require("../models/Playlist");

//create a playlist
router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const currentuser = req.user;
    const { name, Thumbnail, songs } = req.body;

    if (!name || !Thumbnail || !songs) {
        return res.status(301).json({ err: "Insufficient Data" });
    }
    const playlistdata = {
        name,
        Thumbnail,
        songs,
        owner: currentuser._id,
        collaborators: [],
    };

    const createdplaylist = await Playlist.create(playlistdata);
    return res.status(200).json(createdplaylist);
});


//get a playlist by id

router.get("/get/playlist/:playlistid", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const playlistId = req.params.playlistid;
    const playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist) {
        return res.status(301).json({ err: "Invalid Id" });
    }
    return res.status(200).json(playlist);

});


//get all playlist made by an artist

router.get("/get/artist/:artistId", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const artistId = req.params.artistId;

    const artist = await User.findOne({ _id: artistId });
    if (!artist) {
        return res.status(304).json({ err: "Invalid Artist Id" });
    }

    const playlists = await Playlist.find({ owner: artistId });
    return res.status(200).json({ data: playlists });
});

//Add a song to a playlist 

router.post("/add/song", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const currentuser = req.user;
    const { playlistId, songId } = req.body;
    const playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist) {
        return res.status(304).json({ err: "playlist Does not exist" });
    }

    if (
        !playlist.owner.equals(currentuser._id) &&
        !playlist.collaborators.includes(currentuser._id)
    ) {
        return res.status(400).json({ err: "Not Allowed" }); 
    }

    const song = await Song.findOne({ _id: songId });
    if (!song) {
        return res.status(304).json({ err: "Song does Not Exist" });
    }
    playlist.songs.push(songId);
    await playlist.save();

    return res.status(200).json(playlist);

});


module.exports = router;
