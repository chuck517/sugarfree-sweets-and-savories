const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

const createCart = async (id, res) => {
  try {
    const newCart = new Cart({
      user_id: id,
      total: 0,
      products: [],
    })
    newCart.save();
    console.log(`Shopping cart for User# ${id} created`)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

const addToCart = async (req, res) => {
  try {
    const { uid } = req.session;
    const productID = req.params.product;
    const { name, price } = await Product.findOne({ _id: productID });
    await Cart.findOneAndUpdate({ user_id: uid }, {
      $push: { contents: { name, cost: price }},
      $inc: { total: price },
    });
    res.status(200).json({ message: 'Success!' })
  } catch (err) {
    res.status(500).json(err);
  }
}

// const getCart = async (req, res) => {
//   try {

//   } catch (err) {

//   }
// }

module.exports = {
  createCart,
  addToCart,
}