const Item = require('../models/item.model');

const addItem = async (req, res) => {
  const { name, description, nutrition, ingredients, price } = req.body;
  if (!(name && description && nutrition && ingredients && price)) return res.status(400).json({ message: 'Bad request', status: 400 });
  try {
    const item = new Item({
      name: name,
      description: description,
      nutrition: nutrition,
      ingredients: ingredients,
      price: price,
    });
    await item.save();
    res.status(200).json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
}

const getItems = async (_, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
}

module.exports = {
  addItem,
  getItems,
}