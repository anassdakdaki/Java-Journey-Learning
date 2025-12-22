
import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../constants/projectsData';
import CodeEditor from './CodeEditor';
import MarkdownRenderer from './MarkdownRenderer';
import BankProjectUI from './projects/BankProjectUI';
import VendingMachineUI from './projects/VendingMachineUI';
import SmartHomeUI from './projects/SmartHomeUI';
import TodoListUI from './projects/TodoListUI';
import CustomProjectUI from './projects/CustomProjectUI';
import { runJavaCode } from '../services/aiService';
import { ChatBubbleLeftRightIcon } from './icons/FeedbackIcons';

interface ProjectWorkspaceProps {
  project: Project;
  onExit: () => void;
  openAssistant: (context: string) => void;
}

const ProjectWorkspace: React.FC<ProjectWorkspaceProps> = ({ project, onExit, openAssistant }) => {
  const [code, setCode] = useState(project.initialCode);
  const [isLoading, setIsLoading] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<Array<{ type: 'info' | 'error' | 'success' | 'text', content: string }>>([]);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [consoleOutput]);

  const addLog = (type: 'info' | 'error' | 'success' | 'text', content: string) => {
    setConsoleOutput(prev => [...prev, { type, content }]);
  };

  const clearLogs = () => setConsoleOutput([]);

  const handleAskAssistant = () => {
      const context = `
        The user is working on a project titled "${project.title}".
        
        Project Description:
        ${project.description}
        
        Project Instructions:
        ${project.instructions}
        
        The user's current code is:
        \`\`\`java
        ${code}
        \`\`\`
        
        The last 5 lines of console output were:
        ${consoleOutput.slice(-5).map(l => l.content).join('\n') || "(No output yet)"}
      `;
      openAssistant(context);
  };

  const handleInteract = async (input: string): Promise<string> => {
    setIsLoading(true);
    // Log input only if it's not a hidden state string (simple heuristic or just log everything)
    // For clarity, we'll log what we send (truncated if too long)
    addLog('info', `> Input sent to program: ${input.replace(/\n/g, ' ')}...`);
    
    try {
      const output = await runJavaCode(code, input);
      
      if (output.toLowerCase().includes('error') || output.toLowerCase().includes('exception')) {
         addLog('error', output);
      } else {
         addLog('text', output);
      }
      return output;
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Connection failed.";
      addLog('error', `System Error: ${msg}`);
      return "Error: " + msg;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompileCheck = async () => {
      setIsLoading(true);
      clearLogs();
      addLog('info', 'Compiling and running with test input...');
      
      // Provide safe default input based on project type to avoid Scanner errors
      let defaultInput = "";
      if (project.type === 'smarthome') defaultInput = "0 20 0 STATUS";
      else if (project.type === 'bank') defaultInput = "BALANCE";
      else if (project.type === 'vending') defaultInput = "0 STATUS";
      else if (project.type === 'todo') defaultInput = "1 SampleTask STATUS";
      else if (project.type === 'custom') defaultInput = ""; // Custom uses explicit input from UI

      try {
          const output = await runJavaCode(code, defaultInput); 
          if (!output) {
             addLog('success', 'Build Successful. Program finished with no output.');
          } else if (output.toLowerCase().includes('error') || output.toLowerCase().includes('exception')) {
             addLog('error', output);
          } else {
             addLog('success', 'Build Successful. Output:');
             addLog('text', output);
          }
      } catch (e) {
           const msg = e instanceof Error ? e.message : "Unknown error";
           addLog('error', `Execution Error: ${msg}`);
      } finally {
          setIsLoading(false);
      }
  }

  const renderUI = () => {
    switch (project.type) {
      case 'bank':
        return <BankProjectUI onInteract={handleInteract} isLoading={isLoading} />;
      case 'vending':
        return <VendingMachineUI onInteract={handleInteract} isLoading={isLoading} />;
      case 'smarthome':
        return <SmartHomeUI onInteract={handleInteract} isLoading={isLoading} />;
      case 'todo':
        return <TodoListUI onInteract={handleInteract} isLoading={isLoading} />;
      case 'custom':
        return <CustomProjectUI onInteract={handleInteract} isLoading={isLoading} />;
      default:
        return <div className="p-4 text-center">Unknown Project Type</div>;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <div>
             <h2 className="text-2xl font-bold text-primary dark:text-white">{project.title}</h2>
             <p className="text-sm text-content-200 dark:text-content-200-dark">Project Workspace</p>
        </div>
        <div className="flex items-center gap-3">
            <button
                onClick={handleAskAssistant}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
              <ChatBubbleLeftRightIcon className="-ml-1 mr-2 h-4 w-4" />
              Ask AI
            </button>
            <button 
                onClick={onExit}
                className="text-sm font-medium text-secondary hover:underline"
            >
                &larr; Back to Projects
            </button>
        </div>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4 h-full overflow-hidden">
        {/* Left Pane: Code, Instructions, Terminal */}
        <div className="flex flex-col gap-4 h-full overflow-hidden pr-2">
            
            {/* Instructions */}
            <div className="bg-base-100 dark:bg-gray-800 p-4 rounded-xl shadow-md border-l-4 border-accent flex-shrink-0 max-h-[30%] overflow-y-auto scrollbar-thin">
                <h3 className="font-bold text-lg mb-2 text-content-100 dark:text-white">Instructions</h3>
                <div className="text-sm">
                    <MarkdownRenderer content={project.instructions} />
                </div>
            </div>

            {/* Code Editor */}
            <CodeEditor 
                code={code} 
                onCodeChange={setCode} 
                onRun={handleCompileCheck} 
                isLoading={isLoading}
                className="flex-grow min-h-[200px]"
            />

            {/* Terminal / Output */}
            <div className="bg-[#1e1e1e] rounded-lg border border-gray-700 flex flex-col h-[25%] min-h-[150px] shadow-inner overflow-hidden">
                <div className="bg-[#252526] px-3 py-1 text-xs text-gray-400 border-b border-black/20 flex justify-between items-center">
                    <span>Terminal / Output</span>
                    <button onClick={clearLogs} className="hover:text-white">Clear</button>
                </div>
                <div className="flex-grow p-3 font-mono text-sm overflow-y-auto scrollbar-thin text-gray-300 space-y-1">
                    {consoleOutput.length === 0 && (
                        <span className="text-gray-600 italic">Ready. Click "Run" or interact with the UI to see output.</span>
                    )}
                    {consoleOutput.map((log, idx) => (
                        <div key={idx} className={`${
                            log.type === 'error' ? 'text-red-400' : 
                            log.type === 'success' ? 'text-green-400' : 
                            log.type === 'info' ? 'text-blue-400' : 'text-gray-300'
                        } break-words whitespace-pre-wrap`}>
                            {log.content}
                        </div>
                    ))}
                    <div ref={consoleEndRef} />
                </div>
            </div>
        </div>

        {/* Right Pane: Interactive UI */}
        <div className="h-full bg-base-200 dark:bg-gray-950 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col relative overflow-hidden">
            <div className="absolute top-4 right-4 z-10 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                {project.type === 'custom' ? 'Input Console' : 'Interactive Preview'}
            </div>
            {renderUI()}
        </div>
      </div>
    </div>
  );
};

export default ProjectWorkspace;
