const { Schema, model } = require('.');

const orderDetailsSchema = new Schema({
  _id: String,
  name: String,
  quantity: Number,
  price: Number,
});

const orderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  order: [orderDetailsSchema],
  orderPrice: {
    type: String,
    required: true,
  },
});

module.exports = model('order', orderSchema);