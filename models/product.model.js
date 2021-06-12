const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    model: {
        type: Number,
        unique: [true, "Model No. should be unique"]
    },
    name: String,
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    description: {
        type: String,
        minLength: 300
    },
    url: {
        type: String,
        required: true,
        min: 1,
        max: 10
    }
})
const Product = mongoose.model( "Cart", ProductSchema )

module.exports = { Product }