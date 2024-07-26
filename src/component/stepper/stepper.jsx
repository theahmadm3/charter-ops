import { Link } from "react-router-dom";

function Stepper({ steps, activeStep, onClick, validateStep }) {
  const handleStepClick = (stepIndex) => {
    if (stepIndex > activeStep && validateStep && !validateStep(activeStep)) {
      // Prevent moving to the next step if the validation fails
      return;
    }

    if (onClick) {
      onClick(stepIndex);
    }
  };

  return (
    <div>
      <ul className="anchor shadow p-3">
        {steps.map((step, index) => (
          <li key={index}>
            <Link
              to={`#step-${index + 1}`}
              className={index <= activeStep ? "activeStep" : "disabled"}
              rel={index + 1}
              onClick={() => handleStepClick(index)}
            >
              <div
                className={
                  index <= activeStep
                    ? "activeStepNumber"
                    : index === activeStep
                    ? "activeStepNumber"
                    : "stepNumber"
                }
              >
                {index + 1}
              </div>
              <span className="stepDesc">
                <small>{step.label}</small>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Stepper;
