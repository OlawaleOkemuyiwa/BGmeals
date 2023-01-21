const User = require("../models/userModel");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  try {
    await newUser.hashUserPassword();
    const token = await newUser.generateAuthTokenAndSave();
    res
      .status(201)
      .send({ user: newUser, tokenData: { token, expiresIn: 1800 } });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthTokenAndSave();
    res.send({ user, tokenData: { token, expiresIn: 1800 } });
  } catch (error) {
    res.status(400).send({ error: "User login failed" });
  }
};

const getUserAdminStatus = async (req, res) => {
  try {
    res.send(req.user.isAdmin);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
};

const logoutUser = async (req, res) => {
  const { user, token } = req;
  try {
    user.tokens = user.tokens.filter(tokenDoc => tokenDoc.token !== token);
    await user.save();
    res.send({ message: "logout successful" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const logoutAllUser = async (req, res) => {
  try {
    const { user } = req;
    user.tokens = [];
    await user.save();
    res.send({ message: "User successfully logged out from all apps" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteUSer = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findOneAndDelete({ _id: userId });

    if (!deletedUser) {
      res.status(404).send({ error: "User not found!" });
    }

    res.send(deletedUser);
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserAdminStatus,
  getAllUsers,
  logoutUser,
  logoutAllUser,
  deleteUSer,
};
