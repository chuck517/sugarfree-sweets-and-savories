const { Schema, model } = require('.');

const prodDetailsSchema = new Schema({
  pid: String,
  name: String,
  description: String,
  nutrition: String,
  ingredients: String,
  price: Number,
  img: String,
  quantity: Number,
});

const cartSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  contents: [prodDetailsSchema],
});

module.exports = model('cart', cartSchema);