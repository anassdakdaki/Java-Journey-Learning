
import React, { useState, useMemo } from 'react';
import { TRIVIA_QUESTIONS } from '../../constants/gamesData';
import { CheckCircleIcon, XIcon } from '../icons/FeedbackIcons';

interface TriviaGameProps {
  onExit: () => void;
  onNextGame: () => void;
}

const TriviaGame: React.FC<TriviaGameProps> = ({ onExit, onNextGame }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Track selections: null = unanswered, string = selected option
  const [selections, setSelections] = useState<(string | null)[]>(
      new Array(TRIVIA_QUESTIONS.length).fill(null)
  );
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQuestion = TRIVIA_QUESTIONS[currentIndex];
  const currentSelection = selections[currentIndex];

  // Calculate score derived from selections
  const score = useMemo(() => {
      return selections.reduce((acc, sel, idx) => {
          if (sel === TRIVIA_QUESTIONS[idx].correctAnswer) return acc + 1;
          return acc;
      }, 0);
  }, [selections]);

  const handleOptionSelect = (option: string) => {
    if (currentSelection) return; // Prevent changing answer if already selected
    
    setSelections(prev => {
        const newSelections = [...prev];
        newSelections[currentIndex] = option;
        return newSelections;
    });
  };

  const handleNext = () => {
    if (currentIndex < TRIVIA_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsGameOver(true);
    }
  };

  const handlePrev = () => {
      if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
      }
  };

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 animate-fade-in py-10">
        <h2 className="text-3xl font-bold text-primary dark:text-white">Quiz Complete!</h2>
        <div className="bg-base-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center max-w-md w-full border border-base-300 dark:border-gray-700">
          <p className="text-xl mb-4 text-content-100 dark:text-content-100-dark">Final Score</p>
          <p className="text-6xl font-bold text-accent mb-6">{score} / {TRIVIA_QUESTIONS.length}</p>
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
             <h2 className="text-2xl font-bold text-primary dark:text-white">Java Trivia</h2>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-1 rounded-full font-bold">
          Score: {score}
        </div>
      </div>

      <div className="bg-base-100 dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-base-300 dark:border-gray-700 min-h-[400px] flex flex-col">
        <p className="text-lg font-semibold mb-6 text-content-100 dark:text-white">
          {currentIndex + 1}. {currentQuestion.question}
        </p>

        <div className="space-y-3 flex-grow">
            {currentQuestion.options.map((option, idx) => {
                let btnClass = "w-full text-left p-4 rounded-lg border-2 transition-all ";
                
                if (currentSelection) {
                     if (option === currentQuestion.correctAnswer) {
                         btnClass += "bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:text-green-200";
                     } else if (option === currentSelection) {
                         btnClass += "bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:text-red-200";
                     } else {
                         btnClass += "border-base-300 dark:border-gray-700 opacity-50";
                     }
                } else {
                    btnClass += "border-base-300 dark:border-gray-700 hover:border-secondary hover:bg-blue-50 dark:hover:bg-gray-700 dark:text-white";
                }

                return (
                    <button 
                        key={idx}
                        onClick={() => handleOptionSelect(option)}
                        disabled={!!currentSelection}
                        className={btnClass}
                    >
                        {option}
                    </button>
                );
            })}
            
            {currentSelection && (
                <div className="mt-4 animate-fade-in">
                    <div className={`p-4 rounded-lg ${currentSelection === currentQuestion.correctAnswer ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                        <h3 className={`font-bold mb-1 ${currentSelection === currentQuestion.correctAnswer ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                            {currentSelection === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                        </h3>
                        <p className="text-sm text-content-200 dark:text-content-200-dark">{currentQuestion.explanation}</p>
                    </div>
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
                disabled={!currentSelection}
                className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {currentIndex < TRIVIA_QUESTIONS.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default TriviaGame;
