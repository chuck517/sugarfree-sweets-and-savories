const { Schema, model } = require('.');

const cartSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  total: Number,
  products: Array,
});

module.exports = model('cart', cartSchema);