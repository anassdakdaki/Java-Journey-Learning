
import React, { useEffect } from 'react';
import { Step } from '../types';
import ConceptStep from './ConceptStep';
import { ExerciseStepView } from './ExerciseStep';
import PracticeStep from './PracticeStep';
import ContextStep from './ContextStep';

interface LessonViewProps {
  step: Step;
  onContinue: () => void;
  onBack: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  completedSteps: Set<string>;
  markStepAsCompleted: (stepId: string) => void;
  openAssistant: (context: string) => void;
}

const LessonView: React.FC<LessonViewProps> = ({ 
  step, 
  onContinue, 
  onBack, 
  isLastStep, 
  isFirstStep,
  completedSteps,
  markStepAsCompleted,
  openAssistant,
}) => {
  const isStepCompleted = completedSteps.has(step.id);

  useEffect(() => {
    // Automatically mark concept and context steps as complete when they are viewed.
    if ((step.type === 'concept' || step.type === 'context') && !isStepCompleted) {
      markStepAsCompleted(step.id);
    }
  }, [step, isStepCompleted, markStepAsCompleted]);
  
  const handleStepCompletion = () => {
    markStepAsCompleted(step.id);
  };

  const renderStep = () => {
    switch (step.type) {
      case 'concept':
        return <ConceptStep step={step} openAssistant={openAssistant} />;
      case 'context':
        return <ContextStep step={step} />;
      case 'exercise':
        return <ExerciseStepView step={step} onComplete={handleStepCompletion} isCompleted={isStepCompleted} openAssistant={openAssistant} />;
      case 'practice':
        return <PracticeStep step={step} onComplete={handleStepCompletion} openAssistant={openAssistant} />;
      default:
        return <div>Unknown step type</div>;
    }
  };

  const renderFooter = () => (
    <div className="mt-6 p-4 bg-base-100 dark:bg-base-100-dark border-t-2 border-base-300 dark:border-base-300-dark flex justify-between items-center rounded-b-lg">
      <button 
        onClick={onBack} 
        disabled={isFirstStep}
        className="px-6 py-2 border border-secondary text-secondary font-semibold rounded-lg hover:bg-secondary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Back
      </button>
      {isLastStep && isStepCompleted ? (
         <button 
          onClick={onContinue} 
          className="px-8 py-3 bg-success text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-all transform hover:scale-105"
        >
          Finish Course
        </button>
      ) : (
        <button 
          onClick={onContinue} 
          disabled={!isStepCompleted}
          className="px-8 py-3 bg-accent text-white font-bold rounded-lg shadow-md hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          Continue
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-base-100 dark:bg-base-100-dark rounded-lg shadow-2xl overflow-hidden animate-fade-in">
      <div className="p-4 sm:p-6 md:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 dark:text-blue-300">{step.title}</h2>
        {renderStep()}
      </div>
      {renderFooter()}
    </div>
  );
};

export default LessonView;
