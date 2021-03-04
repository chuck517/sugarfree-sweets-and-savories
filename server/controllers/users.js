const bcrypt = require('bcrypt');
const validator = require('validator');

const User = require('../models/user.model');

const SALT = parseInt(process.env.SALT);

const addUser = async (req, res) => {
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
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ err, message: "Unable to create user, please check your information and try again." });
  }
}

const getUsers = async (_, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
}

module.exports = {
  addUser,
  getUsers,
}