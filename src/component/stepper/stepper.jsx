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
      <ul className="stepper-container">
        {steps.map((step, index) => (
          <li key={index} className="stepper-item">
            <Link
              to={`#step-${index + 1}`}
              className={`stepper-link ${
                index <= activeStep ? "stepper-active" : "disabled"
              }`}
              rel={index + 1}
              onClick={() => handleStepClick(index)}
            >
              <div
                className={
                  index <= activeStep
                    ? "stepper-active-number"
                    : index === activeStep
                    ? "stepper-active-number"
                    : "stepper-number"
                }
              >
                {index + 1}
              </div>
              <span className="stepper-desc">
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
