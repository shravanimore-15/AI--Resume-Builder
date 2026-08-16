const Resume = require("../models/resume");
const { GoogleGenAI } = require("@google/genai");
const JobMatch = require("../models/jobMatch")
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


const analyzeResume = async (resumeId) => {
  const resume = await Resume.findById(resumeId);

  if (!resume) {
    throw new Error("Resume not found");
  }

  const personalInfo = resume.personalInfo || {};
  const skills = [
    ...(resume.skills?.frontend || []),
    ...(resume.skills?.backend || []),
    ...(resume.skills?.database || []),
    ...(resume.skills?.tools || []),
  ].join(", ");

  const prompt = `
Analyze this resume.

Name: ${personalInfo.firstName || "Not provided"}

Skills:${skills}

Projects:
${resume.projects?.length || 0}

Education:
${resume.education?.length || 0}

Experience:
${resume.experience?.length || 0}

Certifications:
${resume.certification?.length || 0}

Give:

1. Resume Score out of 100
2. Strengths
3. Weaknesses
4. Suggestions
`;

  const result = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
  });

  return result.text;
};



const generateProfessionalSummary = async (resumeData) => {
  const personalInfo = resumeData.personalInfo || {};

  const skills = Array.isArray(resumeData.skills)
  ? resumeData.skills.join(", ")
  : "Not provided";

  const prompt = `
Write a professional resume summary for this candidate.

Name: ${personalInfo.firstName || "Candidate"}

Skills:
${skills}

Education:
${
  Array.isArray(resumeData.education)
    ? resumeData.education
        .map(
          (education) =>
            `${education.degree || ""} from ${education.institution || ""}`
        )
        .join("\n")
    : "Not provided"
}

Experience:
${
  Array.isArray(resumeData.experience)
    ? resumeData.experience
        .map(
          (experience) =>
            `${experience.jobTitle || ""} at ${
              experience.company || ""
            }: ${experience.description || ""}`
        )
        .join("\n")
    : "Fresher"
}

Projects:
${
  Array.isArray(resumeData.projects)
    ? resumeData.projects
        .map(
          (project) =>
            `${project.name || ""}: ${
              project.description || ""
            }`
        )
        .join("\n")
    : "Not provided"
}

Write a concise professional summary of 3-5 sentences.

Do not use headings.
Do not use bullet points.
Do not invent experience or skills.
Make it suitable for a software developer resume.
`;

  const result = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
  });

  return result.text;
};

  
const generateProjectDescription = async (projectName, technologies) => {
  if (!projectName || !technologies) {
    throw new Error("Project name and technologies are required");
  }

  const prompt = `
Write a professional project description for a software developer resume.

Project Name:
${projectName}

Technologies:
${technologies}

Requirements:
- Write 2-4 concise sentences.
- Explain what the project does.
- Highlight the technical implementation.
- Mention the technologies naturally.
- Focus on the project's purpose and technical contribution.
- Use professional resume language.
- Do not invent features, technologies, or achievements.
- Do not use headings.
- Do not use bullet points.
- Return only the project description.
`;

  const result = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
  });

  return result.text;
};

const analyzeJobMatch = async (
  resumeId,
  jobDescription
) => {
  const resume = await Resume.findById(resumeId);

  if (!resume) {
    throw new Error("Resume not found");
  }

  if (!jobDescription || !jobDescription.trim()) {
    throw new Error(
      "Job description is required"
    );
  }

  const skills = [
    ...(resume.skills?.frontend || []),
    ...(resume.skills?.backend || []),
    ...(resume.skills?.database || []),
    ...(resume.skills?.tools || []),
  ].join(", ");


  const education = (resume.education || [])
    .map((edu) => {
      return `
Degree: ${edu.degree || ""}
Institution: ${edu.institution || ""}
Description: ${edu.description || ""}
`;
    })
    .join("\n");

  const experience = (resume.experience || [])
    .map((exp) => {
      return `
Job Title: ${exp.jobTitle || ""}
Company: ${exp.company || ""}
Description: ${exp.description || ""}
`;
    })
    .join("\n");

  const projects = (resume.projects || [])
    .map((project) => {
      const technologies =
        Array.isArray(project.technologies)
          ? project.technologies.join(", ")
          : project.technologies || "";

      return `
Project: ${project.name || ""}
Technologies: ${technologies}
Description: ${project.description || ""}
`;
    })
    .join("\n");

  const prompt = `
You are an ATS resume matching system.

Compare the candidate's resume with the provided job description.

RESUME:

Name:
${resume.personalInfo?.firstName || ""}
${resume.personalInfo?.lastName || ""}

Current Job Title:
${resume.personalInfo?.jobTitle || ""}

Professional Summary:
${resume.summary || ""}

Skills:
${skills}

Education:
${education}

Experience:
${experience}

Projects:
${projects}


JOB DESCRIPTION:

${jobDescription}


Analyze how well this resume matches the job description.

Return ONLY valid JSON.

Use exactly this structure:

{
  "matchScore": 75,
  "atsScore": 70,
  "matchedSkills": [
    "React",
    "JavaScript"
  ],
  "missingSkills": [
    "TypeScript",
    "Docker"
  ],
  "strengths": [
    "Strong frontend development experience"
  ],
  "suggestions": [
    "Add TypeScript experience to the resume"
  ]
}

Rules:

- matchScore must be a number between 0 and 100.
- atsScore must be a number between 0 and 100.
- matchedSkills must be an array of strings.
- missingSkills must be an array of strings.
- strengths must be an array of strings.
- suggestions must be an array of strings.
- Return only valid JSON.
- Do not use markdown.
- Do not use \`\`\`json.
`;

  try {

    const response =
      await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
      });

    let resultText = response.text;
    resultText = resultText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const result = JSON.parse(resultText);
    const jobMatchResult = {
      matchScore: Number(result.matchScore) || 0,

      atsScore: Number(result.atsScore) || 0,

      matchedSkills: Array.isArray(
        result.matchedSkills
      )
        ? result.matchedSkills
        : [],

      missingSkills: Array.isArray(
        result.missingSkills
      )
        ? result.missingSkills
        : [],

      strengths: Array.isArray(
        result.strengths
      )
        ? result.strengths
        : [],

      suggestions: Array.isArray(
        result.suggestions
      )
        ? result.suggestions
        : [],
    };

    const savedJobMatch =
      await JobMatch.create({
        resume: resume._id,

        jobDescription: jobDescription.trim(),

        matchScore:
          jobMatchResult.matchScore,

        atsScore:
          jobMatchResult.atsScore,

        matchedSkills:
          jobMatchResult.matchedSkills,

        missingSkills:
          jobMatchResult.missingSkills,

        strengths:
          jobMatchResult.strengths,

        suggestions:
          jobMatchResult.suggestions,
      });

    console.log(
      "Job Match saved:",
      savedJobMatch._id
    );
    return {
      ...jobMatchResult,

      jobMatchId: savedJobMatch._id,
    };

  } catch (error) {
    console.error(
      "Job Match AI Error:",
      error
    );

    throw new Error(
      error.message ||
      "Failed to analyze job match"
    );
  }
};
module.exports = {
  analyzeResume,
  generateProfessionalSummary,generateProjectDescription,analyzeJobMatch
};



