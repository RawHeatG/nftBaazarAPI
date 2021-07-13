const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = require("../keys/secret");
const bcrypt = require("bcrypt");

const generateToken = (payload, expiry) => {
    return jwt.sign({...payload}, secret, {expiresIn: expiry});
}

router.route("/")
.post( async (req,res) => {
    try{
        const { user } = req.body;
        console.log(user)
        const { username, password } = user;
        const userInDB = await User.findOne({username})

        if(bcrypt.compare(password, userInDB.password)){
            const token = generateToken({username}, "24h");
            return res.status(200).json({success: true, data: {
                    name: userInDB.name, username: userInDB.username, userId: userInDB._id, token: token}
                })
        }
        res.status(401).json({success: false, data:{error: "Wrong credentials"}})
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, data:{error: err}});
    }
})

module.exports = router;