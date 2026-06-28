const User = require("../models/User");

const getWallet = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("wallet exposure");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWallet,
};