const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/resume`;

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const createResume = async (resumeData) => {
  const response = await fetch(API_URL, {
    method: "POST",

    headers: getAuthHeaders(),

    body: JSON.stringify(resumeData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create resume");
  }

  return data;
};

export const getResumes = async () => {
  const response = await fetch(API_URL, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch resumes");
  }

  return data.resumes;
};

export const getResumeById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch resume");
  }

  return data.resume;
};
export const generateProfessionalSummary = async (resumeData) => {
  const response = await fetch(`${API_URL}/generate-summary`, {
    method: "POST",
    headers: getAuthHeaders(),

    body: JSON.stringify(resumeData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to generate summary");
  }

  return data;
};

export const generateProjectDescription = async (projectName, technologies) => {
  console.log("AI FUNCTION CALLED");
  console.log("Project:", projectName);
  console.log("Technologies:", technologies);

  const response = await fetch(`${API_URL}/generate-project-description`, {
    method: "POST",

    // JWT token is now sent
    headers: getAuthHeaders(),

    body: JSON.stringify({
      projectName,
      technologies,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to generate project description");
  }

  return data;
};

export const updateResume = async (id, resumeData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",

    // JWT token is now sent
    headers: getAuthHeaders(),

    body: JSON.stringify(resumeData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update resume");
  }

  return data.resume;
};

export const deleteResume = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",

    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete resume");
  }

  return data;
};

export const analyzeResume = async (id) => {
  const response = await fetch(`${API_URL}/${id}/analyze`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to analyze resume");
  }

  return data;
};

export const analyzeJobMatch = async (id, jobDescription) => {
  const url = `${API_URL}/${id}/job-match`;

  console.log("Calling URL:", url);

  const response = await fetch(url, {
    method: "POST",

    headers: getAuthHeaders(),

    body: JSON.stringify({
      jobDescription,
    }),
  });

  console.log("Response status:", response.status);
  console.log("Content-Type:", response.headers.get("content-type"));

  const text = await response.text();

  console.log("Raw server response:", text);

  let data;

  try {
    data = JSON.parse(text);
  } catch (error) {
    throw new Error(
      `Server returned non-JSON response. Status: ${response.status}`,
    );
  }

  if (!response.ok) {
    throw new Error(data.message || "Failed to analyze job match");
  }

  return data;
};

export const getJobMatchHistory = async (id) => {
  const response = await fetch(`${API_URL}/${id}/job-matches`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch job match history");
  }

  return data.jobMatches;
};

export const deleteJobMatch = async (jobMatchId) => {
  const response = await fetch(`${API_URL}/job-match/${jobMatchId}`, {
    method: "DELETE",

    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete job match");
  }

  return data;
};

export const getJobMatchById = async (jobMatchId) => {
  const response = await fetch(`${API_URL}/job-match/${jobMatchId}`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch job match");
  }

  return data.jobMatch;
};
