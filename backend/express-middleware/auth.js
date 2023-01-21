const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const userAuth = async (req, res, next) => {
  try {
    const tokenFromHeader = req.header("Authorization");
    const actualToken = tokenFromHeader.replace("Bearer ", "");

    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    const userIdString = decoded.userId;

    const user = await User.findOne({
      _id: userIdString,
      "tokens.token": actualToken,
    });

    if (!user) throw new Error();

    req.token = actualToken;
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

const adminAuth = (req, res, next) => {
  const nextFunction = () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden request, Access denied!" });
    }
  };
  userAuth(req, res, nextFunction);
};

module.exports = {
  userAuth,
  adminAuth,
};
