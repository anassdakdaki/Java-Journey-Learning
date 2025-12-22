
import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  lessonTitle: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, lessonTitle }) => {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-blue-100">{lessonTitle}</span>
        <span className="text-sm font-medium text-blue-100">{currentStep + 1} / {totalSteps}</span>
      </div>
      <div className="w-full bg-blue-200 rounded-full h-2.5">
        <div 
          className="bg-accent h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
