const User = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
  try {
    console.log(req.session.uid);
    const { uid } = req.session;
    const user = await User.findOne({ _id: uid });
    if (!user) throw new Error({ message: 'Unauthorized', status: 401 });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json(err.message);
  }
};

module.exports = authMiddleware;