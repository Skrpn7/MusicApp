const express = require("express");
const passport = require("passport");
const router = express.Router();
const Songmod = require("../models/songs");
const User = require("../models/user");




//song create route
router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {


    const { name, Thumbnail, track } = req.body;
    if (!name || !Thumbnail || !track) {
        return res.status(301).json({ err: "Insufficient Details to create a song." });
    }
    const artist = req.user._id;
    const songdetail = { name, Thumbnail, track, artist };
    const createdsong = await Songmod.create(songdetail);
    return res.status(200).json(createdsong);
});

//Get route to all songs I have published

router.get("/get/mysongs", passport.authenticate("jwt", { session: false }), async (req, res) => {
    
    const songs = await Songmod.find({ artist: req.user._id }).populate("artist");
    return res.status(200).json({ data: songs });
});

//fetch all songs of artist

router.get("/get/artist/:artistId",passport.authenticate("jwt",{session: false}),async (req,res)=>{
    const {artistId} = req.params;

    const artist = await User.findOne({_id: artistId})
    if(!artist){
        return res.status(301).json({err:"Artist Doesn't Exist"})
    }

    const song = await Songmod.find({artist: artistId});
    return res.status(200).json({data: song});
});


//get songs by song name
router.get("/get/songname/:songname",passport.authenticate("jwt",{session: false}), async (req, res) => {
   
    const {songname} = req.params;
    const song = await Songmod.find({name: songname}).populate("artist");
    return res.status(200).json({data: song});
});



module.exports = router;