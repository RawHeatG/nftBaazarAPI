const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      _id: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ]
});


const Cart = mongoose.model("Cart", CartSchema);
module.exports = { Cart }