
import React, { useState } from 'react';
import { BUG_FIX_LEVELS } from '../../constants/gamesData';
import CodeEditor from '../CodeEditor';
import { runJavaCode } from '../../services/aiService';
import { CheckCircleIcon, XIcon } from '../icons/FeedbackIcons';

interface BugBattleGameProps {
  onExit: () => void;
  onNextGame: () => void;
}

const BugBattleGame: React.FC<BugBattleGameProps> = ({ onExit, onNextGame }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Initialize state for all levels at start
  const [levelStates, setLevelStates] = useState(
      BUG_FIX_LEVELS.map(level => ({
          code: level.initialCode,
          output: '',
          isSolved: false,
          showHint: false
      }))
  );
  
  const [isLoading, setIsLoading] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentLevel = BUG_FIX_LEVELS[currentIndex];
  const currentState = levelStates[currentIndex];

  // Helper to update specific level state
  const updateLevelState = (updates: Partial<typeof currentState>) => {
      setLevelStates(prev => {
          const newStates = [...prev];
          newStates[currentIndex] = { ...newStates[currentIndex], ...updates };
          return newStates;
      });
  };

  const handleCodeChange = (newCode: string) => {
      updateLevelState({ code: newCode, isSolved: false }); // Reset solved if code changes
  };

  const handleRunCode = async () => {
    setIsLoading(true);
    updateLevelState({ output: '', isSolved: false });

    try {
      const result = await runJavaCode(currentState.code);
      
      // Normalize outputs for comparison (trim whitespace/newlines)
      const cleanResult = result.trim().replace(/\r\n/g, '\n');
      const cleanExpected = currentLevel.expectedOutput.trim().replace(/\r\n/g, '\n');

      const solved = cleanResult === cleanExpected;
      updateLevelState({ output: result, isSolved: solved });

    } catch (error) {
      updateLevelState({ output: error instanceof Error ? error.message : 'An unexpected error occurred.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < BUG_FIX_LEVELS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsGameOver(true);
    }
  };
  
  const handlePrev = () => {
      if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
      }
  }

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 animate-fade-in py-10">
        <h2 className="text-3xl font-bold text-primary dark:text-white">You Won!</h2>
        <div className="bg-base-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center max-w-md w-full border border-base-300 dark:border-gray-700">
          <p className="text-xl mb-4 text-content-100 dark:text-content-100-dark">All Bugs Squashed!</p>
          <div className="flex justify-center mb-6">
             <div className="text-6xl">🏆</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={onExit} className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Back to Menu
            </button>
            <button
              onClick={onNextGame}
              className="px-6 py-3 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Next Game <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full animate-fade-in">
      <div className="flex justify-between items-center mb-6">
         <div className="flex items-center gap-3">
             <button 
                onClick={onExit}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-content-200 dark:text-content-200-dark text-sm font-bold"
                title="Back to Menu"
             >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Exit
             </button>
             <h2 className="text-2xl font-bold text-primary dark:text-white">Bug Battle</h2>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-1 rounded-full font-bold">
          Level {currentIndex + 1} / {BUG_FIX_LEVELS.length}
        </div>
      </div>

      <div className="bg-base-100 dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-base-300 dark:border-gray-700">
         <div className="mb-4">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">{currentLevel.title}</h3>
            <p className="text-content-200 dark:text-content-200-dark">{currentLevel.description}</p>
         </div>

         <CodeEditor 
            code={currentState.code} 
            onCodeChange={handleCodeChange}
            onRun={handleRunCode}
            isLoading={isLoading}
         />

        <div className="flex justify-between items-center mt-4">
             <button 
                onClick={() => updateLevelState({ showHint: !currentState.showHint })}
                className="text-sm text-secondary hover:underline font-semibold"
            >
                {currentState.showHint ? 'Hide Hint' : 'Need a Hint?'}
            </button>
            
             {currentState.showHint && (
                <div className="text-sm bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 p-2 rounded border border-yellow-200 dark:border-yellow-700">
                    <strong>Hint:</strong> {currentLevel.hint}
                </div>
            )}
        </div>

         {currentState.output && (
            <div className="mt-4">
              <h3 className="font-semibold text-content-100 dark:text-content-100-dark mb-2">Output:</h3>
              <pre className={`p-4 rounded-md text-sm whitespace-pre-wrap font-mono ${currentState.isSolved ? 'bg-green-900/20 border border-green-500 text-green-800 dark:text-green-200' : 'bg-gray-900 text-white'}`}>
                <code>{currentState.output}</code>
              </pre>
            </div>
          )}

          {currentState.isSolved && (
             <div className="mt-6 p-4 rounded-lg bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 animate-fade-in flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                    <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400"/>
                    <span className="text-xl font-bold text-green-800 dark:text-green-200">Bug Fixed!</span>
                </div>
                 <p className="text-green-700 dark:text-green-300 mb-4">Great job! The code now runs as expected.</p>
             </div>
          )}
          
          {/* Navigation Footer */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-base-300 dark:border-gray-700">
            <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white disabled:opacity-30 disabled:hover:text-gray-600 transition-colors"
            >
                &larr; Previous Level
            </button>
            
            <button
                onClick={handleNext}
                disabled={!currentState.isSolved}
                className="px-6 py-2 bg-success text-white font-semibold rounded-lg hover:bg-green-600 shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {currentIndex < BUG_FIX_LEVELS.length - 1 ? 'Next Level' : 'Finish Game'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default BugBattleGame;
