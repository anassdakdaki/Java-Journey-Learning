
import React, { useState, useRef, useEffect } from 'react';

interface TodoListUIProps {
  onInteract: (input: string) => Promise<string>;
  isLoading: boolean;
}

const TodoListUI: React.FC<TodoListUIProps> = ({ onInteract, isLoading }) => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [commandInput, setCommandInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleJavaResponse = (output: string) => {
    const lines = output.split('\n');
    const newTaskList: string[] = [];

    lines.forEach(line => {
      const trimmed = line.trim();
      // Strict-ish parsing: Only lines starting with [ ] or [x] are treated as UI elements
      if (trimmed.startsWith('[') && trimmed.includes(']')) {
          newTaskList.push(trimmed);
      }
    });
    
    setTasks(newTaskList);
  };

  const handleEnter = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && commandInput && !isLoading) {
        await sendCommand(commandInput);
    }
  };

  const sendCommand = async (rawCommand: string) => {
    // Protocol: 
    // Line 1: Count
    // Line 2..N: Existing Tasks
    // Line N+1: RAW_USER_COMMAND

    let payload = `${tasks.length}\n`;
    payload += tasks.join('\n');
    payload += `\n${rawCommand}`;

    const response = await onInteract(payload);
    handleJavaResponse(response);
    setCommandInput("");
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 p-4 font-mono text-sm">
      
      {/* Main Display Area (The "Screen") */}
      <div className="flex-grow border-2 border-gray-800 dark:border-gray-600 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-950 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
        
        {/* Header Label */}
        <div className="absolute top-0 right-0 bg-gray-800 text-white text-[10px] px-2 py-0.5 uppercase tracking-widest opacity-50">
             Display Output
        </div>

        {/* Content */}
        {tasks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50 select-none">
                <div className="text-4xl mb-2">🔲</div>
                <p>Display Empty</p>
                <p className="text-xs mt-2 text-center max-w-[200px]">
                    Your Java code must print lines starting with <code>[ ]</code> to draw here.
                </p>
            </div>
        ) : (
            <ul className="space-y-2">
                {tasks.map((taskLine, idx) => {
                    const isChecked = taskLine.toLowerCase().startsWith('[x]');
                    const text = taskLine.substring(taskLine.indexOf(']') + 1).trim();

                    return (
                        <li key={idx} className="flex items-start group animate-fade-in">
                            <span className={`mr-3 font-bold ${isChecked ? 'text-green-600' : 'text-gray-400'}`}>
                                {isChecked ? '[X]' : '[ ]'}
                            </span>
                            <span className={`${isChecked ? 'line-through text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
                                {text.replace(/_/g, ' ')}
                            </span>
                            <span className="ml-auto text-[10px] text-gray-300 opacity-0 group-hover:opacity-100">
                                index: {idx}
                            </span>
                        </li>
                    )
                })}
            </ul>
        )}
      </div>

      {/* Command Line Input Area */}
      <div className="mt-4 bg-black p-3 rounded-md flex items-center shadow-lg">
        <span className="text-green-500 mr-2 font-bold">{`>`}</span>
        <input 
            ref={inputRef}
            type="text" 
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            onKeyDown={handleEnter}
            placeholder="Type command (e.g., ADD Milk, CHECK 0)..."
            className="flex-grow bg-transparent border-none text-green-500 focus:ring-0 placeholder-gray-700 font-mono h-6"
            autoComplete="off"
            disabled={isLoading}
        />
        {isLoading && <div className="animate-pulse text-green-500 text-xs">PROCESSING...</div>}
      </div>
      <div className="mt-1 text-[10px] text-gray-400 text-center">
          Interact by typing commands above. Your code must parse them.
      </div>

    </div>
  );
};

export default TodoListUI;
