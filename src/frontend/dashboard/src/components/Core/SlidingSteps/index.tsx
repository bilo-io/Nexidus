import React, { ReactNode, useEffect, useState } from 'react';
import './SlidingSteps.scss'; // Create this CSS file for styling

interface SlidingStepsProps {
    steps: ReactNode[];
    activeStep: number;
}

const SlidingSteps: React.FC<SlidingStepsProps> = ({ steps, activeStep }) => {
    const [currentStep, setCurrentStep] = useState(activeStep);

    useEffect(() => {
        setCurrentStep(activeStep);
    }, [activeStep]);

    return (
        <div className="sliding-steps-container">
            <div
                className="sliding-steps-wrapper"
                style={{ transform: `translateX(-${currentStep * 100}%)` }}
            >
                {steps.map((step, index) => (
                    <div key={index} className="sliding-step">
                        {index === activeStep ? step : null}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SlidingSteps;
