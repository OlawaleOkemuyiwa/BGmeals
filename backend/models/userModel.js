const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mongoose = require("../db/mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(email) {
        if (!validator.isEmail(email)) {
          throw new Error("Email provided is invalid");
        }
      },
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
      validate(password) {
        if (password.toLowerCase().includes("password")) {
          throw new Error('Password must not include the word "password"');
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.hashUserPassword = async function () {
  const user = this;
  user.isNe

  if (user.isNew || user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
};

userSchema.methods.generateAuthTokenAndSave = async function () {
  const user = this;

  const token = jwt.sign(
    { userId: user._id.toString() },
    process.env.JWT_SECRET
  );

  user.tokens.push({ token });
  await user.save();

  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;

  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.tokens;

  return userObj;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Unable to login");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
