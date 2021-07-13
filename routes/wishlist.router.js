const express = require("express");
const router = express.Router();
const { Wishlist } = require("../models/wishlist.model");

router.route("/:userId")
    .get(async (req,res) => {
        try{
            const userId = req.params.userId;
            const userWishlist = await Wishlist.findOne({user: userId}).populate("products._id");
            const updatedWishlist = userWishlist.products.map((product) => product._id)
            res.status(201).json({success: true, data: updatedWishlist})
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, error: "Error while fetching wishlist"})
        }
    })
    .post(async (req,res) => {
        try{
            const userId = req.params.userId;
            const { productId } = req.body;

            const userWishlist = await Wishlist.findOne({user: userId})
            if(!userWishlist){
                return res.status(403).json({success: false, error: "Forbidden Request"})
            }
            userWishlist.products.push({_id: productId});
            await userWishlist.save();
            res.status(200).json({success: true, data: userWishlist})
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, error: "Error while fetching Wishlist"})
        }
    })
router.route("/:userId/:productId")
    .delete(async (req,res) => {
        try{
            const{ userId, productId } = req.params;
            console.log({productId})
            const userWishlist = await Wishlist.findOne({user: userId})
            if(!userWishlist){
                return res.status(403).json({success: false, error: "Forbidden Request"})
            }
            userWishlist.products.pull({_id: productId});
            await userWishlist.save();
            res.status(200).json({success: true, data: userWishlist})
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, error: "Error while fetching Wishlist"})
        }
    });




















// router.route("/:userId")
// .get(async (req,res) => {
//     try{
//         const userId = req.params.userId;
//         console.log(userId)
//         const user = await User.findOne({_id: userId}).populate("wishlist");
//         console.log(user.wishlist)
//         res.status(201).json({success: true, data:user.wishlist})
//     }catch(err){
//         res.status(500).json({success: false, error: err})
//     }
// })
// .post(async (req,res) => {
//     try{
//         const userId = req.params.userId;
//         const {productId} = req.body;

//         const user = await User.findOne({_id: userId})
//         if(!user){
//             return res.status(403).json({success: false, error: "Forbidden Request"})
//         }
//         user.wishlist.push({_id: productId})
//         await user.save();
//         res.status(200).json({success: true, data:user.wishlist})
//         console.log(user.wishlist)
//     }catch(err){
//         res.status(500).json({success: false, error: err})
//     }
// })
// .delete(async (req,res) => {
//     try{
//         const userId = req.params.userId;
//         const {productId} = req.body;

//         const user = await User.findOne({_id: userId})
//         if(!user){
//             return res.status(403).json({success: false, error: "Forbidden Request"})
//         }
//         user.wishlist = user.wishlist.filter((item) => item._id.toString() !== productId);
//         console.log(user.wishlist)
//         await user.save();
//         res.status(200).json({success: true, data:user.cart})        
//     }catch(err){
//         res.status(500).json({success: false, error: err})
//     }
// })
module.exports = router;