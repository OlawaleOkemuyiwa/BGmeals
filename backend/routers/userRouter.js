const express = require("express");

const {
  registerUser,
  loginUser,
  getUserAdminStatus,
  getAllUsers,
  logoutUser,
  logoutAllUser,
  deleteUSer,
} = require("../controllers/userCtrl");
const { userAuth, adminAuth } = require("../express-middleware/auth");

const router = new express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getStatus", userAuth, getUserAdminStatus);

router.get("/getUsers", adminAuth, getAllUsers);

router.post("/logout", userAuth, logoutUser);

router.post("/logoutAll", userAuth, logoutAllUser);

router.delete("/deleteUser/:id", adminAuth, deleteUSer);

module.exports = router;
