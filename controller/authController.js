const User = require("../models/user");
const jwt = require("jsonwebtoken");
const maxAge = 60 * 60 * 24;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

const loginGet = (req, res) => {
  res.render("login", { title: "Giriş" });
};

const loginPost = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
  }
};

const registerGet = (req, res) => {
  res.render("register", { title: "Register" });
};

const registerPost = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
};

const logoutGet = (req, res) => {
  res.cookie("jwt", "", { mageAge: 1 });
  res.redirect("/login");
};

module.exports = {
  loginGet,
  loginPost,
  registerGet,
  registerPost,
  logoutGet,
};
