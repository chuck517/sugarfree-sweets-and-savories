const { Router } = require('express');
const products = require('../controllers/products');
const users = require('../controllers/users');
const cart = require('../controllers/cart');
const authMiddleware = require('../middlewares/auth.js');

const router = Router();

// Route for adding a new product to the bakery products database
router.post('/store', products.addProduct);
// Route for getting all bakery products products from the database
router.get('/store', products.getProducts);
// Route for getting a single product by the product ID
router.get('/store/:id', products.getProductById);
// Route for adding a user to the database
router.post('/register', users.register)
// Route for getting a single user from the database
router.post('/login', users.login);
// Route for viewing user session
router.get('/mycart', authMiddleware, users.myCart);
// Route for adding currently viewed product to cart
router.put('/mycart/add/:product', authMiddleware, cart.addToCart);
// Route for removing a product from cart
router.put('/mycart/delete/:product', authMiddleware, cart.removeFromCart);
// Route for logging a user out of the store
router.post('/logout', authMiddleware, users.logout);
// Route for getting all users from the database - DO NOT USE - NOT IMPLEMENTED
// router.get('/users', users.getUsers);

module.exports = router;