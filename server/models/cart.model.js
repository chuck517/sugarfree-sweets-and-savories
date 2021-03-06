const { Schema, model } = require('.');

const prodDetailsSchema = new Schema({
  pid: String,
  name: String,
  cost: Number,
});

const cartSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  contents: [prodDetailsSchema],
});

module.exports = model('cart', cartSchema);