const Product = require('../models/product.model');

const addProduct = async (req, res) => {
  try {
    const { name, description, nutrition, ingredients, price, img } = req.body;
    if (!(name && description && nutrition && ingredients && price && img)) throw new Error({ message: 'Bad request', status: 400 });
    const product = new Product({
      name,
      description,
      nutrition,
      ingredients,
      price,
      img,
    });
    await product.save();
    res.status(200).json(Product);
  } catch (err) {
    console.error(err.message);
    res.status(err.status);
  }
};

const getProducts = async (_, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

const getProductById = async (req, res) => {
  try {
    if (!req.params) throw new Error();
    const { id } = req.params;
    let product = await Product.findOne({ _id: id });
    product.id = id;
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
};