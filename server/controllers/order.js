const Order = require('../models/order.model');

const checkout = async (req, res) => {
  try {
    console.log('CHECKOUT');
    console.log(req.body);
    const { uid } = req.session;
    await Order.findOneAndReplace({ _id: uid }, { _id: uid, contents: req.body });
    res.status(200).json({ message: 'Success!' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
};

module.exports = {
  checkout,
};