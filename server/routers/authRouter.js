const express = require("express");

const authRouter = express.Router();

const {
  getSignUp,
  getLogin,
} = require("../controllers/authController");

authRouter.post("/signup", getSignUp);
authRouter.post("/login", getLogin);

module.exports = authRouter;