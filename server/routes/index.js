const { Router } = require('express');
const items = require('../controllers/items');
const users = require('../controllers/users');
const authMiddleWare = require('../middlewares/auth');

const router = Router();

// Route for adding a new item to the bakery items database
router.post('/items', items.addItem);
// Route for getting all bakery items from the database
router.get('/items', items.getItems);
// Route for adding a user to the database
router.post('/users', users.addUser);
// Route for getting all users from the database
router.get('/users', users.getUsers);

module.exports = router;