const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");

router.route("/:userId")
.get(async (req,res) => {
    const userId = req.params.userId;
    console.log(userId)
    const cart = await User.findOne({_id: userId}).populate("cart");
    console.log(cart)
    res.status(201).json({success: true, data:cart})
})
.post(async (req,res) => {
    const userId = req.params.userId;
    console.log(userId);
    const {productId} = req.body
    console.log({productId})
    const user = await User.findOne({_id: userId})
    console.log(user)
    if(user){
        user.cart.push(productId)
    }
    console.log(user.cart)
    await user.save();
})
module.exports = router;