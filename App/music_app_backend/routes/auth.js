const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers")
//Post method

router.post("/register", async (req, res) => {
    // '/register' api for POST request
    const { email, password, firstname, lastname, username } = req.body;

    //check if user already exist
    const user = await User.findOne({ email: email });
    if (user) {
        return res
            .status(403)
            .json({ error: "Email Already Exists" })
    }
    //creating the new user on DB
    const hashpassword = await bcrypt.hash(password, 10);
    const newuserdata = {
        email,
        password: hashpassword,
        firstname,
        lastname,
        username
    };
    const newuser = await User.create(newuserdata);

    //Token for the user
    const token = await getToken(email, newuser);

    //return the user
    const userToreturn = { ...newuser.toJSON(), token };
    delete userToreturn.password;
    return res.status(200).json(userToreturn);
});


router.post("/login", async (req, res) => {
    //get email and pass
    const { email, password } = req.body;
    //check if user exist
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(403).json({ err: "Invalid Credentials" });
    }
    //if user exist check the password is correct
    // password = plaintext from reqbody,user.password = hashed password
    const isPasswordvalid = await bcrypt.compare(password, user.password);
    if (!isPasswordvalid) {
        return res.status(403).json({ err: "Invalid Credentials" })
    }
    //if credentials are correct
    const token = await getToken(user.email, user); //token for user
    //return the user
    const userToreturn = { ...user.toJSON(), token };
    delete userToreturn.password;
    return res.status(200).json(userToreturn);
});
module.exports = router;