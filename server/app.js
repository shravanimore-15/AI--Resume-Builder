const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./routers/authRouter");
const resumeRouter = require("./routers/resumeRouter");
const userRouter = require("./routers/userRouter");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-resume-builder-bay-nu.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use("/auth", authRouter);
app.use("/resume", resumeRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Your backend is running");
});

module.exports = app;
