
import React from 'react';
import { Section } from '../types';
import { CheckCircleIcon, PlayIcon } from './icons/FeedbackIcons';
import { COURSE_CONTENT } from '../constants';
import { Link } from 'react-router-dom';

interface DashboardViewProps {
  sections: Section[];
  onStartLesson: (sectionIndex: number, lessonIndex: number) => void;
  completedLessons: Set<string>;
  onMarkLessonAsComplete: (sectionIndex: number, lessonIndex: number) => void;
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
const getStableSlug = (prefix: string, id: string, title: string) => {
  try {
    const key = `jj.slug.${prefix}:${id}`;
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const computed = slugify(title);
    localStorage.setItem(key, computed);
    return computed;
  } catch {
    return slugify(title);
  }
};

const DashboardView: React.FC<DashboardViewProps> = ({ sections, onStartLesson, completedLessons, onMarkLessonAsComplete }) => {
    
    let currentLessonId: string | null = null;
    let foundCurrent = false;
    for (const section of sections) {
        for (const lesson of section.lessons) {
            if (!completedLessons.has(lesson.id)) {
                currentLessonId = lesson.id;
                foundCurrent = true;
                break;
            }
        }
        if (foundCurrent) break;
    }

    const totalLessons = sections.reduce((sum, s) => sum + s.lessons.length, 0);
    const completedCount = completedLessons.size;
    const progressPct = Math.round((completedCount / Math.max(1, totalLessons)) * 100);
    const badges: Array<{ label: string; threshold: number; emoji: string }> = [
        { label: 'Starter', threshold: 1, emoji: '✨' },
        { label: 'Learner', threshold: 3, emoji: '📚' },
        { label: 'Explorer', threshold: 6, emoji: '🧭' },
        { label: 'Achiever', threshold: 10, emoji: '🏆' },
    ];
    const earned = badges.filter(b => completedCount >= b.threshold);
    const nextBadge = badges.find(b => completedCount < b.threshold);
    let nextSectionIndex = 0;
    let nextLessonIndex = 0;
    let hasNext = false;
    for (let si = 0; si < sections.length; si++) {
        const section = sections[si];
        for (let li = 0; li < section.lessons.length; li++) {
            const lesson = section.lessons[li];
            if (!completedLessons.has(lesson.id)) {
                nextSectionIndex = si;
                nextLessonIndex = li;
                hasNext = true;
                break;
            }
        }
        if (hasNext) break;
    }

  return (
    <div className="w-full max-w-4xl animate-fade-in px-2 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4 text-center dark:text-white">Your Java Journey</h1>
        <div className="mb-8 rounded-xl shadow-lg overflow-hidden bg-gradient-to-r from-secondary/20 via-primary/20 to-primary/30 dark:from-secondary/10 dark:via-primary/10 dark:to-primary/20">
            <div className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">📈</span>
                        <div>
                            <p className="text-sm text-content-200 dark:text-content-200-dark">Classes completed</p>
                            <p className="text-2xl font-bold">{completedCount} / {totalLessons}</p>
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <div className="h-3 bg-white/50 dark:bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-secondary rounded-full transition-all"
                                style={{ width: `${progressPct}%` }}
                                aria-label={`Progress ${progressPct}%`}
                            />
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                            <span>{progressPct}%</span>
                            {nextBadge ? (
                                <span className="text-content-200 dark:text-content-200-dark">Next badge: {nextBadge.emoji} {nextBadge.label} at {nextBadge.threshold}</span>
                            ) : (
                                <span className="text-success">All badges earned!</span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-2 flex-wrap">
                        {earned.length === 0 ? (
                            <span className="text-xs px-2 py-1 rounded-full bg-white/60 dark:bg-white/10 text-content-200">No badges yet</span>
                        ) : (
                            earned.map(b => (
                                <span key={b.label} className="text-xs px-2 py-1 rounded-full bg-white/80 dark:bg-white/10 text-secondary border border-secondary/20">
                                    {b.emoji} {b.label}
                                </span>
                            ))
                        )}
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-content-200 dark:text-content-200-dark">
                        {hasNext ? 'Keep going! Your next class is ready.' : 'You have completed all classes.'}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => hasNext && onStartLesson(nextSectionIndex, nextLessonIndex)}
                            disabled={!hasNext}
                            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md font-semibold text-sm sm:text-base shadow-sm transition-colors ${
                                hasNext ? 'bg-primary text-white hover:bg-primary/90 dark:bg-primary-dark dark:text-white dark:hover:bg-primary-dark/90' : 'bg-base-300 text-content-200 cursor-not-allowed dark:bg-base-700 dark:text-content-700'
                            }`}
                        >
                            {hasNext ? 'Continue Learning' : 'All Done'}
                        </button>
                        <button
                            onClick={() => { localStorage.clear(); window.location.reload(); }}
                            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md font-semibold text-sm sm:text-base shadow-sm bg-red-500 text-white hover:bg-red-600 transition-colors dark:bg-red-700 dark:hover:bg-red-800"
                        >
                            Reset Progress
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-8">
            {sections.map((section, sectionIndex) => (
                <div key={section.id} className="bg-base-100 dark:bg-base-100-dark rounded-xl shadow-lg overflow-hidden">
                    <div className="p-3 sm:p-4 bg-primary text-white">
                        <h2 className="text-xl sm:text-2xl font-bold">
                          <Link to={`/learn/java/${getStableSlug('section', section.id, section.title)}`} className="hover:underline">
                            {section.title}
                          </Link>
                        </h2>
                    </div>
                    <ul className="divide-y divide-base-300 dark:divide-base-300-dark">
                        {section.lessons.map((lesson, lessonIndex) => {
                            const isCompleted = completedLessons.has(lesson.id);
                            const isCurrent = lesson.id === currentLessonId;
                            
                            const Icon = isCompleted ? CheckCircleIcon : PlayIcon;
                            let iconColor = 'text-gray-400 dark:text-gray-500';
                            if (isCompleted) {
                                iconColor = 'text-success';
                            } else {
                                iconColor = 'text-secondary';
                            }
                            
                            return (
                                <li key={lesson.id} className={`${isCurrent ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                                    <div
                                        onClick={() => onStartLesson(sectionIndex, lessonIndex)}
                                        className={`w-full text-left p-4 flex items-center space-x-4 transition-colors cursor-pointer hover:bg-base-200 dark:hover:bg-base-200-dark/50`}
                                    >
                                        <Icon className={`h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0 ${iconColor}`} />
                                        <div className="flex-grow">
                                            <p className={`font-semibold text-base sm:text-lg text-content-100 dark:text-content-100-dark`}>
                                                {lesson.title}
                                            </p>
                                             {!isCompleted && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent the outer div's onClick
                                                        onMarkLessonAsComplete(sectionIndex, lessonIndex);
                                                    }}
                                                    className="text-xs text-secondary hover:underline font-semibold mt-1"
                                                >
                                                    Mark as complete
                                                </button>
                                            )}
                                        </div>
                                         {isCurrent && <span className="text-xs sm:text-sm font-bold text-secondary self-center">Next lesson</span>}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    </div>
  );
};

export default DashboardView;
