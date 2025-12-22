import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, UserIcon, BookOpenIcon, PuzzlePieceIcon, CodeBracketIcon, AcademicCapIcon } from './icons/FeedbackIcons';

interface BottomNavBarProps {
  currentView: string;
  onNavigate: (mainView: 'course' | 'auth' | 'profile' | 'games' | 'projects' | 'resources', view?: 'dashboard' | 'lesson' | 'login' | 'signup') => void;
  isLoggedIn: boolean;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentView, onNavigate, isLoggedIn }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 sm:hidden z-50 shadow-lg">
      <nav className="flex justify-around h-16 items-center">
        <Link
          className={`flex flex-col items-center justify-center p-2 text-xs font-medium rounded-lg transition-colors duration-200
            ${currentView === 'course' ? 'text-primary dark:text-primary-dark bg-primary-light/10 dark:bg-primary-dark/10' : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark'}`}
          to="/learn/java"
        >
          <BookOpenIcon className="w-6 h-6 mb-1" />
          <span>Course</span>
        </Link>
        <Link
          className={`flex flex-col items-center justify-center p-2 text-xs font-medium rounded-lg transition-colors duration-200
            ${currentView === 'games' ? 'text-primary dark:text-primary-dark bg-primary-light/10 dark:bg-primary-dark/10' : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark'}`}
          to="/practice/java"
        >
          <PuzzlePieceIcon className="w-6 h-6 mb-1" />
          <span>Games</span>
        </Link>
        <Link
          className={`flex flex-col items-center justify-center p-2 text-xs font-medium rounded-lg transition-colors duration-200
            ${currentView === 'projects' ? 'text-primary dark:text-primary-dark bg-primary-light/10 dark:bg-primary-dark/10' : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark'}`}
          to="/projects/java"
        >
          <CodeBracketIcon className="w-6 h-6 mb-1" />
          <span>Projects</span>
        </Link>
        <Link
          className={`flex flex-col items-center justify-center p-2 text-xs font-medium rounded-lg transition-colors duration-200
            ${currentView === 'resources' ? 'text-primary dark:text-primary-dark bg-primary-light/10 dark:bg-primary-dark/10' : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark'}`}
          to="/resources/java"
        >
          <AcademicCapIcon className="w-6 h-6 mb-1" />
          <span>Resources</span>
        </Link>
        {isLoggedIn ? (
          <Link
            className={`flex flex-col items-center justify-center p-2 text-xs font-medium rounded-lg transition-colors duration-200
              ${currentView === 'profile' ? 'text-primary dark:text-primary-dark bg-primary-light/10 dark:bg-primary-dark/10' : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark'}`}
            to="/profile"
          >
            <UserIcon className="w-6 h-6 mb-1" />
            <span>Profile</span>
          </Link>
        ) : (
          <Link
            className={`flex flex-col items-center justify-center p-2 text-xs font-medium rounded-lg transition-colors duration-200
              ${currentView === 'auth' ? 'text-primary dark:text-primary-dark bg-primary-light/10 dark:bg-primary-dark/10' : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark'}`}
            to="/profile"
          >
            <UserIcon className="w-6 h-6 mb-1" />
            <span>Login</span>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default BottomNavBar;
