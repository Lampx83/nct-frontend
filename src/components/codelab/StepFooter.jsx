import React from 'react';

const StepFooter = ({currentStep}) => {
    return (
        <div className="step-footer">
            <span className="slide-number">{currentStep}</span>
        </div>
    );
};

export default StepFooter;
