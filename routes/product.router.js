var express = require('express');
var router = express.Router();
const { Product } = require("../models/product.model");

router.route("/")
.get(async (req, res) => {
    try{
        const products = await Product.find({});
        console.log(typeof(Object.values(products)), products)
        res.status(200).json({success: true, data: products})
    }catch(error){
        res.status(500).json({success: false, message: error})
    }
})
.post(async (req, res) => {
    try{
        const product = req.body
        console.log("Product recived: ", product);
        const NewProduct = new Product(product)
        const savedProduct = await NewItem.save();
        console.log("savedProduct: ", savedProduct)
        res.status(201).json({success: true, data: savedProduct})
    }catch(error){
        res.status(400).json({success: false, message: error})
    }
})
router.route("/populate")
.post(async (req, res) => {
    try{
        let savedProductArray = [];
        const productArray = req.body;
        console.log("Recived Array: ", productArray)
        productArray.forEach(async (item) => {
            const NewProduct = new Product(item)
            const savedProduct = await NewProduct.save();
            console.log("SavedProduct: ", savedProduct)
            savedProductArray.push(savedProduct);
        })
        console.log("SavedProductArray: " ,savedProductArray)
        res.status(201).json({success: true, data: savedProductArray})
        console.log("SavedProductArray: " ,savedProductArray)

    }catch(error){
        res.status(400).json({success: false, message: error})
    }
})
module.exports = router;