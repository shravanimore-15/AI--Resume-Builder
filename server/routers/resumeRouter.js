const express = require("express");

const resumeRouter = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createResume,
  getAllResume,
  getResumeById,
  updateResume,
  deleteResume,
  analyzeResumeController,
  generateSummaryController,
  generateProjectDescriptionController,
  analyzeJobMatchController,
  getJobMatchHistoryController,
  deleteJobMatchController,
  getJobMatchByIdController,
} = require("../controllers/resumeController");
resumeRouter.post("/", authMiddleware, createResume);
resumeRouter.get("/", authMiddleware, getAllResume);
resumeRouter.post(
  "/generate-summary",
  authMiddleware,
  generateSummaryController,
);
resumeRouter.post(
  "/generate-project-description",
  authMiddleware,
  generateProjectDescriptionController,
);
resumeRouter.post("/:id/analyze", authMiddleware, analyzeResumeController);
resumeRouter.post("/:id/job-match", authMiddleware, analyzeJobMatchController);
resumeRouter.get(
  "/:id/job-matches",
  authMiddleware,
  getJobMatchHistoryController,
);
resumeRouter.delete(
  "/job-match/:jobMatchId",
  authMiddleware,
  deleteJobMatchController,
);
resumeRouter.get(
  "/job-match/:jobMatchId",
  authMiddleware,
  getJobMatchByIdController,
);
resumeRouter.get("/:id", authMiddleware, getResumeById);
resumeRouter.put("/:id", authMiddleware, updateResume);
resumeRouter.delete("/:id", authMiddleware, deleteResume);

module.exports = resumeRouter;
