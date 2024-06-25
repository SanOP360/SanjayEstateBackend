const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = signup;
