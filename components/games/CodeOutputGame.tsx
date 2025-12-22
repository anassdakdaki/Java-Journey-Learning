
import React, { useState, useMemo } from 'react';
import { OUTPUT_QUESTIONS } from '../../constants/gamesData';
import CodeBlock from '../CodeBlock';
import { CheckCircleIcon, XIcon } from '../icons/FeedbackIcons';

interface CodeOutputGameProps {
  onExit: () => void;
  onNextGame: () => void;
}

const CodeOutputGame: React.FC<CodeOutputGameProps> = ({ onExit, onNextGame }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  // Track state: null = unanswered, true = correct, false = incorrect
  const [results, setResults] = useState<(boolean | null)[]>(
      new Array(OUTPUT_QUESTIONS.length).fill(null)
  );
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQuestion = OUTPUT_QUESTIONS[currentIndex];
  const currentResult = results[currentIndex];

  // Derived score
  const score = useMemo(() => results.filter(r => r === true).length, [results]);

  const checkAnswer = () => {
    if (currentResult !== null) return; // Prevent changing answer

    const correct = userGuess.trim() === currentQuestion.output;
    
    setResults(prev => {
        const newResults = [...prev];
        newResults[currentIndex] = correct;
        return newResults;
    });
  };

  const handleNext = () => {
    setUserGuess('');
    if (currentIndex < OUTPUT_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsGameOver(true);
    }
  };

  const handlePrev = () => {
      if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
          setUserGuess(''); // Clear input when going back to keep it clean
      }
  }

  if (isGameOver) {
     return (
      <div className="flex flex-col items-center justify-center space-y-6 animate-fade-in py-10">
        <h2 className="text-3xl font-bold text-primary dark:text-white">Game Over!</h2>
        <div className="bg-base-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center max-w-md w-full border border-base-300 dark:border-gray-700">
          <p className="text-xl mb-4 text-content-100 dark:text-content-100-dark">Your Score</p>
          <p className="text-6xl font-bold text-accent mb-6">{score} / {OUTPUT_QUESTIONS.length}</p>
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
    <div className="max-w-2xl mx-auto w-full animate-fade-in">
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
             <h2 className="text-2xl font-bold text-primary dark:text-white">Code Output</h2>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-1 rounded-full font-bold">
          Score: {score}
        </div>
      </div>

      <div className="bg-base-100 dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-base-300 dark:border-gray-700 min-h-[400px] flex flex-col">
        <p className="text-lg text-center mb-4 text-content-200 dark:text-content-200-dark">
          Question {currentIndex + 1} of {OUTPUT_QUESTIONS.length}: What will be printed?
        </p>

        <div className="mb-6">
            <CodeBlock code={currentQuestion.code} />
        </div>

        <div className="flex-grow">
            {currentResult === null ? (
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <input
                        type="text"
                        value={userGuess}
                        onChange={(e) => setUserGuess(e.target.value)}
                        placeholder="Enter output..."
                        className="w-full sm:w-1/2 px-4 py-2 rounded-lg border-2 border-base-300 dark:border-gray-600 bg-transparent focus:border-secondary focus:outline-none dark:text-white"
                    />
                    <button
                        onClick={checkAnswer}
                        className="w-full sm:w-auto px-6 py-2 bg-secondary text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                    >
                        Submit
                    </button>
                </div>
            ) : (
                <div className={`p-4 rounded-lg ${currentResult ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'} text-center animate-fade-in`}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        {currentResult ? <CheckCircleIcon className="h-6 w-6 text-green-600"/> : <XIcon className="h-6 w-6 text-red-600"/>}
                        <h3 className={`text-xl font-bold ${currentResult ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                            {currentResult ? 'Correct!' : 'Incorrect'}
                        </h3>
                    </div>
                    <p className="text-content-200 dark:text-content-200-dark mb-4">
                        {!currentResult && <span>The correct output was: <strong>{currentQuestion.output}</strong>. </span>}
                        {currentQuestion.explanation}
                    </p>
                </div>
            )}
        </div>
        
         {/* Navigation Footer */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-base-300 dark:border-gray-700">
            <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white disabled:opacity-30 disabled:hover:text-gray-600 transition-colors"
            >
                &larr; Previous
            </button>
            
            <button
                onClick={handleNext}
                disabled={currentResult === null}
                className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {currentIndex < OUTPUT_QUESTIONS.length - 1 ? 'Next Question' : 'Finish Game'}
            </button>
        </div>

      </div>
    </div>
  );
};

export default CodeOutputGame;
