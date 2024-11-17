const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: String,
      title: String,
      price: Number,
      imageUrl: String,
      quantity: { type: Number, default: 1 },
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);
