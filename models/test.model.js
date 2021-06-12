const mongoose = require('mongoose');
const { Schema } = mongoose;

const TestSchema = new Schema({
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
const TestItem = mongoose.model( "TestItem", TestSchema )

module.exports = { TestItem }