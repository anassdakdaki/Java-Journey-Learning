
import React, { useState, useEffect } from 'react';
import type { ExerciseStepType } from '../types';
import { runJavaCode } from '../services/aiService';
import { CheckIcon, XIcon, ChatBubbleLeftRightIcon } from './icons/FeedbackIcons';

interface ExerciseStepProps {
  step: ExerciseStepType;
  onComplete: () => void;
  isCompleted: boolean;
  openAssistant: (context: string) => void;
}

type ValidationStatus = 'idle' | 'correct' | 'incorrect';

export const ExerciseStepView: React.FC<ExerciseStepProps> = ({ step, onComplete, isCompleted, openAssistant }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<ValidationStatus>('idle');

  useEffect(() => {
    setUserAnswer('');
    setOutput('');
    // If the step was already completed, show the correct status
    setStatus(isCompleted ? 'correct' : 'idle');
  }, [step, isCompleted]);
  
  const handleAskAssistant = () => {
    const fullCodeWithAnswer = step.codeTemplate.replace('___', userAnswer || '___');
    const context = `
      The user is working on an exercise titled "${step.title}".
      The question is: "${step.question}"
      
      The code template is:
      \`\`\`java
      ${step.codeTemplate}
      \`\`\`

      The user's current answer in the blank is: "${userAnswer || '(empty)'}"
    `;
    openAssistant(context);
  };

  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput('');
    const fullCode = step.codeTemplate.replace('___', userAnswer || step.correctAnswer);
    try {
      const result = await runJavaCode(fullCode);
      setOutput(result);
    } catch (error) {
      setOutput(error instanceof Error ? error.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const checkAnswer = () => {
      if (userAnswer.trim() === step.correctAnswer) {
          setStatus('correct');
          onComplete();
      } else {
          setStatus('incorrect');
      }
  }

  const renderFeedback = () => {
    if (status === 'idle') return null;
    
    const isCorrect = status === 'correct';
    const bgColor = isCorrect ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30';
    const textColor = isCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300';
    const Icon = isCorrect ? CheckIcon : XIcon;
    const message = isCorrect 
      ? "Excellent! That's the correct answer." 
      : `Not quite. Please try again.`;

    return (
        <div className={`mt-4 p-4 rounded-lg flex items-start ${bgColor} ${textColor} animate-fade-in`}>
            <Icon className="h-6 w-6 mr-3 flex-shrink-0 mt-1"/>
            <div>
              <p className="font-semibold">{message}</p>
              {status === 'incorrect' && step.hint && (
                <p className="text-sm mt-1"><strong className="font-bold">Hint:</strong> {step.hint}</p>
              )}
            </div>
        </div>
    )
  }

  const parts = step.codeTemplate.split('___');
  const codeBefore = parts[0];
  const codeAfter = parts[1] || '';

  return (
    <div className="space-y-4">
      <p className="text-lg text-content-200 dark:text-content-200-dark">{step.question}</p>
      
      <div className="bg-gray-800 dark:bg-gray-900 text-white p-4 rounded-lg shadow-inner font-mono text-sm whitespace-pre-wrap leading-relaxed">
        <code>{codeBefore}</code>
        <input
          type="text"
          value={status === 'correct' ? step.correctAnswer : userAnswer}
          onChange={(e) => {
            setUserAnswer(e.target.value);
            if (status !== 'idle') {
              setStatus('idle');
            }
          }}
          className="bg-gray-700 border-b-2 border-accent text-white px-2 py-1 rounded-sm focus:outline-none focus:bg-gray-600 transition-colors mx-1 inline-block"
          style={{ width: `${Math.max(step.correctAnswer.length, userAnswer.length, 5)}ch` }}
          autoFocus
          aria-label="Answer input"
          disabled={status === 'correct'}
        />
        <code>{codeAfter}</code>
      </div>

      <div className="mt-4 flex justify-end items-center gap-4">
           <button
              onClick={handleAskAssistant}
              className="mr-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              <ChatBubbleLeftRightIcon className="-ml-1 mr-2 h-5 w-5" />
              Ask AI Assistant
            </button>
          <button
            onClick={handleRunCode}
            disabled={isLoading}
            className="px-5 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:bg-gray-500 flex items-center transition-colors"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Running...
              </>
            ) : (
              'Run Code'
            )}
          </button>
          <button 
            onClick={checkAnswer}
            disabled={status === 'correct' || !userAnswer}
            className="px-6 py-2 bg-secondary text-white font-bold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            Check Answer
          </button>
      </div>
      
      {output && (
        <div>
          <h3 className="font-semibold text-content-100 dark:text-content-100-dark mb-2">Output:</h3>
          <pre className="bg-gray-900 text-white p-4 rounded-md text-sm whitespace-pre-wrap font-mono">
            <code>{output}</code>
          </pre>
        </div>
      )}
      
      {renderFeedback()}
    </div>
  );
};

 
