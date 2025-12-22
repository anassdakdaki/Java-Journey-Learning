
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Split content by code blocks (```...```)
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2 text-content-200 dark:text-content-200-dark leading-relaxed font-sans">
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          // This is a code block
          const code = part.replace(/```(java|)\n?/g, '').replace(/```/g, '').trim();
          return (
            <pre key={index} className="bg-gray-800 dark:bg-gray-900 text-white p-3 rounded-md font-mono text-sm whitespace-pre-wrap">
              <code>{code}</code>
            </pre>
          );
        } else {
          // This is regular text
          // Replace bold markdown with strong tags
          const formattedPart = part.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          return <p key={index} className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: formattedPart }}></p>;
        }
      })}
    </div>
  );
};

export default MarkdownRenderer;