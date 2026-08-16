const Resume = require('../models/resume');
const { analyzeResume, generateProfessionalSummary, generateProjectDescription, analyzeJobMatch } = require('../services/aiServices');

exports.analyzeResumeController = async (req, res, next) => {
  try {
    const id = req.params.id;

    const analysis = await analyzeResume(id);

    res.status(200).json({
      success: true,
      analysis
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
exports.createResume = async (req, res, next) => {
  try {
    const resume = await Resume.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Resume created successfully",
      resume
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
// =====================================
exports.getAllResume = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user.id,
    }).sort({
      updatedAt: -1,
    });

    return res.status(200).json({
      success: true,
      resumes,
    });

  } catch (error) {
    console.error("Get Resumes Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch resumes",
    });
  }
};
exports.getResumeById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const resume = await Resume.findOne({
      _id: id,
      
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found"
      });
    }

    res.status(200).json({
      success: true,
      resume
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
exports.updateResume = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const resume = await Resume.findOneAndUpdate(
      {
        _id: id,
        
      },
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      resume
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
exports.deleteResume = async (req, res, next) => {
  try {
    const id = req.params.id;

    const resume = await Resume.findOneAndDelete({
      _id: id,
      
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
      resume
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
exports.generateSummaryController = async (req, res) => {
  try {
    const resumeData = req.body;

    const summary = await generateProfessionalSummary(
      resumeData
    );

    res.status(200).json({
      success: true,
      summary,
    });

  } catch (error) {
    console.error(
      "Generate Summary Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.generateProjectDescriptionController = async (req, res) => {
  try {
   
    const { projectName, technologies } = req.body;

    if (!projectName || !technologies) {
      return res.status(400).json({
        message: "Project name and technologies are required",
      });
    }

    const description = await generateProjectDescription(
      projectName,
      technologies
    );

    res.status(200).json({
      description,
    });
  } catch (error) {
    console.error("Generate Project Description Error:", error);

    res.status(500).json({
      message: "Failed to generate project description",
    });
  }
};

exports.analyzeJobMatchController = async (req, res) => {
  try {
    const { id } = req.params;

    const { jobDescription } = req.body;

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({
        success: false,
        message: "Job description is required",
      });
    }

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }
    const result = await analyzeJobMatch(
      id,
      jobDescription
    );

    const jobMatch = await JobMatch.create({
      resume: id,

      jobDescription,

      matchScore: result.matchScore || 0,

      atsScore: result.atsScore || 0,

      matchedSkills: result.matchedSkills || [],

      missingSkills: result.missingSkills || [],

      strengths: result.strengths || [],

      suggestions: result.suggestions || [],
    });

    res.status(200).json({
      success: true,

      message:
        "Job match analysis completed and saved successfully",

      result,

      jobMatch,
    });

  } catch (error) {

    console.error(
      "Job Match Error:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        error.message ||
        "Failed to analyze job match",
    });
  }
};

exports.getJobMatchHistoryController = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }
    const jobMatches = await JobMatch.find({
      resume: id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      jobMatches,
    });

  } catch (error) {

    console.error(
      "Get Job Match History Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch job match history",
    });
  }
};

exports.deleteJobMatchController = async (
  req,
  res
) => {
  try {
    const { jobMatchId } = req.params;

    const jobMatch =
      await JobMatch.findByIdAndDelete(
        jobMatchId
      );

    if (!jobMatch) {
      return res.status(404).json({
        success: false,
        message: "Job match not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Job match deleted successfully",
    });

  } catch (error) {

    console.error(
      "Delete Job Match Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete job match",
    });
  }
};
exports.getJobMatchByIdController = async (req, res) => {
  try {
    const { jobMatchId } = req.params;

    const jobMatch = await JobMatch.findById(jobMatchId);

    if (!jobMatch) {
      return res.status(404).json({
        success: false,
        message: "Job match analysis not found",
      });
    }

    res.status(200).json({
      success: true,
      jobMatch,
    });

  } catch (error) {
    console.error(
      "Get Job Match Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch job match",
    });
  }
};