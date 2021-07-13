const express = require("express");
const router = express.Router();
const { Cart } = require("../models/cart.model");

router.route("/:userId")
    .get(async (req,res) => {
        try{
            const userId = req.params.userId;
            console.log(userId)
            const userCart = await Cart.findOne({user: userId}).populate("products._id");
            const updatedCart = userCart.products.map((product) => {
                product._id.quantity= product.quantity
                return product._id
            })
            res.status(201).json({success: true, data: updatedCart})
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, error: "Error while fetching Cart"})
        }
    })
    .post(async (req,res) => {
        try{
            const userId = req.params.userId;
            const { productId } = req.body;

            const userCart = await Cart.findOne({user: userId})
            if(!userCart){
                return res.status(403).json({success: false, error: "Forbidden Request"})
            }
            userCart.products.push({_id: productId, quantity: 1});
            await userCart.save();
            res.status(200).json({success: true, data:userCart})
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, error: "Error while fetching Cart"})
        }
    });

router.route("/:userId/:productId")
    .post(async (req,res) => {
        try{
            const { userId, productId } = req.params;
            const { quantity } = req.body;
            console.log({userId, productId, quantity})
            const userCart = await Cart.findOne({user: userId})
            if(!userCart){
                return res.status(403).json({success: false, error: "Forbidden Request"})
            }
            userCart.products.pull({_id: productId})
            userCart.products.push({_id: productId, quantity: quantity})
            await userCart.save();
            console.log(userCart);
            res.status(200).json({success: true, data: userCart})
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, error: "Error while fetching Cart"})
        }
    })
    .delete(async (req, res) => {
        try {
            const { userId, productId } = req.params;
            const userCart = await Cart.findOne({ user: userId })
            userCart.products.pull({_id: productId})
            console.log(userCart)
            await userCart.save();
            res.status(200).json({ success: true })
        }catch(err) {
            res.status(500).json({success: false, error: "Error while deleting item" })
        }
    })

module.exports = router;