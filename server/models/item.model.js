const { Schema, model } = require('.');

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  nutrition: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
});

module.exports = model('Item', itemSchema);