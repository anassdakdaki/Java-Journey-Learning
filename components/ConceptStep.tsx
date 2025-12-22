
import React, { useState } from 'react';
import { ConceptStep as ConceptStepType } from '../types';
import CodeBlock from './CodeBlock';
import { explainJavaCode } from '../services/aiService';
import MarkdownRenderer from './MarkdownRenderer';
import { SparklesIcon, ChatBubbleLeftRightIcon } from './icons/FeedbackIcons';
import VisualRenderer from './VisualRenderer';

interface ConceptStepProps {
  step: ConceptStepType;
  openAssistant: (context: string) => void;
}

const ConceptStep: React.FC<ConceptStepProps> = ({ step, openAssistant }) => {
  const [explanation, setExplanation] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);

  const handleExplainCode = async () => {
    if (!step.codeExample) return;
    setIsExplaining(true);
    setExplanation('');
    try {
      const result = await explainJavaCode(step.codeExample);
      setExplanation(result);
    } catch (error) {
      console.error('Failed to explain code example', error);
      setExplanation('Failed to get explanation.');
    } finally {
      setIsExplaining(false);
    }
  };
  
  const handleAskAssistant = () => {
    const context = `
      The user is on a lesson titled "${step.title}".
      The concept being explained is:
      "${step.content}"

      The code example shown is:
      \`\`\`java
      ${step.codeExample || 'No code example for this step.'}
      \`\`\`
    `;
    openAssistant(context);
  };

  return (
    <div className="space-y-6">
      <p className="text-lg text-content-200 dark:text-content-200-dark leading-relaxed">{step.content}</p>
      
      {step.visual && (
        <div className="my-6 flex justify-center">
          <VisualRenderer visual={step.visual} />
        </div>
      )}

      {step.codeExample && (
        <div>
          <CodeBlock code={step.codeExample} />
        </div>
      )}
      
      <div className="mt-4 flex justify-end items-center gap-2">
           <button
              onClick={handleAskAssistant}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              <ChatBubbleLeftRightIcon className="-ml-1 mr-2 h-5 w-5" />
              Ask AI Assistant
            </button>
          {step.codeExample && (
             <button
              onClick={handleExplainCode}
              disabled={isExplaining}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:bg-gray-400 transition-colors"
            >
              <SparklesIcon className="-ml-1 mr-2 h-5 w-5" />
              {isExplaining ? 'Thinking...' : 'Explain this Code'}
            </button>
          )}
      </div>

      {isExplaining && (
        <div className="mt-4 p-4 border-l-4 border-blue-400 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500 animate-fade-in">
          <p className="font-semibold text-blue-800 dark:text-blue-300">Generating explanation...</p>
        </div>
      )}
      {explanation && (
        <div className="mt-4 p-4 border-l-4 border-secondary bg-blue-50 dark:bg-gray-900 dark:border-secondary animate-fade-in rounded-r-lg">
          <h3 className="text-lg font-bold text-secondary mb-2">Code Explanation</h3>
          <MarkdownRenderer content={explanation} />
        </div>
      )}
    </div>
  );
};

export default ConceptStep;
