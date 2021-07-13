const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const { Cart } = require("../models/cart.model");
const { Wishlist } = require("../models/wishlist.model");
const jwt = require("jsonwebtoken");
const secret = require("../keys/secret");
const bcrypt = require("bcrypt");

const generateToken = (payload, expiry) => {
    return jwt.sign({...payload}, secret, {expiresIn: expiry});
}

router.route("/")
.post(async (req,res) => {
    try{
        const {user} = req.body;
        console.log(user)
        const {name, username, email, password} = user;
        const encryptedPassword = await bcrypt.hash(password, 10)
        const token = generateToken({username}, "24h");
        const NewUser = new User({name, username, email, password: encryptedPassword});
        console.log(NewUser)
        const savedUser = await NewUser.save();
        const newCart = new Cart({user: savedUser._id});
        await newCart.save();
        const newWishlist = new Wishlist({user: savedUser._id});
        await newWishlist.save();
        console.log(savedUser);
        res.status(200).json({success: true, data:{name: name, username: username, userId: savedUser._id, token: token}});
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, data:{error: err}});
    }
    
})

module.exports = router;