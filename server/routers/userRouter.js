const express = require("express");

const userRouter = express.Router();

const {
  getProfile,
  updateProfile,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

userRouter.get("/profile", authMiddleware, getProfile);

userRouter.put("/profile", authMiddleware, updateProfile);

module.exports = userRouter;