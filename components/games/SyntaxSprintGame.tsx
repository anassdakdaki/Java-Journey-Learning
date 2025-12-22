
import React, { useState, useMemo } from 'react';
import { SYNTAX_QUESTIONS } from '../../constants/gamesData';
import CodeBlock from '../CodeBlock';
import { CheckCircleIcon, XIcon } from '../icons/FeedbackIcons';

interface SyntaxSprintGameProps {
  onExit: () => void;
  onNextGame: () => void;
}

const SyntaxSprintGame: React.FC<SyntaxSprintGameProps> = ({ onExit, onNextGame }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Track state for each question: { answered: boolean, correct: boolean }
  const [answers, setAnswers] = useState<{ answered: boolean; correct: boolean }[]>(
    new Array(SYNTAX_QUESTIONS.length).fill({ answered: false, correct: false })
  );
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQuestion = SYNTAX_QUESTIONS[currentIndex];
  const currentAnswer = answers[currentIndex];
  
  // Derived score
  const score = useMemo(() => answers.filter(a => a.correct).length, [answers]);

  const handleGuess = (userSaidCorrect: boolean) => {
    if (currentAnswer.answered) return; // Prevent changing answer

    const isCorrect = userSaidCorrect === currentQuestion.isCorrect;
    
    setAnswers(prev => {
        const newAnswers = [...prev];
        newAnswers[currentIndex] = { answered: true, correct: isCorrect };
        return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentIndex < SYNTAX_QUESTIONS.length - 1) {
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
        <h2 className="text-3xl font-bold text-primary dark:text-white">Game Over!</h2>
        <div className="bg-base-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center max-w-md w-full border border-base-300 dark:border-gray-700">
          <p className="text-xl mb-4 text-content-100 dark:text-content-100-dark">Your Score</p>
          <p className="text-6xl font-bold text-accent mb-6">{score} / {SYNTAX_QUESTIONS.length}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onExit}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
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
      {/* Header */}
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
             <h2 className="text-2xl font-bold text-primary dark:text-white">Syntax Sprint</h2>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-1 rounded-full font-bold">
          Score: {score}
        </div>
      </div>

      <div className="bg-base-100 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6 mb-6 border border-base-300 dark:border-gray-700 min-h-[400px] flex flex-col">
        <p className="text-lg text-center mb-4 text-content-200 dark:text-content-200-dark">
          Question {currentIndex + 1} of {SYNTAX_QUESTIONS.length}: Is this syntax correct?
        </p>
        
        <div className="mb-8">
          <CodeBlock code={currentQuestion.code} />
        </div>

        <div className="flex-grow">
            {!currentAnswer.answered ? (
            <div className="flex gap-4 justify-center">
                <button
                onClick={() => handleGuess(true)}
                className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-transform transform hover:scale-105 shadow-md"
                >
                Correct
                </button>
                <button
                onClick={() => handleGuess(false)}
                className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-transform transform hover:scale-105 shadow-md"
                >
                Incorrect
                </button>
            </div>
            ) : (
            <div className={`p-4 rounded-lg ${currentAnswer.correct ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'} text-center animate-fade-in`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                {currentAnswer.correct ? <CheckCircleIcon className="h-8 w-8 text-green-600" /> : <XIcon className="h-8 w-8 text-red-600" />}
                <h3 className={`text-xl font-bold ${currentAnswer.correct ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                    {currentAnswer.correct ? 'You got it!' : 'Wrong!'}
                </h3>
                </div>
                <p className="text-content-200 dark:text-content-200-dark mb-4">{currentQuestion.explanation}</p>
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
                disabled={!currentAnswer.answered}
                className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {currentIndex < SYNTAX_QUESTIONS.length - 1 ? 'Next Question' : 'Finish Game'}
            </button>
        </div>

      </div>
    </div>
  );
};

export default SyntaxSprintGame;
