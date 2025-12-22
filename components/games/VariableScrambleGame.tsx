
import React, { useState, useEffect, useMemo } from 'react';
import { SCRAMBLE_WORDS } from '../../constants/gamesData';
import { CheckCircleIcon } from '../icons/FeedbackIcons';

interface VariableScrambleGameProps {
  onExit: () => void;
  onNextGame: () => void;
}

const VariableScrambleGame: React.FC<VariableScrambleGameProps> = ({ onExit, onNextGame }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  // Track solved state for each word
  const [solvedWords, setSolvedWords] = useState<boolean[]>(
      new Array(SCRAMBLE_WORDS.length).fill(false)
  );
  const [shuffledWord, setShuffledWord] = useState('');
  const [feedback, setFeedback] = useState('');
  
  const [isGameOver, setIsGameOver] = useState(false);

  const currentData = SCRAMBLE_WORDS[currentIndex];
  const isCurrentSolved = solvedWords[currentIndex];
  
  // Derived score
  const score = useMemo(() => solvedWords.filter(s => s).length, [solvedWords]);

  // Shuffle word when index changes
  useEffect(() => {
    if (currentData) {
      setShuffledWord(shuffleString(currentData.word));
      setUserGuess('');
      setFeedback('');
    }
  }, [currentIndex, currentData]);

  const shuffleString = (str: string) => {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  };

  const checkAnswer = () => {
    if (userGuess.toUpperCase().trim() === currentData.word) {
      setFeedback('Correct!');
      setSolvedWords(prev => {
          const newSolved = [...prev];
          newSolved[currentIndex] = true;
          return newSolved;
      });
    } else {
      setFeedback('Try again!');
    }
  };

  const handleNext = () => {
    if (currentIndex < SCRAMBLE_WORDS.length - 1) {
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
        <h2 className="text-3xl font-bold text-primary dark:text-white">Game Over!</h2>
        <div className="bg-base-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center max-w-md w-full border border-base-300 dark:border-gray-700">
          <p className="text-xl mb-4 text-content-100 dark:text-content-100-dark">Your Score</p>
          <p className="text-6xl font-bold text-accent mb-6">{score} / {SCRAMBLE_WORDS.length}</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={onExit} 
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg shadow-md transition-colors"
            >
              Back to Menu
            </button>
            <button
              onClick={onNextGame}
              className="px-6 py-3 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-blue-800 transition-colors"
            >
              Next Game &rarr;
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
             <h2 className="text-2xl font-bold text-primary dark:text-white">Variable Scramble</h2>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-1 rounded-full font-bold">
          Score: {score}
        </div>
      </div>

      <div className="bg-base-100 dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center space-y-6 min-h-[400px] flex flex-col">
        <div>
          <p className="text-sm text-content-200 dark:text-content-200-dark uppercase tracking-wider mb-2">Unscramble the keyword</p>
          <div className="text-4xl md:text-6xl font-mono font-bold text-secondary tracking-widest mb-2">
            {shuffledWord}
          </div>
           <p className="text-sm text-gray-500 dark:text-gray-400 italic">Hint: {currentData.hint}</p>
        </div>

        <div className="flex flex-col items-center gap-4 flex-grow">
            {!isCurrentSolved ? (
                 <div className="w-full max-w-sm space-y-4">
                    <input
                        type="text"
                        value={userGuess}
                        onChange={(e) => setUserGuess(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                        placeholder="Type your answer..."
                        className="w-full px-4 py-3 rounded-lg border-2 border-base-300 dark:border-gray-600 bg-transparent text-center text-xl focus:border-secondary focus:outline-none dark:text-white"
                    />
                    <button
                        onClick={checkAnswer}
                        className="w-full px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                    >
                        Check
                    </button>
                 </div>
            ) : (
                <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center justify-center text-success gap-2">
                         <CheckCircleIcon className="h-8 w-8"/>
                         <span className="text-2xl font-bold text-green-600 dark:text-green-400">Correct!</span>
                    </div>
                     <p className="text-lg text-content-100 dark:text-content-100-dark">The word was <strong>{currentData.word}</strong>.</p>
                </div>
            )}
            
             {feedback && !isCurrentSolved && (
                <p className="text-error font-semibold animate-bounce">{feedback}</p>
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
                disabled={!isCurrentSolved}
                className="px-6 py-2 bg-secondary text-white font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {currentIndex < SCRAMBLE_WORDS.length - 1 ? 'Next Word' : 'Finish Game'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default VariableScrambleGame;
