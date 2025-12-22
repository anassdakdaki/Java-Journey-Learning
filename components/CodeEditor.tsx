
import React, { useState, useRef, useEffect } from 'react';
import { highlightJavaCode } from '../utils/syntaxHighlight';

interface CodeEditorProps {
  code: string;
  onCodeChange: (newCode: string) => void;
  onRun: () => void;
  isLoading: boolean;
  className?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onCodeChange, onRun, isLoading, className }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const [lineCount, setLineCount] = useState(1);
  const gutterRef = useRef<HTMLDivElement>(null);

  // Sync scroll between textarea, pre block, and gutter
  const handleScroll = () => {
    if (textareaRef.current && preRef.current && gutterRef.current) {
      const scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollTop = scrollTop;
      gutterRef.current.scrollTop = scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  // Update line count for gutter
  useEffect(() => {
    const lines = code.split('\n').length;
    setLineCount(lines);
  }, [code]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;

      // Insert 2 spaces for tab
      const newValue = code.substring(0, start) + "  " + code.substring(end);
      onCodeChange(newValue);

      // Move cursor
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  return (
    <div className={`flex flex-col rounded-lg shadow-2xl overflow-hidden border border-gray-700 bg-ide-bg ${className || 'h-96'}`}>
      {/* Toolbar */}
      <div className="bg-[#252526] px-4 py-2 flex justify-between items-center border-b border-black/20 flex-shrink-0">
        <div className="flex items-center gap-2">
           <div className="flex gap-1.5 mr-2">
             <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
             <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
             <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
           </div>
           <span className="text-xs font-sans text-gray-400">Main.java</span>
        </div>
        <button
          onClick={onRun}
          disabled={isLoading}
          className="flex items-center px-3 py-1 bg-green-700 hover:bg-green-600 text-white text-xs font-semibold rounded transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <span className="animate-spin mr-2">⟳</span>
          ) : (
            <span className="mr-1">▶</span>
          )}
          Run
        </button>
      </div>

      {/* Editor Area */}
      <div className="relative flex flex-grow min-h-0 text-sm font-mono leading-6">
        {/* Line Numbers Gutter */}
        <div 
            ref={gutterRef}
            className="w-10 flex-shrink-0 bg-ide-bg text-gray-500 text-right pr-3 select-none pt-4 overflow-hidden"
        >
            {Array.from({ length: lineCount }).map((_, i) => (
                <div key={i} className="h-6">{i + 1}</div>
            ))}
        </div>

        {/* Input Container */}
        <div className="relative flex-grow bg-ide-bg overflow-hidden">
           {/* The syntax highlighted backdrop */}
           <pre
              ref={preRef}
              className="absolute top-0 left-0 w-full h-full m-0 p-4 pointer-events-none overflow-hidden whitespace-pre whitespace-pre-wrap break-words text-ide-fg"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: highlightJavaCode(code) + '<br>' }} 
           ></pre>

           {/* The editable transparent textarea */}
           <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => onCodeChange(e.target.value)}
              onScroll={handleScroll}
              onKeyDown={handleKeyDown}
              className="absolute top-0 left-0 w-full h-full m-0 p-4 bg-transparent text-transparent caret-white border-0 outline-none resize-none overflow-auto whitespace-pre-wrap break-words z-10"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
           />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
