const Cart = require('../models/cart.model');

const createCart = async (id, res) => {
  try {
    const newCart = new Cart({
      _id: id,
      products: [],
    });
    newCart.save();
    console.log(`Shopping cart for User# ${id} created`);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const saveCart = async (req, res) => {
  try {
    const { uid } = req.session;
    console.log('SAVE');
    console.log(req.body);
    await Cart.findOneAndReplace({ _id: uid }, { _id: uid, contents: req.body });
    res.status(200).json({ message: 'Success!' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
};

const clearCart = async (req, res) => {
  try {
    console.log('CLEAR');
    const { uid } = req.session;
    await Cart.findOneAndReplace({ _id: uid }, { _id: uid, contents: [] });
    res.status(200).json({ message: 'Beleted!' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
};

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
  saveCart,
  clearCart,
};