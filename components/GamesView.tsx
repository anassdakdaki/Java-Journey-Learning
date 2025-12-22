
import React, { useState } from 'react';
import SyntaxSprintGame from './games/SyntaxSprintGame';
import VariableScrambleGame from './games/VariableScrambleGame';
import CodeOutputGame from './games/CodeOutputGame';
import BugBattleGame from './games/BugBattleGame';
import TriviaGame from './games/TriviaGame';
import { PlayIcon, CheckCircleIcon, SparklesIcon } from './icons/FeedbackIcons';

type GameType = 'menu' | 'syntax' | 'scramble' | 'output' | 'bugbattle' | 'trivia';

const GAMES_ORDER: GameType[] = ['syntax', 'scramble', 'output', 'bugbattle', 'trivia'];

const GamesView: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameType>('menu');

  const handleNextGame = () => {
    const currentIndex = GAMES_ORDER.indexOf(activeGame);
    if (currentIndex !== -1 && currentIndex < GAMES_ORDER.length - 1) {
      setActiveGame(GAMES_ORDER[currentIndex + 1]);
    } else {
      // If it's the last game, go back to menu
      setActiveGame('menu');
    }
  };

  const renderMenu = () => (
    <div className="w-full max-w-6xl animate-fade-in px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary dark:text-white mb-4">Java Arcade</h1>
        <p className="text-xl text-content-200 dark:text-content-200-dark max-w-2xl mx-auto">
          Take a break from lessons and test your skills with these interactive challenges.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
        {/* Game Card 1: Syntax Sprint */}
        <div 
          onClick={() => setActiveGame('syntax')}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group border border-base-300 dark:border-gray-700"
        >
          <div className="h-20 md:h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
             <CheckCircleIcon className="h-10 w-10 md:h-20 md:w-20 text-white opacity-80 group-hover:scale-110 transition-transform duration-300"/>
          </div>
          <div className="p-2 md:p-6 flex flex-col">
            <h3 className="text-base md:text-2xl font-bold text-content-100 dark:text-white mb-1 md:mb-2">Syntax Sprint</h3>
            <p className="text-xs md:text-sm text-content-200 dark:text-gray-400 mb-1 md:mb-2 md:h-16 leading-tight line-clamp-2 md:line-clamp-3">
              Race against bad code! Identify whether the Java syntax is Correct or Incorrect.
            </p>
            <div className="flex items-center text-secondary font-bold group-hover:text-blue-400 mt-auto text-xs md:text-base">
              <PlayIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Play Now
            </div>
          </div>
        </div>

        {/* Game Card 2: Variable Scramble */}
        <div 
          onClick={() => setActiveGame('scramble')}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group border border-base-300 dark:border-gray-700"
        >
          <div className="h-20 md:h-40 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
            <SparklesIcon className="h-10 w-10 md:h-20 md:w-20 text-white opacity-80 group-hover:scale-110 transition-transform duration-300"/>
          </div>
          <div className="p-2 md:p-6 flex flex-col">
            <h3 className="text-base md:text-2xl font-bold text-content-100 dark:text-white mb-1 md:mb-2">Variable Scramble</h3>
            <p className="text-xs md:text-sm text-content-200 dark:text-gray-400 mb-1 md:mb-2 md:h-16 leading-tight line-clamp-2 md:line-clamp-3">
              Unscramble the letters to reveal common Java keywords and data types.
            </p>
            <div className="flex items-center text-secondary font-bold group-hover:text-blue-400 mt-auto text-xs md:text-base">
              <PlayIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Play Now
            </div>
          </div>
        </div>

        {/* Game Card 3: Code Output Challenge */}
        <div 
           onClick={() => setActiveGame('output')}
           className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group border border-base-300 dark:border-gray-700"
        >
          <div className="h-20 md:h-40 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
             <div className="text-2xl md:text-6xl font-mono font-bold text-white opacity-80 group-hover:scale-110 transition-transform duration-300">{`{ }`}</div>
          </div>
          <div className="p-2 md:p-6 flex flex-col">
            <h3 className="text-base md:text-2xl font-bold text-content-100 dark:text-white mb-1 md:mb-2">Code Output</h3>
            <p className="text-xs md:text-sm text-content-200 dark:text-gray-400 mb-1 md:mb-2 md:h-16 leading-tight line-clamp-2 md:line-clamp-3">
              Be the compiler! Look at the code snippet and predict exactly what it prints.
            </p>
            <div className="flex items-center text-secondary font-bold group-hover:text-blue-400 mt-auto text-xs md:text-base">
              <PlayIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Play Now
            </div>
          </div>
        </div>

         {/* Game Card 4: Bug Battle */}
         <div 
           onClick={() => setActiveGame('bugbattle')}
           className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group border border-base-300 dark:border-gray-700"
        >
          <div className="h-20 md:h-40 bg-gradient-to-br from-red-800 to-pink-700 flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 md:h-20 md:w-20 text-white opacity-80 group-hover:scale-110 transition-transform duration-300">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
             </svg>
          </div>
          <div className="p-2 md:p-6 flex flex-col">
            <h3 className="text-base md:text-2xl font-bold text-content-100 dark:text-white mb-1 md:mb-2">Bug Battle</h3>
            <p className="text-xs md:text-sm text-content-200 dark:text-gray-400 mb-1 md:mb-2 md:h-16 leading-tight line-clamp-2 md:line-clamp-3">
              Fix the broken code! Use the editor to correct syntax and logic errors to win.
            </p>
            <div className="flex items-center text-secondary font-bold group-hover:text-blue-400 mt-auto text-xs md:text-base">
              <PlayIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Play Now
            </div>
          </div>
        </div>

        {/* Game Card 5: Java Trivia */}
        <div 
           onClick={() => setActiveGame('trivia')}
           className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group border border-base-300 dark:border-gray-700"
        >
          <div className="h-20 md:h-40 bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 md:h-20 md:w-20 text-white opacity-80 group-hover:scale-110 transition-transform duration-300">
                 <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
             </svg>
          </div>
          <div className="p-2 md:p-6 flex flex-col">
            <h3 className="text-base md:text-2xl font-bold text-content-100 dark:text-white mb-1 md:mb-2">Java Trivia</h3>
            <p className="text-xs md:text-sm text-content-200 dark:text-gray-400 mb-1 md:mb-2 md:h-16 leading-tight line-clamp-2 md:line-clamp-3">
              Test your knowledge with multiple-choice questions about Java concepts.
            </p>
            <div className="flex items-center text-secondary font-bold group-hover:text-blue-400 mt-auto text-xs md:text-base">
              <PlayIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Play Now
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <div className="w-full flex justify-center py-6">
      {activeGame === 'menu' && renderMenu()}
      {activeGame === 'syntax' && <SyntaxSprintGame onExit={() => setActiveGame('menu')} onNextGame={handleNextGame} />}
      {activeGame === 'scramble' && <VariableScrambleGame onExit={() => setActiveGame('menu')} onNextGame={handleNextGame} />}
      {activeGame === 'output' && <CodeOutputGame onExit={() => setActiveGame('menu')} onNextGame={handleNextGame} />}
      {activeGame === 'bugbattle' && <BugBattleGame onExit={() => setActiveGame('menu')} onNextGame={handleNextGame} />}
      {activeGame === 'trivia' && <TriviaGame onExit={() => setActiveGame('menu')} onNextGame={handleNextGame} />}
    </div>
  );
};

export default GamesView;
