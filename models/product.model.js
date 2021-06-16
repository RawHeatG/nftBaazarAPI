const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    brand: String,
    color: String,
    fastDelivery: Boolean,
    id: String,
    idealFor: String,
    image: String,
    inStock: Boolean,
    level: String,
    material: String,
    name: String,
    offer: String,
    price: String,
    quantity: Number,
    ratings: Number,
})
const Product = mongoose.model( "Product", ProductSchema )

module.exports = { Product }
