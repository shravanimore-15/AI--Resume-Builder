const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    personalInfo: {
      firstName: {
        type: String,
        required: true,
      },

      lastName: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      phone: String,

      location: String,

      jobTitle: String,

      linkedin: String,

      github: String,
    },

    summary: {
      type: String,
      default: "",
    },

    education: [
      {
        degree: String,
        institution: String,
        startYear: String,
        endYear: String,
        description: String,
      },
    ],

    experience: [
      {
        jobTitle: String,
        company: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],

    skills: {
      frontend: [String],
      backend: [String],
      database: [String],
      tools: [String],
    },

    projects: [
      {
        name: String,
        technologies: String,
        description: String,
        githubUrl: String,
        liveUrl: String,
      },
    ],

    certifications: [
      {
        name: String,
        organization: String,
        issueDate: String,
        credentialId: String,
        credentialUrl: String,
      },
    ],

    languages: [
      {
        language: String,
        proficiency: String,
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    template: {
      type: String,
      enum: [
        "modern",
        "professional",
        "minimal",
      ],
      default: "modern",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resume", resumeSchema);