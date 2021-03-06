const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

const createCart = async (id, res) => {
  try {
    const newCart = new Cart({
      _id: id,
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
    await Cart.findOneAndUpdate({ _id: uid }, {
      $push: { contents: { pid: productID, name, cost: price }},
      $inc: { total: price },
    });
    res.status(200).json({ message: 'Success!' });
  } catch (err) {
    res.status(500).json(err);
  }
}

const removeFromCart = async (req, res) => {
  try {
    const { uid } = req.session;
    console.log(req.body);
    const itemID = req.params.product;
    // console.log(itemID);
    // console.log(pid);
    const cost = await Cart.findOne({ _id: uid }, {
      "contents.$": { _id: itemID },
    }).cost;
    console.log(cost);
    await Cart.findOneAndUpdate({ _id: uid }, {
      $pull: { contents: { _id: itemID }},
    });
    res.status(200).json({ message: 'Beleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
}

// const calculateCost = (cart) => {
//   return cart.reduce((accumulator, currentValue) => {
//     accumulator + currentValue;
//   })
// }
// const getCart = async (req, res) => {
//   try {

//   } catch (err) {

//   }
// }

module.exports = {
  createCart,
  addToCart,
  removeFromCart,
}