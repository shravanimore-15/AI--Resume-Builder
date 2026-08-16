import { useState } from "react";
import { analyzeResume } from "../services/resumeService";

function ResumeDetails({ resume }) {

    const [analysis, setAnalysis] = useState("");

    const handleAnalyze = async () => {
        try {
            const result = await analyzeResume(resume._id);

            setAnalysis(result.analysis);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>

            <h1>{resume.personalInfo.name}</h1>

            <button onClick={handleAnalyze}>
                Analyze Resume
            </button>

            {analysis && (
                <div>
                    <h2>AI Resume Analysis</h2>
                    <p>{analysis}</p>
                </div>
            )}

        </div>
    );
}

export default ResumeDetails;