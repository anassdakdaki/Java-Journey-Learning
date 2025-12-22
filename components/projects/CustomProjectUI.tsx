
import React, { useState } from 'react';

interface CustomProjectUIProps {
  onInteract: (input: string) => Promise<string>;
  isLoading: boolean;
}

const CustomProjectUI: React.FC<CustomProjectUIProps> = ({ onInteract, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSend = async () => {
    // For custom projects, we send exactly what the user typed as the input stream
    await onInteract(input);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 p-6 text-white font-mono">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-green-400 mb-1">System Input</h3>
        <p className="text-xs text-gray-400">
            Data entered here acts as <span className="text-white bg-gray-800 px-1 rounded">System.in</span> for your code.
            <br/>
            If your code uses <span className="text-yellow-300">Scanner</span>, type the input below before running.
        </p>
      </div>

      <div className="flex-grow flex flex-col gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type input here... (e.g., if your code asks for a name, type 'John')"
          className="flex-grow bg-black border border-gray-700 rounded-md p-4 text-sm focus:border-green-500 focus:outline-none resize-none text-white placeholder-gray-600"
          spellCheck={false}
        />
        
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="w-full py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
             <span className="animate-pulse">Running...</span>
          ) : (
             <span>Run with Input</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default CustomProjectUI;
