const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");

const generateToken = (payload, secret, expiry) => {
    return jwt.sign({...payload}, secret, {expiresIn: expiry});
}

router.route("/")
.get( async (req,res) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({username})
        if(password === user.password){
            const token = generateToken(username, user.secret, "24h")
            res.status(200).json({success: true, data:{token: token}})
        }
        else{res.status(401).json({success: false, data:{error: "Wrong credentials"}})}
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, data:{error: err}});
    }
})
.post(async (req,res) => {
    try{
        const { username, password } = req.body;
        const secret = crypto.randomBytes(256).toString('base64');
        const token = generateToken(username, secret, "24h");
        console.log(token)
        const NewUser = new User({username, password, secret});
        const savedUser = await NewUser.save();
        console.log(savedUser);
        res.status(200).json({success: true, data:{username, token}});
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, data:{error: err}});
    }
    
})

module.exports = router;