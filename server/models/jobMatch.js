const mongoose = require("mongoose");

const jobMatchSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    jobDescription: {
      type: String,
      required: true,
    },

    matchScore: {
      type: Number,
      default: 0,
    },

    atsScore: {
      type: Number,
      default: 0,
    },

    matchedSkills: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    strengths: {
      type: [String],
      default: [],
    },

    suggestions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const JobMatch = mongoose.model(
  "JobMatch",
  jobMatchSchema
);

module.exports = JobMatch;