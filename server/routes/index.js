const { Router } = require('express');
const items = require('../controllers/items');
const users = require('../controllers/users');
const authMiddleWare = require('../middlewares/auth');

const router = Router();

// Route for adding a new item to the bakery items database
router.post('/store', items.addItem);
// Route for getting all bakery items from the database
router.get('/store', items.getItems);
// Route for adding a user to the database
router.post('/register', users.register);
// Route for getting a single user from the database
router.get('/login', users.login);
// Route for getting all users from the database - DO NOT USE - NOT IMPLEMENTED
// router.get('/users', users.getUsers);

module.exports = router;