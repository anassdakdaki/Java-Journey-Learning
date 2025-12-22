
import React from 'react';
import { highlightJavaCode } from '../utils/syntaxHighlight';

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const highlightedCode = highlightJavaCode(code);

  return (
    <div className="bg-ide-bg text-ide-fg p-4 rounded-lg shadow-inner overflow-x-auto border border-gray-700">
      <pre className="text-sm font-mono leading-relaxed">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  );
};

export default CodeBlock;
