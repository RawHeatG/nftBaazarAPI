var express = require('express');
var router = express.Router();
const { TestItem } = require("../models/test.model");
var { extend } = require('lodash');

router.route("/")
.get(async (req, res) => {
    try{
        const testItems = await TestItem.find({});
        console.log(typeof(Object.values(testItems)), testItems)
        res.status(200).json({success: true, data: testItems})
    }catch(error){
        res.status(500).json({success: false, message: error})
    }
})
.post(async (req, res) => {
    try{
        const item = req.body
        console.log("Item recived: ", item);
        const NewItem = new TestItem(item)
        const savedItem = await NewItem.save();
        console.log("SavedItem: ", savedItem)
        res.status(201).json({success: true, data: savedItem})
    }catch(error){
        res.status(400).json({success: false, message: error})
    }
})
router.route("/populate")
.post(async (req, res) => {
    try{
        let savedItemArray = [];
        const itemArray = req.body;
        console.log("Recived Array: ", itemArray)
        itemArray.forEach(async (item) => {
            const NewItem = new TestItem(item)
            const savedItem = await NewItem.save();
            console.log("SavedItem: ", savedItem)
            savedItemArray.push(savedItem);
        })
        console.log("SavedItemArray: " ,savedItemArray)
        res.status(201).json({success: true, data: savedItemArray})
        console.log("SavedItemArray: " ,savedItemArray)

    }catch(error){
        res.status(400).json({success: false, message: error})
    }
})
module.exports = router;