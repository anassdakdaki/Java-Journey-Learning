
import React from 'react';
import { ContextStep as ContextStepType } from '../types';
import { GlobeIcon } from './icons/FeedbackIcons';

const ContextStep: React.FC<{ step: ContextStepType }> = ({ step }) => {
  return (
    <div className="p-6 my-4 border-l-4 border-accent bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-500 rounded-r-lg animate-fade-in">
      <div className="flex items-start">
        <GlobeIcon className="h-10 w-10 text-accent mr-4 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2">{step.title}</h3>
          <p className="text-lg text-content-200 dark:text-content-200-dark leading-relaxed">{step.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ContextStep;
