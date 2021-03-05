const { Schema, model } = require('.');

const prodDetailsSchema = new Schema({
  name: String,
  cost: Number,
});

const cartSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  total: Number,
  contents: [prodDetailsSchema],
});

module.exports = model('cart', cartSchema);