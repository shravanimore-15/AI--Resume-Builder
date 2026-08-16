function ResumeProgress({ currentStep }) {
    const steps = [
      "Personal Info",
      "Summary",
      "Education",
      "Experience",
      "Skills",
      "Projects",
      "Certifications",
      "Languages",
    ];
  
    return (
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex justify-between">
            <h2 className="text-sm font-semibold text-gray-700">
              Resume Progress
            </h2>
  
            <span className="text-sm text-gray-500">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          <div className="mb-6 h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-300"
              style={{
                width: `${(currentStep / steps.length) * 100}%`,
              }}
            />
          </div>
          <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
  
            {steps.map((step, index) => {
              const stepNumber = index + 1;
  
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
  
              return (
                <div
                  key={step}
                  className="text-center">
                  <div
                    className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isCurrent
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}>
                    {isCompleted ? "✓" : stepNumber}
                  </div>
                  <p
                    className={`mt-2 text-xs ${
                      isCurrent
                        ? "font-semibold text-blue-600"
                        : isCompleted
                        ? "text-gray-600"
                        : "text-gray-400"
                    }`}>{step}
                  </p>
  
                </div>
              );
            })}
  
          </div>
  
        </div>
      </div>
    );
  }
  
  export default ResumeProgress;