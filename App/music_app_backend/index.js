const express = require("express");
const mongoose = require("mongoose");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const User = require("./models/user");
const cors = require("cors");
//routes
const authroutes = require("./routes/auth");
const songroutes = require("./routes/song");
const playlistroute = require("./routes/playlist");
require('dotenv').config()
const app = express();

app.use(cors());
app.use(express.json());
//!!!!!!Connecting to data base!!!!!

mongoose.connect("mongodb+srv://someshd:" + process.env.MONGO_PASS + "@cluster0.jktjq3c.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then((x) => {
    console.log("Connected To mongoose!");
})
    .catch((err) => {
        console.log("error while connecting to mongoose");
    })

//passport-jwt setup

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

//Server start
app.listen(5000, () => {
    console.log('Server has started on port 5000');
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use("/auth", authroutes);
app.use("/song", songroutes);
app.use("/playlist", playlistroute);