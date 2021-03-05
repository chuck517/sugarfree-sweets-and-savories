const bcrypt = require('bcrypt');
const validator = require('validator');

const User = require('../models/user.model');
const userCart = require('./cart');

const SALT = parseInt(process.env.SALT);

/* Controller function to handle registration requests */
const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!(email && password && firstName && lastName)) return res.status(400).json({ message: 'Bad request', status: 400 });
  try {
    /* Ensure email is valid and doesn't already exist */
    let user = await User.findOne({ email: email });
    if (user) return res.status(409).json({ error: 'Email already registered', status: 409 });
    if (!validator.isEmail(email)) return res.status(400).json({ error: 'Email is invalid', status: 400 });
    
    /* Ensure user's password isn't too weak */
    if (!validator.isStrongPassword(password, {
      minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,
    })) return res.status(400).json({ error: 'Password is too weak', status: 400 });
    const hash = await bcrypt.hash(password, SALT); // encrypt password for secure storage

    /* Ensure First and Last names are properly serialized */
    const serializedFirstName = validator.escape(firstName.replace(/'/g, '´'));
    const serializedLastName = validator.escape(lastName.replace(/'/g, '´'));
    
    /* Create new user and store in the database */
    const newUser = new User({
      email: email,
      password: hash,
      firstName: serializedFirstName,
      lastName: serializedLastName,
    });
    user = await newUser.save();
    req.session.uid = user._id;
    userCart.createCart(user._id);
    res.status(201).json(user);
  } catch (err) {
    console.log('ERROR: Unable to create user: \n' , err);
    res.status(400).json({ err, message: "Unable to create user, please check your information and try again." });
  }
}

/* Controller function to handle login requests */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) return res.status(401).json({ error: 'Invalid email/password', status: 401 });
    const user = await User.findOne({ email: email });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    console.log(`${email} successfully logged in`);
    req.session.uid = user._id;
    res.status(200).json({ message: 'Successful login', status: 200 });
  } catch (err) {
    console.log('ERROR: Invalid email/password: \n' , err);
    res.status(401).json({ error: 'Invalid email/password', status: 401 });
  }
}

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error, message: 'Could not log out, please try again' });
    } else {
      res.clearCookie('sid')
      res.sendStatus(200);
    }
  })
}

const myCart = async (req, res) => {
  try {
    // console.log(req.session.id)
    res.status(200).json(req.user);
  } catch (err) {
    res.status(404).json(err.message);
  }
}
/* Controller function to handle retrieving all registered users */
/* ADMIN USE ONLY - DO NOT USE */
// const getUsers = async (_, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500);
//   }
// }

module.exports = {
  register,
  login,
  logout,
  myCart
  // getUsers,
}