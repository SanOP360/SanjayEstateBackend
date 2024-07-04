const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error");

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};

const google = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const username =
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        avatar: photo,
      });

      await newUser.save();

      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d", 
      });

      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true,maxAge:7*24*60*1000 })
        .status(200)
        .json(rest);
    }
  } catch (err) {
    next(err);
  }
};

const signout=(req,res,next)=>{
  try{
    res.clearCookie('access_token');
    res.status(200).json("User has been logged out");
  }
  catch{

  }
}

module.exports = { signup, signin, google,signout };
