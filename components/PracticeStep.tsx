
import React, { useState } from 'react';
import { PracticeStep as PracticeStepType } from '../types';
import CodeEditor from './CodeEditor';
import { runJavaCode, analyzeJavaCodeError, getJavaCodeFeedback, validateJavaPracticeSolution } from '../services/aiService';
import MarkdownRenderer from './MarkdownRenderer';
import { SparklesIcon, ChatBubbleLeftRightIcon } from './icons/FeedbackIcons';

interface PracticeStepProps {
  step: PracticeStepType;
  onComplete: () => void;
  openAssistant: (context: string) => void;
}

const isErrorOutput = (output: string): boolean => {
  const lowerOutput = output.toLowerCase();
  return lowerOutput.includes('error:') ||
    lowerOutput.includes('exception') ||
    lowerOutput.includes('cannot find symbol') ||
    lowerOutput.includes('api error:');
};

const PracticeStep: React.FC<PracticeStepProps> = ({ step, onComplete, openAssistant }) => {
  const [userCode, setUserCode] = useState(step.initialCode);
  const [output, setOutput] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [feedback, setFeedback] = useState('');
  const [validation, setValidation] = useState<{ isCorrect: boolean; feedback: string } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGettingFeedback, setIsGettingFeedback] = useState(false);

  const handleCodeChange = (newCode: string) => {
    setUserCode(newCode);
    setOutput('');
    setAnalysis('');
    setFeedback('');
    setValidation(null);
  };
  
  const handleAskAssistant = () => {
     const context = `
      The user is working on a practice problem titled "${step.title}".
      The problem is: "${step.problem}"
      
      The user's current code is:
      \`\`\`java
      ${userCode}
      \`\`\`

      The last output from running the code was:
      \`\`\`
      ${output || '(No output yet)'}
      \`\`\`
    `;
    openAssistant(context);
  }

  const handleRunCode = async () => {
    setIsLoading(true);
    setIsAnalyzing(false);
    setOutput('');
    setAnalysis('');
    setFeedback('');
    setValidation(null);

    try {
      const result = await runJavaCode(userCode);
      setOutput(result);

      if (isErrorOutput(result)) {
        setIsAnalyzing(true);
        const analysisResult = await analyzeJavaCodeError(userCode, result);
        setAnalysis(analysisResult);
      } else {
        // If code runs, validate the solution
        const validationResult = await validateJavaPracticeSolution(step.problem, userCode, result);
        setValidation(validationResult);
        if (validationResult.isCorrect) {
          onComplete();
        }
      }

    } catch (error) {
      setOutput(error instanceof Error ? error.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
      setIsAnalyzing(false);
    }
  };

  const handleGetFeedback = async () => {
    if (!validation?.isCorrect) return;
    setIsGettingFeedback(true);
    setFeedback('');
    try {
      const feedbackResult = await getJavaCodeFeedback(step.problem, userCode);
      setFeedback(feedbackResult);
    } catch (error) {
      setFeedback("Sorry, I couldn't get feedback for your code right now.");
    } finally {
      setIsGettingFeedback(false);
    }
  };

  const hasError = isErrorOutput(output);
  const isCorrect = validation?.isCorrect === true;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <p className="text-lg text-content-200 dark:text-content-200-dark">{step.problem}</p>
        <button onClick={onComplete} className="text-sm text-secondary hover:underline font-semibold flex-shrink-0 ml-4 whitespace-nowrap">
            I already know this, skip practice &rarr;
        </button>
      </div>

      <CodeEditor
        code={userCode}
        onCodeChange={handleCodeChange}
        onRun={handleRunCode}
        isLoading={isLoading}
      />
      
       <div className="mt-4 flex justify-end items-center gap-2">
           <button
              onClick={handleAskAssistant}
              className="mr-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              <ChatBubbleLeftRightIcon className="-ml-1 mr-2 h-5 w-5" />
              Ask AI Assistant
            </button>
          {isCorrect && !feedback && (
             <button
              onClick={handleGetFeedback}
              disabled={isGettingFeedback}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:bg-gray-400 transition-colors"
            >
              <SparklesIcon className="-ml-1 mr-2 h-5 w-5" />
              {isGettingFeedback ? 'Analyzing...' : 'Get Feedback'}
            </button>
          )}
      </div>

      {output && (
        <div>
          <h3 className="font-semibold text-content-100 dark:text-content-100-dark mb-2">Output:</h3>
          <pre className={`p-4 rounded-md text-sm whitespace-pre-wrap font-mono ${hasError ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' : 'bg-gray-900 text-white'}`}>
            <code>{output}</code>
          </pre>
        </div>
      )}

      {validation && (
         <div className={`mt-4 p-4 border-l-4 rounded-r-lg animate-fade-in ${validation.isCorrect ? 'border-success bg-green-50 dark:bg-green-900/20 dark:border-green-500' : 'border-error bg-red-50 dark:bg-red-900/20 dark:border-red-500'}`}>
              <h3 className={`text-lg font-bold mb-2 ${validation.isCorrect ? 'text-success dark:text-green-300' : 'text-error dark:text-red-300'}`}>
                {validation.isCorrect ? 'Correct!' : 'Not quite right'}
              </h3>
              <p className="text-content-200 dark:text-content-200-dark">{validation.feedback}</p>
          </div>
      )}

      {isAnalyzing && (
        <div className="mt-4 p-4 border-l-4 border-blue-400 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500 animate-fade-in">
          <p className="font-semibold text-blue-800 dark:text-blue-300">Analyzing your error...</p>
        </div>
      )}
      {analysis && (
        <div className="mt-4 p-4 border-l-4 border-secondary bg-blue-50 dark:bg-gray-900 dark:border-secondary animate-fade-in rounded-r-lg">
          <h3 className="text-lg font-bold text-secondary mb-2">Tutor Hint</h3>
          <MarkdownRenderer content={analysis} />
        </div>
      )}

      {isGettingFeedback && (
        <div className="mt-4 p-4 border-l-4 border-green-400 bg-green-50 dark:bg-green-900/20 dark:border-green-500 animate-fade-in">
          <p className="font-semibold text-green-800 dark:text-green-300">Generating feedback on your solution...</p>
        </div>
      )}
      {feedback && (
        <div className="mt-4 p-4 border-l-4 border-accent bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-500 animate-fade-in rounded-r-lg">
          <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-300 mb-2">Code Feedback</h3>
          <MarkdownRenderer content={feedback} />
        </div>
      )}
    </div>
  );
};

export default PracticeStep;
