const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user");
exports.getSignUp = async (req, res) => {
  try {
    const {
      username,
      lastname,
      email,
      password,
      profilePicture,
    } = req.body;
    if (!username || !lastname || !email || !password) {
      return res.status(400).json({
        message: "Username, lastname, email and password are required",
      });
    }
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      lastname,
      email: email.toLowerCase(),
      password: hashedPassword,
      profilePicture,
    });

    return res.status(201).json({
      message: "User created successfully",

      user: {
        id: user._id,
        username: user.username,
        lastname: user.lastname,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });

  } catch (error) {
    console.error("Signup Error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

exports.getLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const token = jsonwebtoken.sign(
      {
        id: user._id.toString(),
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        username: user.username,
        lastname: user.lastname,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};