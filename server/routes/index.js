const { Router } = require('express');
const products = require('../controllers/products');
const users = require('../controllers/users');
const cart = require('../controllers/cart');
const order = require('../controllers/order');
const authMiddleware = require('../middlewares/auth.js');

const router = Router();

// Route for adding a new product to the bakery products database
router.post('/store', products.addProduct);
// Route for getting all bakery products products from the database
router.get('/store', products.getProducts);
// Route for getting a single product by the product ID
router.get('/store/:id', products.getProductById);
// Route for adding a user to the database
router.post('/user/register', users.register);
// Route for getting a single user from the database
router.post('/user/login', users.login);
// Route for viewing user session
router.post('/user/mycart', authMiddleware, cart.getCart);
// Route for adding currently viewed product to cart
router.put('/user/mycart/save', authMiddleware, cart.saveCart);
// Route for removing a product from cart
router.put('/user/mycart/clear', authMiddleware, cart.clearCart);
// Route for user to checkout and place their order
router.post('/user/checkout', authMiddleware, order.checkout);
// Route for logging a user out of the store
router.post('/user/logout', authMiddleware, users.logout);
// Route for getting all users from the database - DO NOT USE - NOT IMPLEMENTED
// router.get('/users', users.getUsers);

module.exports = router;